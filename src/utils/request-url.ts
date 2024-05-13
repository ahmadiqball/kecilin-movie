export const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
export const BASE_URL = 'https://api.themoviedb.org/3';
export const BASE_IMAGE_URL = 'https://image.tmdb.org/t/p/original';

export const requestURL = {
  fetchTrending: `${BASE_URL}/trending/all/week?api_key=${API_KEY}&language=en-US`,
  fetchMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}`,
  fetchTV: `${BASE_URL}/discover/tv?api_key=${API_KEY}`,
  fetchTopRated: `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US`,
  fetchActionMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=28`,
  fetchComedyMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=35`,
  fetchHorrorMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=27`,
  fetchRomanceMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=10749`,
  fetchDocumentaries: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=99`,
  fetchMovieGenres: `${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=en-US`,
  fetchTVGenres: `${BASE_URL}/genre/tv/list?api_key=${API_KEY}&language=en-US`,
  fetchSearchMovie: `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US`,
  fetchSearchTV: `${BASE_URL}/search/tv?api_key=${API_KEY}&language=en-US`,
};
