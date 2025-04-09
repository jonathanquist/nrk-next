import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import StandardImg from '../../../public/images/standard_image.jpg';
import { format } from 'date-fns';

import { Button, IconArrowDouble } from '../UI';
import Loader from '../Loader/Loader';
import { cleanAndTruncateText } from '@/lib/utils';
import { sv } from 'date-fns/locale';

interface HeroProps {
  posts: any[];
  isLoading: boolean;
}

const POST_LIMIT = 4;

export default function Posts({ posts, isLoading }: HeroProps) {
  if (isLoading) return <Loader />;

  return (
    <div className="flex flex-col w-full gap-20 py-20 items-center">
      <div className="flex justify-between w-full gap-10 items-stretch">
        {posts?.map((post: any, index: any) => {
          const title = post.title.rendered;
          const previewText = cleanAndTruncateText(post.excerpt.rendered);

          if (index !== 0 && index <= POST_LIMIT) {
            return (
              <Link
                key={index}
                href={`/posts/${post.slug}`}
                className="group w-full flex"
              >
                <div className=" overflow-hidden bg-primary-100 p-0 card card-base flex flex-col rise-animation">
                  <div className="relative h-40 w-full">
                    <Image
                      src={
                        post._embedded['wp:featuredmedia']
                          ? post._embedded['wp:featuredmedia'][0].source_url
                          : StandardImg
                      }
                      alt="featured"
                      sizes="100%"
                      fill
                      className=" object-center object-cover "
                    />
                  </div>
                  <div className="text-sm font-medium pt-4 pb-8 px-6 flex flex-col grow lg:headline-s">
                    <h2>{title}</h2>
                    <p className="line-clamp-3 paragraph-sm">{previewText}</p>
                    <div className="flex justify-center items-center pt-1 mt-auto">
                      <div className="italic text-primary-500 font-medium  ">
                        {format(new Date(post.date), 'dd MMMM, yyyy', {
                          locale: sv,
                        })}
                      </div>
                      <div className="small text-primary-900 ml-auto">
                        Läs mer
                      </div>
                    </div>
                    {/* <Button size="sm"> Läs mer</Button> */}
                  </div>
                </div>
              </Link>
            );
          }
        })}
      </div>
      <Link href="/aktiviteter/anslagstavlan">
        <Button
          size={'lg'}
          Icon={IconArrowDouble}
          iconClassName="rotate-90 h-9 w-9"
        >
          Mer finns på anslagstavlan
        </Button>
      </Link>
    </div>
  );
}
