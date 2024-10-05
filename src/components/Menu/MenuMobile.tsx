'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { mobileLinks } from './links.const';
import { usePathname } from 'next/navigation';
import { useViewport } from '@/hooks/useViewport';
import {
  IconArrowDouble,
  Modal,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '../UI';
import { cn } from '@/lib/utils';

interface Link {
  icon?: React.ReactNode;
  label: string;
  slug: string;
  subLinks?: Link[];
}

export default function MenuMobile() {
  const [currentPage, setCurrentPage] = useState('');
  const [showSubmenu, setShowSubmenu] = useState('');

  const path = usePathname();
  const { height } = useViewport();

  useEffect(() => {
    const paths = path.split('/');
    const currentPath =
      paths[paths.length - 2] === 'posts'
        ? 'anslagstavlan'
        : paths[paths.length - 1];

    setCurrentPage(currentPath);
  }, [path]);

  const handleClick = (label: string) => {
    if (label === showSubmenu) {
      setShowSubmenu('');
    } else {
      setShowSubmenu(label);
    }
  };

  const handleLink = (page: string) => {
    setShowSubmenu('');
  };

  return (
    <div className="relative w-full flex flex-col items-center justify-between overflow-y-none h-[122px] h-sm:h-[100dvh] h-sm:w-[140px] shrink-0">
      <ul className="flex items-center h-sm:flex-col justify-between px-6 pt-5 h-sm:pb-5 w-full gap-6 h-sm:h-[100dvh]">
        {mobileLinks.map((link, index) => (
          <li key={index} className="w-full">
            <Popover open={showSubmenu === link.label}>
              <PopoverTrigger asChild>
                <button
                  onClick={() => handleClick(link.label)}
                  className={cn(
                    'text-sm leading-none font-bold hover:underline flex flex-col items-center rounded-lg pb-2 w-full px-2 bg-primary-100 shadow-md',

                    link.subLinks.some(
                      (subLink) => subLink.slug === currentPage
                    ) && 'text-accent-500'
                  )}
                >
                  {link.icon}
                  <span className="small">{link.label}</span>
                </button>
              </PopoverTrigger>
              <PopoverContent
                sideOffset={12}
                side={height <= 520 ? 'left' : 'top'}
                asChild
              >
                <div className="px-3.5 py-5 max-h-[100dvh] overflow-y-scroll">
                  <ul className="text-accent-500 flex flex-col gap-4">
                    {link.subLinks?.map((subLink, index) => (
                      <li key={index} className="py-0.5 flex items-center">
                        <div className="shrink-0 mx-3 w-1.5 h-1.5 rounded-full bg-accent-500" />
                        <Link
                          href={{
                            pathname: `/${link.slug}/${subLink.slug}`,
                            query: { slug: subLink.label },
                          }}
                          onClick={() => handleLink(subLink.label)}
                          className="font-bold text-xl flex items-center"
                        >
                          <span
                            className={cn(
                              'small',
                              currentPage === subLink.slug
                                ? 'text-accent-500'
                                : 'text-primary-900'
                            )}
                          >
                            {subLink.label}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </PopoverContent>
            </Popover>
          </li>
        ))}
      </ul>
      <div className="flex justify-center w-full px-20">
        <div className="bg-primary-500 opacity-50 w-full rounded-t-full flex items-center justify-center py-2 text-xs h-sm:hidden">
          <IconArrowDouble className="w-4 h-4" /> Kommer snart
        </div>
        {/*Schema*/}
      </div>
    </div>
  );
}
