import classNames from 'classnames';
import { useState } from 'react';

export interface DropdownOption {
  label: string;
  value: string | number;
}

interface Dropdown {
  options?: Array<DropdownOption>;
  defaultValue?: DropdownOption;
  onChange?: (value: DropdownOption) => void;
}

export function Dropdown({ options, defaultValue, onChange }: Dropdown) {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState(defaultValue);

  function changeValueHandler(value: DropdownOption) {
    setValue(value);
    onChange?.(value);
    setIsOpen(false);
  }

  return (
    <div className='relative'>
      <button
        className='w-40 bg-transparent color-white border-white rounded-md py-2 px-3 text-left flex items-center justify-between cursor-pointer'
        onClick={() => setIsOpen(!isOpen)}
      >
        {value?.label}
        <i
          className={classNames('i-tmdb-chevron-right transition-all-250', {
            'rotate-90': !isOpen,
            '-rotate-90': isOpen,
          })}
        />
      </button>
      {isOpen && (
        <div className='flex flex-col w-40 absolute top-10 rounded-md overflow-scroll no-scrollbar max-h-50 shadow-white/30 shadow-xl'>
          {options?.map((item) => (
            <button
              key={item.value}
              className='bg-black/80 color-white border-none py-2 px-2 cursor-pointer'
              onClick={() => changeValueHandler(item)}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
