'use client';

import Link from 'next/link';
import { IconBack } from '..';

export function Breadcrumb({
  section,
  subsection,
  current,
}: {
  section: string;
  subsection?: {
    label: string;
    link: string;
  };
  current: string | null;
}) {
  return (
    <div className="hidden lg:flex gap-1 small font-bold px-8 mt-8 mb-9">
      {/*Home*/}
      <Link href="/">Hem</Link>

      {/*Section*/}
      <IconBack className="rotate-180 w-6 h-6 text-accent-500" />
      <span>{section}</span>

      {/*Subsection*/}
      {subsection && (
        <>
          <IconBack className="rotate-180 w-6 h-6 text-accent-500" />
          <Link
            href={{
              pathname: subsection.link,
              query: { slug: subsection.label },
            }}
          >
            {subsection.label}
          </Link>
        </>
      )}

      {/*Page*/}
      <IconBack className="rotate-180 w-6 h-6 text-accent-500" />
      <span className="font-light">{current}</span>
    </div>
  );
}
