import { useQuery } from 'react-query';
import { MovieCard } from '~~/design-systems/movie-card';
import { Movie, QueryResult } from '~~/typings';

interface ScrollableRow {
  url: string;
  title: string;
}

export function ScrollableRow({ url, title }: ScrollableRow) {
  const { data } = useQuery({
    queryKey: [title],
    queryFn: async (): Promise<Array<Movie>> => {
      const res = await fetch(url);

      const data: QueryResult = await res.json();

      return data.results;
    },
  });

  return (
    <div className='pl-20'>
      <h6 className='color-white text-2xl'>{title}</h6>
      <div className='flex gap-4 w-full overflow-scroll no-scrollbar mt-5'>
        {data?.map((movie) => (
          <MovieCard
            movie={movie}
            key={movie.id}
          />
        ))}
      </div>
    </div>
  );
}
