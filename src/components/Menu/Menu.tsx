'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Logo from '../../../public/images/logo_text.svg';
import { links } from './links.const';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

interface Link {
  icon?: React.ReactNode;
  label: string;
  slug: string;
  subLinks?: Link[];
}

export default function Menu() {
  const [currentPage, setCurrentPage] = useState('');
  const [showSubmenu, setShowSubmenu] = useState('');

  const path = usePathname();

  useEffect(() => {
    const paths = path.split('/');
    const currentPath =
      paths[paths.length - 2] === 'posts'
        ? 'anslagstavlan'
        : paths[paths.length - 1];

    setCurrentPage(currentPath);
  }, [path]);

  const handleClick = (label: string) => {
    //console.log(label);
    if (label === showSubmenu) {
      setShowSubmenu('');
    } else {
      setShowSubmenu(label);
    }
  };

  const handleLink = (page: string) => {
    //updatePage(page);
    //setCurrentPage(page);
    setShowSubmenu('');
  };

  return (
    <div className="">
      <div className="w-full md:bg-primary-100 flex items-center justify-center pt-6 pb-4 md:pt-8 md:pb-7 md:py-0 md:h-24">
        <div className="max-w-7xl w-full flex justify-center md:justify-between items-center px-4 md:px-0 ">
          <Link
            href="/"
            onClick={() => handleLink('')}
            className="relative h-14 w-full md:w-72 lg:w-96 shrink-0"
          >
            <Image src={Logo} alt="logo" sizes="100%" fill priority />
          </Link>

          <div className="w-full hidden md:block max-w-md lg:max-w-lg xl:max-w-xl">
            <ul className="flex items-center justify-between">
              {links.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => handleClick(link.label)}
                    className={cn(
                      'text-lg lg:text-xl font-bold hover:underline flex items-center gap-2 transition rounded-b-lg pb-3 pt-2 pr-4 pl-2 lg:pr-6 lg:pl-3.5',
                      link.subLinks.some(
                        (subLink) => subLink.slug === currentPage
                      ) && 'text-accent-500',
                      showSubmenu === link.label &&
                        'bg-primary-500 -translate-y-6'
                    )}
                  >
                    {link.icon}
                    <span className="pt-2 small">{link.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div
        className={cn(
          'bg-primary-500 h-10 w-full md:flex justify-center items-center duration-300 hidden',
          !showSubmenu ? 'scale-y-0' : 'scale-y-100'
        )}
      >
        <ul
          className={cn(
            'rounded-lg border-4 border-primary-500 bg-primary-300 flex justify-center items-center px-8 lg:px-16 py-2 gap-6 lg:gap-8 transition',
            !showSubmenu ? 'scale-y-0' : 'scale-y-100'
          )}
        >
          {links.map((link: Link, index: number) => {
            if (link.label !== showSubmenu) {
              return null;
            }
            return link.subLinks?.map((subLink: Link, index: number) => (
              <li key={index}>
                <Link
                  //href={subLink.url}
                  href={{
                    pathname: `/${link.slug}/${subLink.slug}`,
                    // query: { slug: subLink.label },
                  }}
                  onClick={() => handleLink(subLink.label)}
                  className="font-bold text-md lg:text-xl hover:underline flex items-center"
                >
                  <span
                    className={cn(
                      'small',
                      currentPage === subLink.slug && 'text-accent-500'
                    )}
                  >
                    {subLink.label}
                  </span>
                </Link>
              </li>
            ));
          })}
        </ul>
      </div>
    </div>
  );
}
