'use client';

import clsx from 'clsx';

const Button = ({
  type,
  fullWidth,
  children,
  onClick,
  secondary,
  disabled,
  danger,
  small,
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={clsx(
        `
        flex
        justify-center
        rounded-md
        px-3
        py-2
        text-sm
        font-semibold
        focus-visible:outline
        focus-visible:outline-2
        focus-visible:outline-offset-2
        w-full
      `,
        disabled && 'opacity-50 cursor-default',
        fullWidth && 'w-full',
        secondary ? 'text-gray-500' : 'text-white',
        danger &&
          'bg-rose-500 hover:bg-rose-600 focus-visible:outline-rose-600',
        !secondary &&
          !danger &&
          'bg-green-500 hover:bg-green-600 focus-visible:outline-green-600',
        small && 'w-40 h-8'
      )}
    >
      {children}
    </button>
  );
};

export default Button;
