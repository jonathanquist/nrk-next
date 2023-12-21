'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { links } from './links.const';
import { usePathname } from 'next/navigation';
import Modal from '../Modal';

interface Link {
  icon?: React.ReactNode;
  label: string;
  slug: string;
  subLinks?: Link[];
}

export default function MenuMobile() {
  const [currentPage, setCurrentPage] = useState('');
  const [showSubmenu, setShowSubmenu] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [modalPosition, setModalPosition] = useState('');

  const path = usePathname();

  useEffect(() => {
    const firstObject = links.shift();

    if (firstObject) {
      // Insert the first object at the desired index

      links.splice(1, 0, firstObject);
    }
  }, []);

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
      setModalPosition(
        label === 'Aktiviteter' ? 'bm' : label === 'Ridskolan' ? 'bl' : 'br'
      );
      setOpenModal(true);
    }
  };

  const handleLink = (page: string) => {
    setShowSubmenu('');
    setOpenModal(false);
  };

  return (
    <div className="relative w-full flex flex-col items-center justify-center">
      <ul className="flex items-center justify-between px-6 pt-5 pb-11 w-full gap-6">
        {links.map((link, index) => (
          <li key={index} className="w-full">
            <button
              onClick={() => handleClick(link.label)}
              className={`text-sm leading-none font-bold hover:underline flex flex-col items-center rounded-lg pb-2 w-full px-2 bg-primary-100 shadow-md ${
                link.subLinks.some((subLink) => subLink.slug === currentPage)
                  ? 'text-accent-500'
                  : ''
              } ${showSubmenu === link.label ? '' : ''}`}
            >
              {link.icon}
              <span className="small">{link.label}</span>
            </button>
          </li>
        ))}
      </ul>
      <div className="flex justify-center absolute inset-x-1/2 bottom-0">
        {/*Schema*/}
      </div>
      <Modal
        action={setOpenModal}
        state={openModal}
        size="sm"
        position={modalPosition}
      >
        <div className="px-3.5 py-5">
          <ul className="text-accent-500 flex flex-col gap-4">
            {links.map((link: Link, index: number) => {
              if (link.label !== showSubmenu) {
                return null;
              }

              return link.subLinks?.map((subLink: Link, index: number) => (
                <li key={index} className="py-0.5 flex items-center">
                  <div className="shrink-0 mx-3 w-1.5 h-1.5 rounded-full bg-accent-500" />
                  <Link
                    key={index}
                    href={{
                      pathname: `/${link.slug}/${subLink.slug}`,
                      query: { slug: subLink.label },
                    }}
                    onClick={() => handleLink(subLink.label)}
                    className="font-bold text-xl flex items-center"
                  >
                    <span
                      className={`small ${
                        currentPage === subLink.slug
                          ? 'text-accent-500'
                          : 'text-primary-900'
                      }`}
                    >
                      {subLink.label}
                    </span>
                  </Link>
                </li>
              ));
            })}
          </ul>
        </div>
      </Modal>
    </div>
  );
}
