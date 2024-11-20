const { Sequelize, DataTypes } = require("sequelize"); // Corrected import
const sequelize = require("../config/db");

const Movies = sequelize.define("Movies", {
	id: {
		type: DataTypes.INTEGER,
		allowNull: false,
		primaryKey: true, // Add primaryKey and autoIncrement
		autoIncrement: true, // Automatically increments for each new entry
	},
	Movie: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	Actor: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	Genre: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	releaseDate: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	CinemaShowing: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	SeatsAvailable: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	MovieDuration: {
		type: DataTypes.STRING,
		allowNull: false,
	},
});

const Booked = sequelize.define(
	"Booked",
	{
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		MovieBooked: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		SeatNumber: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
	},
	{ tableName: "Booked", timestamps: false }
);
module.exports = { Movies, Booked };
