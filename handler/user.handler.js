const { Op } = require("sequelize");
const sequelize = require("./config/db");
const Movies = require("../models/cinemadb");
const Booked = require("../models/cinemadb");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const cinema = async (req, res) => {
	try {
		const { action } = req.body;

		if (action === "search") {
			const { movie, genre, actors } = req.body;

			// Ensure at least one search parameter is provided
			if (!movie && !genre && !actors) {
				return res.status(400).json({ error: "Input at least one parameter" });
			}

			// Build dynamic where clause
			const whereClause = {};
			if (movie) whereClause.Movie = { [Op.like]: `%${movie}%` };
			if (genre) whereClause.Genre = { [Op.like]: `%${genre}%` };
			if (actors) whereClause.Actor = { [Op.like]: `%${actors}%` };

			// Fetch movies matching the criteria
			const result = await Movies.findAll({ where: whereClause });
			if (result.length === 0) {
				return res
					.status(404)
					.json({ error: "No movies found matching your criteria" });
			}

			return res.status(200).json({ movies: result });
		} else if (action === "Book") {
			const { name, movie, SeatNumber } = req.body;

			// Validate inputs
			if (!name || !SeatNumber || !movie) {
				return res.status(400).json({
					error:
						"Input your name, seat number and movie you would like to book",
				});
			}

			// Check if movie exists
			const selectedMovie = await Movies.findOne({ where: { Movie: movie } });
			if (!selectedMovie) {
				return res.status(404).json({ error: "Movie not found" });
			}

			// Check if the seat is already booked
			const seatTaken = await Booked.findOne({
				where: { Movie: movie, SeatNumber: SeatNumber },
			});
			if (seatTaken) {
				return res.status(400).json({ error: "Seat is already booked" });
			}

			// Book the seat
			const newBooking = await Booked.create({
				Name: name,
				Movie: movie,
				SeatNumber: SeatNumber,
			});

			return res.status(200).json({
				message: "Booking successful",
				booking: newBooking,
			});
		} else {
			return res.status(400).json({ error: "Invalid action" });
		}
	} catch (error) {
		console.error(error);
		return res.status(500).json({ error: "An unexpected error occurred" });
	}
};

module.exports = { cinema };
