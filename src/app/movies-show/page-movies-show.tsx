import classNames from 'classnames';
import { ChangeEvent, useState } from 'react';
import { useQuery } from 'react-query';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { Dropdown, DropdownOption } from '~~/design-systems/dropdown';
import { Genres, Movie, QueryResult } from '~~/typings';
import { BASE_IMAGE_URL, requestURL } from '~~/utils/request-url';

interface PageMovieAndShow {
  type: 'movies' | 'tv shows';
}

export function PageMovieAndShow({ type }: PageMovieAndShow) {
  const { pathname } = useLocation();
  const [params] = useSearchParams();
  const page = parseInt(params.get('page') || '1');

  const [filterGenre, setFilterGenre] = useState<string | number>('');
  const [filterSearch, setFilterSearch] = useState('');

  const defaultGenres = { label: 'All Genres', value: '' };

  const { data } = useQuery({
    queryKey: [`${type}-${filterGenre}-${page}-${filterSearch}`],
    queryFn: async (): Promise<QueryResult> => {
      let baseUrl = type === 'movies' ? requestURL.fetchMovies : requestURL.fetchTV;

      if (filterSearch !== '') {
        baseUrl = type === 'movies' ? requestURL.fetchSearchMovie : requestURL.fetchSearchTV;
      }

      const res = await fetch(
        `${baseUrl}&with_genres=${filterGenre}&page=${page}&query=${encodeURI(filterSearch)}`,
      );

      const data: QueryResult = await res.json();
      console.log('🚀 ~ queryFn: ~ data:', data);

      return data;
    },
  });

  const { data: genres } = useQuery({
    queryKey: [`${type}-genres`],
    queryFn: async (): Promise<Array<DropdownOption>> => {
      const baseUrl = type === 'movies' ? requestURL.fetchMovieGenres : requestURL.fetchTVGenres;

      const res = await fetch(baseUrl);

      const data: Genres = await res.json();

      const genreOptions: Array<DropdownOption> = data.genres.map((genre) => {
        return {
          label: genre.name,
          value: genre.id,
        };
      });

      genreOptions.unshift(defaultGenres);
      return genreOptions;
    },
  });

  const startPageNav = Math.floor(page / 10) * 10;

  let searchTimeout: NodeJS.Timeout;
  function searchChangeHandler(event: ChangeEvent<HTMLInputElement>) {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      const value = event.target.value;
      console.log('🚀 ~ searchTimeout=setTimeout ~ value:', value);
      setFilterSearch(value);
    }, 1000);
  }

  return (
    <main className='bg-dark-700 min-h-screen w-full pt-25 px-5 md:px-25 pb-20'>
      <section className='flex gap-4 flex-col md:flex-row'>
        <div className='flex justify-between items-center grow'>
          <h1 className='text-white capitalize text-2xl'>{type}</h1>
          <Dropdown
            options={genres}
            defaultValue={defaultGenres}
            onChange={(value) => setFilterGenre(value.value)}
          />
        </div>
        <div className='relative'>
          <input
            className='bg-black/30 color-white border-white rounded-md py-2 px-1 pl-9 border-solid outline-none w-full md:w-80'
            onChange={searchChangeHandler}
          />
          <i className='i-tmdb-search color-white text-lg absolute top-1/2 left-3 -translate-y-1/2' />
        </div>
      </section>
      <section className='grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-5'>
        {data?.results.map((movie: Movie) => (
          <img
            src={`${BASE_IMAGE_URL}${movie.backdrop_path || movie.poster_path}`}
            key={movie.id}
            className='h-60 w-full mx-auto md:(w-70 h-40) object-cover hover:scale-105 transition-all-300 rounded-md'
          />
        ))}
      </section>

      <section className='mx-auto mt-10 flex items-center justify-center gap-3'>
        {page !== 1 && (
          <Link
            to={`${pathname}?page=${page - 1}`}
            className='flex items-center'
          >
            <i className='i-tmdb-chevron-left color-white text-base' />
          </Link>
        )}
        {[...Array(10)].map((item, index) => (
          <Link
            to={`${pathname}?page=${index + 1 + startPageNav}`}
            key={index}
            className={classNames('color-white bg-transparent border-none text-base', {
              'no-underline': index + 1 + startPageNav !== page,
            })}
          >
            {index + 1 + startPageNav}
          </Link>
        ))}
        {page !== data?.total_pages && (
          <Link
            to={`${pathname}?page=${page + 1}`}
            className='flex items-center'
          >
            <i className='i-tmdb-chevron-right color-white text-base' />
          </Link>
        )}
      </section>
    </main>
  );
}
