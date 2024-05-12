import { useQuery } from 'react-query';
import { Movie, QueryResult } from '~~/typings';
import { BASE_IMAGE_URL, requestURL } from '~~/utils/request-url';

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
    <main className='bg-dark-700 min-h-screen w-full pt-25 px-5 md:px-25 pb-20'>
      <h1 className='text-white capitalize text-2xl'>{type}</h1>
      <section className='grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-5'>
        {data?.map((movie) => (
          <img
            src={`${BASE_IMAGE_URL}${movie.backdrop_path || movie.poster_path}`}
            key={movie.id}
            className='h-60 w-full mx-auto md:(w-70 h-40) object-cover hover:scale-105 transition-all-300 rounded-md'
          />
        ))}
      </section>
    </main>
  );
}
