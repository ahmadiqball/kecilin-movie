import classNames from 'classnames';
import { createPortal } from 'react-dom';
import { useQuery } from 'react-query';
import { useTMDBStore } from '~~/store';
import { Videos } from '~~/typings';
import { API_KEY, BASE_URL } from '~~/utils/request-url';

export function ModalMovie() {
  const modalMovie = useTMDBStore.use.modalMovie();
  const closeModal = useTMDBStore.use.closeModal();
  const bookmark = useTMDBStore.use.bookmarks();
  const addBookmarks = useTMDBStore.use.addBookmarks();
  const removeBookmarks = useTMDBStore.use.removeBookmarks();

  const isBookmarked = bookmark.filter((item) => item.id === modalMovie?.id).length > 0;

  const { data: video } = useQuery({
    queryKey: [`video-${modalMovie?.id}`],
    queryFn: async (): Promise<string> => {
      if (modalMovie) {
        const res = await fetch(
          `${BASE_URL}/${modalMovie?.media_type || 'movie'}/${modalMovie?.id}/videos?language=en-US&api_key=${API_KEY}`,
        );

        const data: Videos = await res.json();

        return data.results[0].key;
      }

      return '';
    },
  });

  if (!modalMovie) return null;

  const informations = [
    { label: 'Release date : ', value: modalMovie.release_date },
    { label: 'Origin language: ', value: modalMovie.original_language },
    { label: 'Rating : ', value: modalMovie.vote_average },
    { label: 'Total votes : ', value: modalMovie.vote_count },
  ];

  function bookmarkHandler() {
    if (isBookmarked) {
      removeBookmarks(modalMovie!);
    } else {
      addBookmarks(modalMovie!);
    }
  }

  const Modal = (
    <div className='fixed z-100 top-0 left-0 h-screen w-screen bg-black/50'>
      <div className='fixed top-1/2 left-1/2 -translate-1/2 bg-blue-200 color-dark-600 dark:(bg-dark-600 color-white) rounded-2.5 w-60/100 max-h-[90vh] overflow-scroll no-scrollbar'>
        <button
          className='bg-black/40 p-1 border-white border-solid rounded-full absolute right-6 top-6 hover:bg-black/80'
          onClick={closeModal}
        >
          <i className='i-tmdb-close text-3xl color-white cursor-pointer' />
        </button>

        <iframe
          src={`https://www.youtube.com/embed/${video}`}
          allowFullScreen
          className='border-0 aspect-video h-[50vh] w-full'
        />

        <div className='flex justify-between items-center px-6 mt-5'>
          <h3 className='text-2xl'>{modalMovie.title}</h3>
          <button
            className='bg-transparent border-dark-600 dark:border-white border-solid p-2 rounded-full cursor-pointer'
            onClick={bookmarkHandler}
          >
            <i
              className={classNames('text-2xl color-dark-600 dark:color-white', {
                'i-tmdb-bookmark': !isBookmarked,
                'i-tmdb-bookmark-fill': isBookmarked,
              })}
            />
          </button>
        </div>
        <div className='p-6 flex gap-8'>
          <p className='text-sm'>{modalMovie.overview}</p>
          <div className='text-xs w-200'>
            {informations.map((item) => (
              <p
                key={item.value}
                className='mt-1 font-semibold'
              >
                <span className='text-gray-500 dark:text-gray-400'>{item.label}</span>
                <span>{item.value}</span>
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(Modal, document.getElementById('modal')!);
}
