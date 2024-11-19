const { Sequelize } = require("sequelize");
require("dotenv").config(); // To load .env file

// Creating a Sequelize instance to connect to the MySQL database
const sequelize = new Sequelize(
	process.env.database, // Database name
	process.env.user, // Username
	process.env.password, // Password
	{
		host: "localhost", // The host where the database is running
		dialect: "mysql", // MySQL dialect
		logging: false,
	}
);

// Test the connection to the database
(async () => {
	try {
		await sequelize.authenticate(); // Try authenticating with the database
		console.log("Connected to MySQL successfully!");
	} catch (error) {
		console.error("Unable to connect to the database:", error);
	}
})();

module.exports = sequelize;
