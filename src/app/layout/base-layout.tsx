import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';

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
      <header
        className={classNames(
          'fixed top-0 left-0 w-full px-5 md:px-20 py-4 flex justify-between items-center',
          {
            'bg-dark-600': isScrolled,
          },
        )}
      >
        <Link
          to='/'
          className='color-white text-xl md:text-3xl no-underline font-bold'
        >
          Movie Time
        </Link>

        <div
          className={classNames(
            'flex items-center gap-4 text-sm absolute top-0 left-0 h-screen flex-col pt-30 w-full bg-dark-700/60 backdrop-blur-sm -z-1 transition-all-300 md:(relative flex-row w-fit translate-none backdrop-blur-none p-0 bg-transparent h-fit)',
            {
              '-translate-y-full': !openMenu,
            },
          )}
        >
          {navigations.map((item) => (
            <Link
              key={item.route}
              to={item.route}
              className='color-gray-300 no-underline hover:color-white text-base'
              onClick={() => setOpenMenu(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <button
          className='bg-transparent border-none flex flex-col justify-between h-4 block md:hidden'
          onClick={() => setOpenMenu(!openMenu)}
        >
          <span
            className={classNames('bg-white h-0.5 w-7 block transition-all-300', {
              'rotate-45 translate-y-1.6': openMenu,
            })}
          />
          <span className={classNames('bg-white h-0.5 w-7 ml-auto block', { hidden: openMenu })} />
          <span
            className={classNames('bg-white h-0.5 w-7 block transition-all-300', {
              '-rotate-45 -translate-y-1.6': openMenu,
            })}
          />
        </button>
      </header>

      <Outlet />
    </>
  );
}
