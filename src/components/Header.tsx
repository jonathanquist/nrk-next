import Image from 'next/image';
import StandardImg from '../../../public/images/hero_img.jpg';

interface HeaderProps {
  variant: 'sm' | 'md' | 'lg';
  image: string;
  title: string;
}

export default function Header({ variant, image, title }: HeaderProps) {
  return (
    <div className="bg-accent-500 flex flex-col items-center justify-center overflow-x-hidden shadow-md md:shadow-none">
      <div className="hidden md:flex justify-center items-end relative w-full h-80">
        {title && variant !== 'lg' && (
          <div className="bg-primary-100 bg-opacity-75 w-full max-w-xl py-6 relative z-10 mb-12 backdrop-blur-sm flex item-center justify-center">
            <h1>{title}</h1>
          </div>
        )}
        <Image
          src={image ? image : StandardImg}
          alt={title}
          sizes="100%"
          fill
          className="z-0 object-center object-cover"
        />
      </div>
    </div>
  );
}
