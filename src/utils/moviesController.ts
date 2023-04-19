import Axios from '../api/Axios';
import { popularMovieType } from './types';

// const genreUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`;

// fetch(genreUrl)
//   .then(response => response.json())
//   .then(data => {
//     // Handle the list of genres returned by the API
//   })
//   .catch(error => {
//     console.error('Error fetching genres:', error);
//   });

export interface Movie {
  // Define interface for Movie here
  results: popularMovieType[];
  page: number;
  total_pages: number;
  total_results: number;
}

interface Genre {
  genres: {
    id: number;
    name: string;
  }[];
}

class MovieController {
  async index() {
    const { data: movies } = await Axios.get<Movie>('/movie/popular');
    const { data: playing } = await Axios.get<Movie>('/movie/now_playing');

    const { data: genreArr } = await Axios.get<Genre>('/genre/movie/list');

    const data = {
      movies: movies.results,
      genres: genreArr.genres,
      playing: playing.results,
    };

    return data;
  }
}

export default new MovieController();
