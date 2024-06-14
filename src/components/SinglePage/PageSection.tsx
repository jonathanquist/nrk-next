'use client';

import { ReactNode } from 'react';
import React from 'react';
import Header from '../Header';

type PageSectionProps = {
  page: any;
};

export default function PageSection({ page }: PageSectionProps) {
  if (!page) {
    return (
      <div className="w-full bg-primary-300 rounded-xl h-16 animate-pulse card-px card-py" />
    );
  }

  return (
    <div
      dangerouslySetInnerHTML={{ __html: page.content.rendered }}
      className="paragraph-l wordpress-content"
    />
  );
}
