import { useQuery } from 'react-query';
import { MovieCard } from '~~/design-systems/movie-card';
import { Movie, QueryResult } from '~~/typings';
import { requestURL } from '~~/utils/request-url';

interface PageMovieAndShow {
  type: 'movies' | 'tv shows';
}

export function PageMovieAndShow({ type }: PageMovieAndShow) {
  const { data } = useQuery({
    queryKey: [type],
    queryFn: async (): Promise<Array<Movie>> => {
      const baseUrl = type === 'movies' ? requestURL.fetchMovies : requestURL.fetchTV;

      const res = await fetch(baseUrl);

      const data: QueryResult = await res.json();

      return data.results;
    },
  });

  return (
    <main className='bg-dark-700 min-h-screen w-full pt-25 px-25'>
      <h1 className='text-white capitalize text-2xl'>{type}</h1>
      <section className='grid grid-cols-4 gap-4 mt-5'>
        {data?.map((movie) => (
          <MovieCard
            movie={movie}
            key={movie.id}
          />
        ))}
      </section>
    </main>
  );
}
