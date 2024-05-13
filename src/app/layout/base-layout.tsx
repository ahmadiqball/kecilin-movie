import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { ModalMovie } from '~~/design-systems/modal-movie';
import { DarkModeToggle } from './dark-mode-toggle';

const navigations = [
  { label: 'Home', route: '/' },
  { label: 'Movies', route: '/movies' },
  { label: 'TV Shows', route: '/tv-shows' },
  { label: 'Bookmarks', route: '/bookmarks' },
];

export function BaseLayout() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <ModalMovie />
      <header
        className={classNames(
          'fixed z-50 top-0 left-0 w-full px-5 md:px-20 py-4 flex gap-6 justify-between items-center',
          {
            'bg-blue-100 dark:bg-dark-600': isScrolled,
          },
        )}
      >
        <Link
          to='/'
          className='color-dark-900 dark:color-white text-xl md:text-3xl no-underline font-bold'
        >
          Movie Time
        </Link>

        <div
          className={classNames(
            'flex items-center gap-4 text-sm absolute top-0 left-0 h-screen flex-col pt-30 w-full bg-dark-700/60 backdrop-blur-sm -z-1 transition-all-300 md:(relative flex-row grow justify-end w-fit translate-none backdrop-blur-none p-0 bg-transparent h-fit)',
            {
              '-translate-y-full': !openMenu,
            },
          )}
        >
          {navigations.map((item) => (
            <Link
              key={item.route}
              to={item.route}
              className=' no-underline color-gray-500 hover:color-dark-900 dark:(color-gray-300 hover:color-white) text-base relative'
              onClick={() => setOpenMenu(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className='flex items-center gap-4'>
          <DarkModeToggle />

          <button
            className='bg-transparent border-none flex flex-col justify-between h-4 block md:hidden'
            onClick={() => setOpenMenu(!openMenu)}
          >
            <span
              className={classNames('bg-white h-0.5 w-7 block transition-all-300', {
                'rotate-45 translate-y-1.6': openMenu,
              })}
            />
            <span
              className={classNames('bg-white h-0.5 w-7 ml-auto block', { hidden: openMenu })}
            />
            <span
              className={classNames('bg-white h-0.5 w-7 block transition-all-300', {
                '-rotate-45 -translate-y-1.6': openMenu,
              })}
            />
          </button>
        </div>
      </header>

      <Outlet />
    </>
  );
}
