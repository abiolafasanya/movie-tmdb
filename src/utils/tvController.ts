import Axios from '../api/Axios';
import { popularMovieType } from './types';

export interface Movie {
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

class TvController {
  async index() {
    const { data: tvs } = await Axios.get<Movie>('/tv/popular');
    const { data: rated } = await Axios.get<Movie>('/tv/top_rated');

    const { data: genreArr } = await Axios.get<Genre>('/genre/tv/list');

    const data = {
      tvs: tvs.results,
      genreArr: genreArr.genres,
      rated: rated.results,
    };

    return data;
  }
}

export default new TvController();
