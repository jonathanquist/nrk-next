import { ReactNode, useEffect } from 'react';
import Image from 'next/image';
import useFetch from '@/hooks/useFetch';
import StandardImg from '../../../public/images/hero_img.jpg';
import React from 'react';

export default function SinglePage({
  children,
  slug,
}: {
  children?: ReactNode;
  slug?: string;
}) {
  const page: any = useFetch(
    `http://localhost/nrk/wp-json/wp/v2/pages/?slug=${slug}&_embed`
  );

  if (!page) {
    return (
      <div className="w-full bg-primary-300 rounded-xl h-16 animate-pulse card-px card-py" />
    );
  }

  console.log('page', page);

  return (
    <div className="">
      <div className="bg-accent-500 flex flex-col items-center justify-center overflow-x-hidden shadow-md md:shadow-none">
        <div className="hidden md:flex justify-center items-end relative w-full h-[400px]">
          <div className="bg-primary-100 bg-opacity-75 w-full max-w-xl py-6 relative z-10 mb-32 backdrop-blur-sm flex item-center justify-center">
            <h1 dangerouslySetInnerHTML={{ __html: page[0].title.rendered }} />
          </div>
          <Image
            src={
              page[0]._embedded['wp:featuredmedia']
                ? page[0]._embedded['wp:featuredmedia'][0].source_url
                : StandardImg
            }
            alt="logo"
            sizes="100%"
            fill
            className="z-0 object-center object-cover"
          />
        </div>
      </div>
      <div className="card-px card-py">
        {slug && (
          <div
            dangerouslySetInnerHTML={{ __html: page[0].content.rendered }}
            className="paragraph-l wordpress-content"
          />
        )}

        {children && children}
      </div>
    </div>
  );
}
