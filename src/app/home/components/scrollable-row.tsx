import { useQuery } from 'react-query';
import { Movie, QueryResult } from '~~/typings';
import { BASE_IMAGE_URL } from '~~/utils/request-url';

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
          <img
            src={`${BASE_IMAGE_URL}${movie.backdrop_path}`}
            key={movie.id}
            className='w-70 h-40 object-cover hover:scale-105 transition-all-300 rounded-md'
          />
        ))}
      </div>
    </div>
  );
}
