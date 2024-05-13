import classNames from 'classnames';
import { useEffect, useState } from 'react';

export function DarkModeToggle() {
  const [mode, setMode] = useState('light');

  useEffect(() => {
    if (document.documentElement.classList.contains('dark')) {
      setMode('dark');
    } else {
      setMode('light');
    }
  }, []);

  const changeMode = () => {
    if (mode === 'light') {
      setMode('dark');
      document.documentElement.classList.add('dark');
    } else {
      setMode('light');
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <button
      onClick={changeMode}
      className='bg-dark/20 border-dark-600 dark:(bg-white/20 border-white) border-solid w-15 flex p-1 rounded-full cursor-pointer'
    >
      <span
        className={classNames(
          'rounded-full w-5 h-5 flex items-center justify-center transition-all-250',
          {
            'translate-x-7.25 bg-dark-800': mode === 'dark',
            'bg-white': mode === 'light',
          },
        )}
      >
        <i
          className={classNames('text-sm', {
            'i-tmdb-sun color-dark-800': mode === 'light',
            'i-tmdb-moon color-white': mode === 'dark',
          })}
        />
      </span>
    </button>
  );
}
