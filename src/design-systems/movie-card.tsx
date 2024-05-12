import { Movie } from '~~/typings';
import { BASE_IMAGE_URL } from '~~/utils/request-url';

interface MovieCard {
  movie: Movie;
}

export function MovieCard({ movie }: MovieCard) {
  return (
    <img
      src={`${BASE_IMAGE_URL}${movie.backdrop_path || movie.poster_path}`}
      key={movie.id}
      className='w-70 h-40 object-cover hover:scale-105 transition-all-300 rounded-md'
    />
  );
}
