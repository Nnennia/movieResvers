# Cinema Booking API - movieResvers

This repository provides an API for managing a movie cinema system. It supports functionalities such as searching for movies, booking tickets, and handling payments via Stripe. The project uses Node.js, Express, Sequelize ORM, and a MySQL database.

## Table of Contents

    Features
    Setup
    Environment Variables
    Endpoints
    Database Models
    Technologies Used
    Troubleshooting

## Features

    Movie Search: Search for movies by title, genre, or actor.
    Ticket Booking: Reserve seats for movies and process payments via Stripe.
    Dynamic Database Interaction: Built with Sequelize for streamlined MySQL interactions.

## Setup

### Prerequisites

    Node.js (v14+ recommended)
    MySQL (running locally or hosted)
    Stripe account (for payment processing)

### Installation

    Clone the repository:

    git clone <repository_url>
    cd <repository_folder>

#### Install dependencies:

    npm install

#### Set up the MySQL database:

    Create a MySQL database.
    Update the .env file with database credentials.

#### Start the server:

    npm start

    The server will start on http://localhost:<PORT>.

## Environment Variables

#### Create a .env file in the root directory with the following variables:

    PORT=4000
    database=<Your_Database_Name>
    user=<Your_Database_User>
    password=<Your_Database_Password>
    STRIPE_SECRET_KEY=<Your_Stripe_Secret_Key>

## Endpoints

1.  Search Movies

    POST /cinema

    Request body:

    {
    "action": "search",
    "movie": "Movie Title",
    "genre": "Genre",
    "actor": "Actor Name"
    }

    Response:

        200 OK: Returns a list of matching movies.
        400 Bad Request: Missing required search parameters.
        404 Not Found: No movies found.

2.  Book Tickets

    POST /cinema

    Request body:

    {
    "action": "book",
    "name": "User Name",
    "movie": "Movie Title",
    "SeatNumber": 1,
    "paymentMethod": "<Stripe_Payment_Method_ID>"
    }

    Response:

        200 OK: Booking successful with booking details.
        400 Bad Request: Missing or invalid input.
        404 Not Found: Movie not found.
        400 Bad Request: Seat already booked.
        500 Internal Server Error: Payment or server error.

## Database Models

### Movies Table

| Field            | Type    | Notes                       |
| ---------------- | ------- | --------------------------- |
| `id`             | Integer | Primary key, auto-increment |
| `Movie`          | String  | Movie title                 |
| `Actor`          | String  | Main actor                  |
| `Genre`          | String  | Genre                       |
| `releaseDate`    | String  | Release date                |
| `CinemaShowing`  | String  | Cinema showing the movie    |
| `SeatsAvailable` | String  | Available seats             |
| `MovieDuration`  | String  | Duration of the movie       |

### Booked Table

| Field         | Type    | Notes                       |
| ------------- | ------- | --------------------------- |
| `id`          | Integer | Primary key, auto-increment |
| `name`        | String  | Name of the user            |
| `MovieBooked` | String  | Booked movie title          |
| `SeatNumber`  | Integer | Seat number                 |

## Technologies Used

    Node.js: Backend framework.
    Express: Web server.
    Sequelize: ORM for database interaction.
    MySQL: Relational database.
    Stripe API: Payment processing.
    dotenv: Environment variable management.

## Troubleshooting

    Database Connection Issues
        Ensure MySQL is running and credentials in .env are correct.
        Verify the Sequelize setup matches your database configuration.

    Stripe Payment Issues
        Check your Stripe API keys.
        Confirm that the payment method ID is valid.

    API Errors
        Inspect the server logs for details.
        Ensure the request payload matches the expected format.

For further assistance, please open an issue in the repository.

Enjoy the Cinema Booking API! 🚀
