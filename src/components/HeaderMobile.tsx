import Image from 'next/image';
import StandardImg from '../../public/images/standard_image.jpg';
import { cn } from '@/lib/utils';

interface HeaderProps {
  variant: 'menu' | 'page';
  title: string;
  image?: string;
  imageClass?: string;
  children?: React.ReactNode;
  onMobile?: boolean;
}

export default function HeaderMobile({
  variant,
  image,
  imageClass,
  title,
  children,
  onMobile,
}: HeaderProps) {
  return (
    <div className="">
      <div className="relative h-72 w-full">
        <Image
          src={image ? image : StandardImg}
          alt={title}
          sizes="100%"
          fill
          priority
          className="object-center object-cover"
        />
      </div>
      {children && children}
    </div>
  );
}
