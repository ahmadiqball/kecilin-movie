export interface Movie {
  title: string;
  backdrop_path: string;
  media_type?: string;
  release_date?: string;
  first_air_date: string;
  genre_ids: Array<number>;
  id: number;
  name: string;
  origin_country: Array<string>;
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  vote_average: number;
  vote_count: number;
}

export interface QueryResult {
  page: number;
  total_pages: number;
  total_results: number;
  results: Array<Movie>;
}

export interface Genres {
  genres: Array<{
    id: number;
    name: string;
  }>;
}

export interface Videos {
  id: number;
  results: Array<{
    iso_639_1: string;
    iso_3166_1: string;
    name: string;
    key: string;
    site: string;
    size: number;
    type: string;
    official: boolean;
    id: string;
  }>;
}
