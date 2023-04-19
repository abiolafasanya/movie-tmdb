export type popularMovieType = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: false;
  vote_average: number;
  vote_count: number;
};

type genres = {
  id: number;
  name: string;
};

type prodCompany = {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
};

type prodCountry = {
  iso_3166_1: string;
  name: string;
};

type spokenLang = {
  english_name: string;
  iso_639_1: string;
  name: string;
};

export type Genre = {
  id: number;
  name: string;
};

export type movieType = {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: any;
  budget: number;
  genres: {
    id: number;
    name: string;
  }[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: prodCompany[];
  production_countries: prodCountry[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: spokenLang[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export type castType = {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  title: string;
  original_name: string;
  original_title: string;
  release_date: string;
  first_aired: string;
  popularity: number;
  profile_path: string;
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
  backdrop_path: string;
  poster_path: string;
};

export type crewType = {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  credit_id: string;
  department: string;
  job: string;
};

export type creditsType = {
  cast: castType[];
  crew: crewType[];
}

export type actorsType = {
  name: string;
  adult: boolean;
  gender: number;
  id: number;
  known_for: known_for[];
};

export type known_for = {
  backdrop_path: string;
  first_air_date: string;
  genre_ids: Array<number>;
  id: number;
  media_type: string;
  name: string;
  title: string;
  origin_country: Array<string>;
  original_language: string;
  original_name: string;
  original_title: string;
  overview: string;
  poster_path: string;
  vote_average: number;
  vote_count: number;
};

export type actorType = {
  adult: boolean;
  also_known_as: Array<string>;
  biography: string;
  birthday: string;
  deathday: string;
  gender: number;
  homepage: string;
  id: number;
  imdb_id: string;
  known_for_department: string;
  name: string;
  place_of_birth: string;
  popularity: number;
  profile_path: string;
};

export type Socials = {
  id: number;
  freebase_mid: string;
  freebase_id: string;
  imdb_id: string;
  tvrage_id: string;
  wikidata_id: string;
  facebook_id: string;
  instagram_id: string;
  tiktok_id: string;
  twitter_id: string;
  youtube_id: string;
};