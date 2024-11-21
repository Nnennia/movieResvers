const { Op } = require("sequelize");
const sequelize = require("../config/db");
const { Movies, Booked } = require("../models/cinemadb");
require("dotenv").config();

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const cinema = async (req, res) => {
	try {
		const { action } = req.body;

		if (action === "search") {
			const { movie, genre, actor } = req.body;

			// Ensure at least one search parameter is provided
			if (!movie && !genre && !actor) {
				return res.status(400).json({ error: "Input at least one parameter" });
			}

			// Build dynamic where clause
			const whereClause = {};
			if (movie) whereClause.Movie = { [Op.like]: `%${movie}%` };
			if (genre) whereClause.Genre = { [Op.like]: `%${genre}%` };
			if (actor) whereClause.Actor = { [Op.like]: `%${actor}%` };

			// Fetch movies matching the criteria
			const result = await Movies.findAll({ where: whereClause });
			if (result.length === 0) {
				return res
					.status(404)
					.json({ error: "No movies found matching your criteria" });
			}

			return res.status(200).json({ movies: result });
		} else if (action === "book") {
			const { name, movie, SeatNumber, paymentMethod } = req.body;

			// Validate inputs
			if (!name || !SeatNumber || !movie || !paymentMethod) {
				return res.status(400).json({
					error: "Input your name, movie, seat number, and payment method.",
				});
			}

			// Check if movie exists
			const selectedMovie = await Movies.findOne({ where: { Movie: movie } });
			if (!selectedMovie) {
				return res.status(404).json({ error: "Movie not found" });
			}

			// Check if the seat is already booked
			const seatTaken = await Booked.findOne({
				where: { MovieBooked: movie, SeatNumber: SeatNumber },
			});

			if (seatTaken) {
				return res.status(400).json({ error: "Seat is already booked" });
			}

			// Begin transaction for atomicity
			const transaction = await sequelize.transaction();
			try {
				// Reserve the seat
				const newBooking = await Booked.create(
					{
						name: name,
						MovieBooked: movie,
						SeatNumber: SeatNumber,
						Status: "pending",
					},
					{ transaction }
				);

				// Process payment with Stripe
				const paymentIntent = await stripe.paymentIntents.create({
					amount: 50 * 100, // Amount in cents
					currency: "usd",
					payment_method: paymentMethod,
					confirmation_method: "manual",
					confirm: true,
					return_url: "http://localhost:4000/cinema",
				});

				// Confirm the booking if payment succeeds
				await newBooking.update({ Status: "confirmed" }, { transaction });
				await transaction.commit();

				return res.status(200).json({
					message: "Booking successful",
					booking: newBooking,
				});
			} catch (paymentError) {
				// Rollback the transaction if payment fails
				await transaction.rollback();

				if (paymentError.type === "StripeCardError") {
					return res.status(400).json({ error: "Your card was declined." });
				} else if (paymentError.type === "StripeInvalidRequestError") {
					return res.status(400).json({ error: "Invalid payment details." });
				} else {
					console.error("Payment Error Details:", paymentError);
					return res
						.status(500)
						.json({ error: "Payment processing failed. Try again." });
				}
			}
		} else {
			return res.status(400).json({ error: "Invalid action" });
		}
	} catch (error) {
		console.error("Unexpected error:", error);
		return res.status(500).json({ error: "An unexpected error occurred" });
	}
};

module.exports = cinema;
