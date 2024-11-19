const sequelize = require("../config/db"); // Sequelize instance
const Movies = require("../models/cinemadb"); // Your Movies model

(async () => {
	try {
		// Syncing the database (This will create tables if not already created)
		await sequelize.sync({ force: true }); // force: true will drop the table before creating it again (use cautiously)
		console.log("Movies table has been created!");

		// Bulk insert sample movies into the Movies table
		await Movies.bulkCreate([
			{
				Movie: "The Dark Knight",
				Actor: "Christian Bale, Heath Ledger",
				Genre: "Action, Crime, Drama",
				releaseDate: "2008-07-18",
				CinemaShowing: "IMAX, Dolby Cinema",
				SeatsAvailable: "200",
				MovieDuration: "152 min",
			},
			{
				Movie: "The Godfather",
				Actor: "Marlon Brando, Al Pacino",
				Genre: "Crime, Drama",
				releaseDate: "1972-03-24",
				CinemaShowing: "Standard",
				SeatsAvailable: "150",
				MovieDuration: "175 min",
			},
			{
				Movie: "Inception",
				Actor: "Leonardo DiCaprio, Joseph Gordon-Levitt",
				Genre: "Action, Sci-Fi, Thriller",
				releaseDate: "2010-07-16",
				CinemaShowing: "IMAX, 3D",
				SeatsAvailable: "120",
				MovieDuration: "148 min",
			},
			{
				Movie: "Interstellar",
				Actor: "Matthew McConaughey, Anne Hathaway",
				Genre: "Adventure, Drama, Sci-Fi",
				releaseDate: "2014-11-07",
				CinemaShowing: "IMAX, Dolby Atmos",
				SeatsAvailable: "250",
				MovieDuration: "169 min",
			},
			{
				Movie: "The Matrix",
				Actor: "Keanu Reeves, Laurence Fishburne",
				Genre: "Action, Sci-Fi",
				releaseDate: "1999-03-31",
				CinemaShowing: "Standard, IMAX",
				SeatsAvailable: "180",
				MovieDuration: "136 min",
			},
		]);
		console.log("Movies have been populated!");
	} catch (error) {
		console.error("Error syncing or populating the database:", error);
	} finally {
		await sequelize.close(); // Close the connection after operations
	}
})();
