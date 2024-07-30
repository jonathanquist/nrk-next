'use client';

import { ReactNode } from 'react';
import React from 'react';
import Header from '../Header';

type SinglePageProps = {
  page: any;
  children?: ReactNode;
};

export default function SinglePage({ page, children }: SinglePageProps) {
  if (!page) {
    return (
      <div className="w-full bg-primary-300 rounded-xl h-16 animate-pulse card-px card-py" />
    );
  }

  // console.log('test', page);

  return (
    <div className="card-base min-h-full w-full ">
      <Header
        variant="page"
        title={page[0].title.rendered}
        image={page[0]._embedded['wp:featuredmedia'][0].source_url}
      />
      <div className="card-px card-py">
        <div
          dangerouslySetInnerHTML={{ __html: page[0].content.rendered }}
          className="paragraph-md lg:paragraph-lg wordpress-content"
        />

        {children && children}
      </div>
    </div>
  );
}
