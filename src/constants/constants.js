export const apiKey = import.meta.env.VITE_MOVIE_API_KEY;

export const options = {
  method: "GET",
  headers: {
    "x-rapidapi-key": import.meta.env.VITE_MOVIE_API_KEY,
    "x-rapidapi-host": "movies-api14.p.rapidapi.com",
  },
};
