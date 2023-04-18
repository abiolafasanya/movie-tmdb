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
    const { data: movies } = await Axios.get<Movie>('/popular');
   
    const { data: genreArr } = await Axios.get<Genre>(
      'https://api.themoviedb.org/3/genre/movie/list'
    );
    // console.log('genreArr:', genreArr.genres);
    const getGenres = () => {
      const genresById = {} as { [id: number]: string };

      // Create a map of genre IDs to genre names
      return genreArr.genres.map(
        (genre) => (genresById[genre.id] = genre.name)
      );
    };

    // const genres = getGenres();
    const data = {
      movies: movies.results,
      genres: genreArr.genres,
    };

    return data;
  }
}

export default new MovieController();
