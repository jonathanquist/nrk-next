import Image from 'next/image';
import StandardImg from '../../public/images/hero_img.jpg';
import { cn } from '@/lib/utils';

interface HeaderProps {
  variant: 'menu' | 'page';
  title: string;
  image?: string;
  children?: React.ReactNode;
}

export default function Header({
  variant,
  image,
  title,
  children,
}: HeaderProps) {
  return (
    <div className="bg-accent-500 rounded-t-2xl flex flex-col items-center justify-center overflow-x-hidden shadow-md md:shadow-none">
      <div
        className={cn(
          'hidden md:flex justify-center items-end relative w-full',
          variant === 'menu' && 'h-80',
          variant === 'page' && 'h-[400px]'
        )}
      >
        <div className="bg-primary-100 bg-opacity-75 w-full max-w-xl py-6 relative z-10 mb-12 backdrop-blur-sm flex item-center justify-center">
          {variant === 'menu' && <h1>{title}</h1>}
          {variant === 'page' && (
            <h1 dangerouslySetInnerHTML={{ __html: title }} />
          )}
        </div>

        <Image
          src={image ? image : StandardImg}
          alt={title}
          sizes="100%"
          fill
          priority
          className="z-0 object-center object-cover"
        />
      </div>

      {children && children}
    </div>
  );
}
