'use client';

import { ReactNode } from 'react';
import React from 'react';
import Header from '../Header';
import HeaderMobile from '../HeaderMobile';
import Loader from '../Loader/Loader';

type SinglePageProps = {
  page: any;
  isLoading?: boolean;
  children?: ReactNode;
};

export default function SinglePage({
  page,
  isLoading,
  children,
}: SinglePageProps) {
  if (isLoading) return <Loader />;
  if (!page)
    return <div className="card-base min-h-full w-full ">Sidan finns inte</div>;

  return (
    <div className="h-full w-full card-base overflow-y-auto custom-scroll">
      <div className="hidden lg:block">
        <Header
          variant="page"
          title={page.title.rendered}
          image={page._embedded['wp:featuredmedia'][0].source_url}
          onMobile={true}
        />
      </div>
      <div className="block lg:hidden">
        <HeaderMobile
          variant="page"
          title={page.title.rendered}
          image={page._embedded['wp:featuredmedia'][0].source_url}
        />
      </div>
      <div className="card-px card-py h-full space-y-16">
        <div
          dangerouslySetInnerHTML={{ __html: page.content.rendered }}
          className="paragraph-md lg:paragraph-lg wordpress-content"
        />

        {children && children}
      </div>
    </div>
  );
}
