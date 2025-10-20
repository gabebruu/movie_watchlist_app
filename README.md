# Your Movies Watchlist

This is a web application for creating and managing a personal movie watchlist. Users can add, edit, delete, and rate movies, as well as track which movies they have watched.

## Features

- **Add Movies:** Add new movies to your watchlist with details like title, year, genre, and rating.
- **Edit Movies:** Modify the information of existing movies in your list.
- **Delete Movies:** Remove movies from your watchlist.
- **Rate Movies:** Assign a rating to each movie on a scale of 1 to 10.
- **Track Watched Status:** Mark movies as "watched" or "not watched" to keep track of your viewing history.
- **Filter and Sort:**
  - View all movies in your watchlist.
  - Filter movies to see only "watched" or "not watched" films.
  - Sort movies by their rating to see your top-rated films.
- **Share Movies:** Share movie details with others.

## Technologies Used

- **Frontend:**
  - [Next.js](https://nextjs.org/) - React framework for server-side rendering and static site generation.
  - [React](https://reactjs.org/) - JavaScript library for building user interfaces.
  - [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework for styling.

- **Backend:**
  - [Node.js](https://nodejs.org/) - JavaScript runtime environment.
  - [Express](https://expressjs.com/) - Web application framework for Node.js.

- **Database:**
  - [MongoDB](https://www.mongodb.com/) - NoSQL database for storing movie data.
  - [Mongoose](https://mongoosejs.com/) - Object Data Modeling (ODM) library for MongoDB and Node.js.

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

- [Node.js](https://nodejs.org/) (which includes npm)
- [MongoDB](https://www.mongodb.com/try/download/community)

### Installation

1. **Clone the repo:**
   ```sh
   git clone https://github.com/your_username/movie_watchlist_app.git
   ```
2. **Navigate to the project directory:**
   ```sh
   cd movie_watchlist_app
   ```
3. **Install NPM packages:**
   ```sh
   npm install
   ```
4. **Set up your environment variables:**
   Create a `.env.local` file in the root of your project and add your MongoDB connection string:
   ```
   MONGODB_URI=your_mongodb_connection_string
   ```

### Running the Application

1. **Start the development server:**
   ```sh
   npm run dev
   ```
2. **Open your browser:**
   Navigate to `http://localhost:3000` to see the application.

## API Endpoints

The application uses the following API endpoints to manage movies:

- `GET /api/movies`: Fetches all movies.
  - **Query Params:**
    - `watched` (`true` or `false`): Filters movies by their watched status.
    - `sortBy` (`rating`): Sorts movies by rating.
    - `order` (`asc` or `desc`): Sets the sort order.
- `POST /api/movies`: Adds a new movie to the database.
- `PUT /api/movies/:id`: Updates an existing movie by its ID.
- `DELETE /api/movies/:id`: Deletes a movie by its ID.