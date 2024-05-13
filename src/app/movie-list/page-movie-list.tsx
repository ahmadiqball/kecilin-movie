import classNames from 'classnames';
import { ChangeEvent, useState } from 'react';
import { useQuery } from 'react-query';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { Dropdown, DropdownOption } from '~~/design-systems/dropdown';
import { useTMDBStore } from '~~/store';
import { Genres, Movie, QueryResult } from '~~/typings';
import { BASE_IMAGE_URL, requestURL } from '~~/utils/request-url';

interface PageMovieList {
  type: 'movies' | 'tv shows' | 'bookmarks';
}

export function PageMovieList({ type }: PageMovieList) {
  const { pathname } = useLocation();
  const [params] = useSearchParams();
  const page = parseInt(params.get('page') || '1');

  const [filterGenre, setFilterGenre] = useState<string | number>('');
  const [filterSearch, setFilterSearch] = useState('');

  const defaultGenres = { label: 'All Genres', value: '' };

  const bookmarks = useTMDBStore.use.bookmarks();
  const openModal = useTMDBStore.use.openModal();

  const queryKey =
    type === 'bookmarks'
      ? bookmarks.map((movie) => movie.id).join('')
      : `${type}-${filterGenre}-${page}-${filterSearch}`;

  const { data } = useQuery({
    queryKey: [queryKey],
    queryFn: async (): Promise<QueryResult> => {
      if (type === 'bookmarks') {
        console.log('🚀 ~ queryFn: ~ bookmarks:', bookmarks);
        const pageFactor = (page - 1) * 20;

        const filteredBookmark = [...bookmarks]
          .filter(
            (movie) =>
              (typeof filterGenre === 'string' || movie.genre_ids.includes(filterGenre)) &&
              movie.title.toLowerCase().includes(filterSearch.toLowerCase()),
          )
          .slice(0 + pageFactor, 20 + pageFactor);

        return {
          results: filteredBookmark,
          page,
          total_pages: Math.ceil(filteredBookmark.length / 20),
          total_results: filteredBookmark.length,
        };
      } else {
        let baseUrl = type === 'movies' ? requestURL.fetchMovies : requestURL.fetchTV;

        if (filterSearch !== '') {
          baseUrl = type === 'movies' ? requestURL.fetchSearchMovie : requestURL.fetchSearchTV;
        }

        const res = await fetch(
          `${baseUrl}&with_genres=${filterGenre}&page=${page}&query=${encodeURI(filterSearch)}`,
        );

        const data: QueryResult = await res.json();

        return data;
      }
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
      setFilterSearch(value);
    }, 1000);
  }

  return (
    <main className='bg-blue-100 dark:bg-dark-700 min-h-screen w-full pt-25 px-5 md:px-25 pb-20'>
      <section className='flex gap-4 flex-col md:flex-row'>
        <div className='flex justify-between items-center grow'>
          <h1 className='color-dark-600 dark:text-white capitalize text-2xl'>{type}</h1>
          <Dropdown
            options={genres}
            defaultValue={defaultGenres}
            onChange={(value) => setFilterGenre(value.value)}
          />
        </div>
        <div className='relative'>
          <input
            className='bg-white/10 color-dark-600 border-dark-600 dark:(bg-black/30 color-white border-white) rounded-md py-2 px-1 pl-9 border-solid outline-none w-full md:w-80'
            onChange={searchChangeHandler}
          />
          <i className='i-tmdb-search color-dark-600 dark:color-white text-lg absolute top-1/2 left-3 -translate-y-1/2' />
        </div>
      </section>
      <section className='grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-5'>
        {data?.results.map((movie: Movie) => (
          <img
            onClick={() => openModal(movie)}
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
            <i className='i-tmdb-chevron-left color-dark-600 dark:color-white text-base' />
          </Link>
        )}
        {[...Array(10)].map((item, index) => (
          <Link
            to={`${pathname}?page=${index + 1 + startPageNav}`}
            key={index}
            className={classNames(
              'color-dark-600 dark:color-white bg-transparent border-none text-base',
              {
                'no-underline': index + 1 + startPageNav !== page,
              },
            )}
          >
            {index + 1 + startPageNav}
          </Link>
        ))}
        {page !== data?.total_pages && (
          <Link
            to={`${pathname}?page=${page + 1}`}
            className='flex items-center'
          >
            <i className='i-tmdb-chevron-right color-dark-600 dark:color-white text-base' />
          </Link>
        )}
      </section>
    </main>
  );
}
