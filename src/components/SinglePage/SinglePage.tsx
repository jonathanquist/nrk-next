import { ReactNode, useEffect } from 'react';
import Image from 'next/image';
import useFetch from '@/hooks/useFetch';
import StandardImg from '../../../public/images/hero_img.jpg';
import React from 'react';
import Header from '../Header';

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

  // console.log('page', page);

  return (
    <div className="card-base">
      <Header
        variant="page"
        title={page[0].title.rendered}
        image={page[0]._embedded['wp:featuredmedia'][0].source_url}
      />
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
