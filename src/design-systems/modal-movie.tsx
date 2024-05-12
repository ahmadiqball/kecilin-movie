import classNames from 'classnames';
import { HtmlHTMLAttributes } from 'react';
import { createPortal } from 'react-dom';

interface ModalMovie extends HtmlHTMLAttributes<HTMLDivElement> {
  openModal: boolean;
  className?: string;
}

export function ModalMovie({ openModal, className, ...props }: ModalMovie) {
  if (!openModal) return null;

  const Container = (
    <div className='fixed top-0 left-0 z-50 h-screen w-screen bg-black/50'>
      <div
        className={classNames(
          className,
          'fixed top-1/2 left-1/2 -translate-1/2 bg-dark-800 color-white rounded-2.5 p-6',
        )}
        {...props}
      >
        asca
      </div>
    </div>
  );

  return createPortal(Container, document.getElementById('modal')!);
}
