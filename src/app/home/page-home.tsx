import { useQuery } from 'react-query';
import { Movie, QueryResult } from '~~/typings';
import { ScrollableRow } from './components/scrollable-row';
import { BASE_IMAGE_URL, requestURL } from '~~/utils/request-url';

export function PageHome() {
  const { data: banner } = useQuery({
    queryKey: ['auth'],
    queryFn: async (): Promise<Movie> => {
      const res = await fetch(requestURL.fetchMovies);

      const data: QueryResult = await res.json();
      console.log('🚀 ~ queryFn: ~ data:', data);

      return data.results[0];
    },
  });

  return (
    <main className='pb-20 bg-dark-700'>
      <section
        className='bg-cover color-white'
        style={{ backgroundImage: `url(${BASE_IMAGE_URL}${banner?.backdrop_path})` }}
      >
        <div className='bg-gradient-to-t from-dark-700 via-dark-700/60 to-dark-700/40 h-screen px-20 flex flex-col justify-end pb-60'>
          <h1 className='text-5xl leading-[1.3] max-w-4xl'>{banner?.title}</h1>
          <p className='max-w-3xl mt-8 color-gray-100'>{banner?.overview}</p>
        </div>
      </section>

      <section className='-mt-40'>
        <ScrollableRow
          url={requestURL.fetchTrending}
          title='Trending Now'
        />
        <ScrollableRow
          url={requestURL.fetchTopRated}
          title='Top Rated'
        />
        <ScrollableRow
          url={requestURL.fetchActionMovies}
          title='Action'
        />
        <ScrollableRow
          url={requestURL.fetchComedyMovies}
          title='Comedy'
        />
        <ScrollableRow
          url={requestURL.fetchDocumentaries}
          title='Documentaries'
        />
        <ScrollableRow
          url={requestURL.fetchHorrorMovies}
          title='Horror'
        />
        <ScrollableRow
          url={requestURL.fetchRomanceMovies}
          title='Romance'
        />
      </section>
    </main>
  );
}
