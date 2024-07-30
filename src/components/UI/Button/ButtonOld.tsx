import { cn } from '@/lib/utils';
import { ButtonHTMLAttributes } from 'react';

type ButtonProps = {
  icon?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
};

type Props = ButtonProps & ButtonHTMLAttributes<HTMLButtonElement>;

const ButtonOld = ({ children, icon, size, className, ...props }: Props) => {
  const getButtonSize = () => {
    switch (size) {
      case 'sm':
        return 'rounded-md text-base h-8 px-4 pt-[2px]';

      case 'md':
        return `rounded-lg text-lg px-8 py-3 gap-1.5 tracking-wider justify-center ${
          icon ? 'pl-5 pr-8' : 'px-8'
        } `;

      case 'lg':
        return `rounded-xl text-xl px-8 py-4 gap-2.5 justify-center ${
          icon ? 'pl-8 pr-12' : 'px-12'
        } `;
      default:
        return ``;
    }
  };

  return (
    <button
      className={cn(
        'font-bold bg-accent-500 tracking text-primary-100 flex justify-center items-center  whitespace-nowrap',
        getButtonSize(),
        className
      )}
      {...props}
    >
      {icon && <span className="">{icon}</span>}
      <span className="small">{children}</span>
    </button>
  );
};

export { ButtonOld };
