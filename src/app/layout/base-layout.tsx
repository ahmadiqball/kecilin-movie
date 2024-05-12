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
          'fixed top-0 left-0 w-full px-20 py-4 flex justify-between items-center',
          {
            'bg-dark-600': isScrolled,
          },
        )}
      >
        <h1 className='color-white'>Movie Time</h1>

        <div className='flex items-center gap-4 text-sm'>
          {navigations.map((item) => (
            <Link
              key={item.route}
              to={item.route}
              className='color-gray-300 no-underline hover:color-white'
            >
              {item.label}
            </Link>
          ))}
        </div>
      </header>

      <Outlet />
    </>
  );
}
