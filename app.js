const express = require("express");
require("dotenv").config();
const sequelize = require("./config/db");
const bodyParser = require("body-parser");
const app = express();

const PORT = process.env.PORT;

const server = () => {
	// Start the Express server after successfully connecting to the database
	app.listen(PORT, () => {
		console.log(`Server is running on http://localhost:${PORT}`);
	});
};

server();
