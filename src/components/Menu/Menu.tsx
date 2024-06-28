'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useCallback, useMemo, useState } from 'react';
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

interface NavbarProps {
  children: React.ReactNode;
}

interface SubMenuProps {
  showSubmenu: string;
  currentPage: string;
  handleLink: (page: string) => void;
}

const Navbar = ({ children }: NavbarProps) => (
  <div className="w-full hidden md:block max-w-md lg:max-w-lg xl:max-w-xl">
    <ul className="flex items-center justify-between">{children}</ul>
  </div>
);

const SubMenu = ({ showSubmenu, currentPage, handleLink }: SubMenuProps) => (
  <div
    className={cn(
      'bg-primary-500 h-10 w-full md:flex justify-center items-center duration-300 hidden',
      !showSubmenu && 'scale-y-0'
    )}
  >
    <ul
      className={cn(
        'rounded-lg border-4 border-primary-500 bg-primary-300 flex justify-center items-center px-8 lg:px-16 py-2 gap-6 lg:gap-8 transition',
        !showSubmenu && 'scale-y-0'
      )}
    >
      {links
        .filter((link) => link.label === showSubmenu)
        .flatMap((link) =>
          link.subLinks?.map((subLink, index) => (
            <li key={subLink.slug}>
              <Link
                href={`/${link.slug}/${subLink.slug}`}
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
          ))
        )}
    </ul>
  </div>
);

export default function Menu() {
  const [showSubmenu, setShowSubmenu] = useState('');

  const path = usePathname();

  const currentPath = useMemo(() => {
    const paths = path.split('/');
    return paths[paths.length - 2] === 'posts'
      ? 'anslagstavlan'
      : paths[paths.length - 1];
  }, [path]);

  const handleClick = useCallback((label: string) => {
    setShowSubmenu((prev) => (prev === label ? '' : label));
  }, []);

  const handleLink = useCallback((page: string) => {
    setShowSubmenu('');
  }, []);

  return (
    <div className="">
      <div className="w-full md:bg-primary-100 flex items-center justify-center md:h-24">
        <div className="max-w-7xl w-full flex justify-center md:justify-between items-center px-4 md:px-0 ">
          {/* Logo and Navbar */}
          <Link
            href="/"
            onClick={() => setShowSubmenu('')}
            className="relative h-14 w-full md:w-72 lg:w-96 shrink-0"
          >
            <Image src={Logo} alt="logo" sizes="100%" fill priority />
          </Link>
          <Navbar>
            {links.map((link) => (
              <li key={link.slug} className="h-14">
                <button
                  onClick={() => handleClick(link.label)}
                  className={cn(
                    'text-lg lg:text-xl font-bold h-20 hover:underline flex items-end gap-2 transition rounded-b-lg pb-4 pt-2 pr-4 pl-2 lg:pr-6 lg:pl-3.5 -translate-y-6',
                    link.subLinks.some(
                      (subLink) => subLink.slug === currentPath
                    ) && 'text-accent-500',
                    showSubmenu === link.label &&
                      'bg-primary-500 -translate-y-10'
                  )}
                >
                  {link.icon}
                  <span className="pt-2 small">{link.label}</span>
                </button>
              </li>
            ))}
          </Navbar>
        </div>
      </div>
      {/* SubMenu */}
      <SubMenu
        showSubmenu={showSubmenu}
        currentPage={currentPath}
        handleLink={handleLink}
      />
    </div>
  );
}
