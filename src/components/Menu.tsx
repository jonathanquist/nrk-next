'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Logo from '../../public/images/logo_text.svg';
import { links } from './links.const';
import { usePathname } from 'next/navigation';

interface Link {
  icon?: React.ReactNode;
  label: string;
  slug: string;
  subLinks?: Link[];
}

export default function Menu() {
  const [currentPage, setCurrentPage] = useState('');
  const [showSubmenu, setShowSubmenu] = useState('');
  //const { currentPage, updatePage } = useMenu();

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
      <div className="w-full bg-primary-100 flex items-center justify-center h-24">
        <div className="max-w-7xl w-full flex justify-between items-center gap-96">
          <Link
            href="/"
            onClick={() => handleLink('')}
            className="relative h-14 w-96 shrink-0"
          >
            <Image src={Logo} alt="logo" sizes="100%" fill priority />
          </Link>

          <div className="w-full">
            <ul className="flex items-center justify-between">
              {links.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => handleClick(link.label)}
                    className={`text-xl font-bold hover:underline flex items-center gap-2 transition rounded-b-lg pb-3 pt-2 px-6 ${
                      link.subLinks.some(
                        (subLink) => subLink.slug === currentPage
                      )
                        ? 'text-accent-500'
                        : ''
                    } ${
                      showSubmenu === link.label
                        ? 'bg-primary-500 -translate-y-5'
                        : ''
                    }`}
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
        className={`bg-primary-500 h-10 w-full flex justify-center items-center duration-300 ${
          !showSubmenu ? 'scale-y-0' : 'scale-y-100'
        }
            `}
      >
        <div
          className={`rounded-lg border-4 border-primary-500 bg-primary-300 flex justify-center items-center px-16 py-2 gap-8 transition ${
            !showSubmenu ? 'scale-y-0' : 'scale-y-100'
          }`}
        >
          {links.map((link: Link, index: number) => {
            if (link.label !== showSubmenu) {
              return null;
            }
            //console.log(link.subLinks, currentPage);
            return link.subLinks?.map((subLink: Link, index: number) => (
              <Link
                key={index}
                //href={subLink.url}
                href={{
                  pathname: `/${link.slug}/${subLink.slug}`,
                  query: { slug: subLink.label },
                  //pathname: `/aktiviteter/anslagstavla/`,
                }}
                onClick={() => handleLink(subLink.label)}
                // onClick={() => {
                //   setCurrentPage(subLink.label);
                //   setShowSubmenu('');
                // }}
                className="font-bold text-xl hover:underline flex items-center"
              >
                <span
                  className={`small ${
                    currentPage === subLink.slug ? 'text-accent-500' : ''
                  }`}
                >
                  {subLink.label}
                </span>
              </Link>
            ));
          })}
        </div>
      </div>
    </div>
  );
}
