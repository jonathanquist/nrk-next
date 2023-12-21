import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Logo from '../../../public/images/logo_text.svg';
import LogoSimple from '../../../public/images/logo.svg';
import { IconArrowSimple } from '../../../public/images/IconArrowSimple';

export default function HeaderMobile() {
  const [currentPage, setCurrentPage] = useState<string>('');
  const path = usePathname();

  useEffect(() => {
    const paths = path.split('/');
    const currentPath =
      paths[paths.length - 2] === 'posts'
        ? 'anslagstavlan'
        : paths[paths.length - 1];

    setCurrentPage(currentPath);
  }, [path]);

  const getTitle = (title: string) => {
    return title.charAt(0).toUpperCase() + title.slice(1);
  };

  console.log('pie', currentPage, path);

  return (
    <div className="w-full flex items-center justify-center pt-6 pb-4 px-6">
      {path === '/' ? (
        <div className="w-full flex justify-center items-center">
          <Link
            href="/"
            //   onClick={() => handleLink('')}
            className="relative h-14 w-full shrink-0"
          >
            <Image src={Logo} alt="logo" sizes="100%" fill priority />
          </Link>
        </div>
      ) : (
        <div className="w-full flex justify-between items-center">
          <div className="flex items-center gap-1">
            <Link href="/" className="relative h-9 w-6 shrink-0">
              <Image src={LogoSimple} alt="logo" sizes="100%" fill priority />
            </Link>
            <IconArrowSimple className="w-6 h-6 text-primary-700" />
          </div>
          <div className="pr-12 w-full text-center">
            <h1 className="text-4xl text small">
              {currentPage.charAt(0).toUpperCase() + currentPage.slice(1)}
            </h1>
          </div>
        </div>
      )}
    </div>
  );
}
