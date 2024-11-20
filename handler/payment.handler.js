require("dotenv").config();
const stripe = stripe(process.env.publishable_key);
async function payAndBook() {
	const cardElement = stripe.element().create("card");
	cardElement.mount = "#card-element";
	const { paymentMethod, error } = await stripe.createPaymentMethod({
		type: "card",
		card: cardElement,
	});
	if (error) {
		console.error(error.message);
		return;
	}
}
const response = await fetch("../handler/user.handler.js", {
	method: "POST",
	body: JSON.stringify({
		action: "Book",
		name: name,
		movieBooked: movie,
		SeatNumber: SeatNumber,
		paymentMethodId: paymentMethod.id,
		amount: amount,
	}),
});

const result = await response.json();
console.log(result);
