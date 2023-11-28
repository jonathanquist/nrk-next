import useFetch from '@/hooks/useFetch';
import Link from 'next/link';
import React from 'react';
import Button from '../Button';
import { IconArrowDouble } from '../../../public/images/IconArrowDouble';

export default function Welcome() {
  const page: any = useFetch(
    'http://localhost/nrk/wp-json/wp/v2/pages/?slug=allmant'
  );

  if (!page) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full flex justify-between gap-10 items-stretch">
      <div className="card-base card-px w-full flex flex-col gap-8 pt-16 pb-9 h-full md:desktop">
        <h1
          dangerouslySetInnerHTML={{ __html: page[0].title.rendered }}
          className="small"
        />
        <div
          dangerouslySetInnerHTML={{ __html: page[0].content.rendered }}
          className="mb-5 paragraph-l"
        />
        <Link href="/posts">
          <Button
            className=""
            size={'md'}
            icon={<IconArrowDouble className="rotate-90 h-5 w-5" />}
          >
            Kontakta Oss
          </Button>
        </Link>
      </div>
      <div className="card-base w-96 flex flex-col items-center justify-center">
        <div className="h-full w-full flex justify-center items-end pb-9 ">
          <Link href="/posts">
            <Button
              className=""
              size={'md'}
              icon={<IconArrowDouble className="rotate-90 h-5 w-5" />}
            >
              Se hela kalendern
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
