const express = require("express");
require("dotenv").config();
const sequelize = require("./config/db");
const bodyParser = require("body-parser");
const app = express();
const userRouter = require("./routes/user.routes");

const PORT = process.env.PORT;

app.use(bodyParser.json());
app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).json({ error: "Internal Server Error" });
});

app.use("/", userRouter);

const server = () => {
	// Start the Express server after successfully connecting to the database
	app.listen(PORT, () => {
		console.log(`Server is running on http://localhost:${PORT}`);
	});
};

server();
