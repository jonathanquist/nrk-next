import Link from 'next/link';
import Image from 'next/image';
import useFetch from '../../hooks/useFetch';
import React, { useState, useEffect } from 'react';
import StandardImg from '../../../public/images/hero_img.jpg';
import { format } from 'date-fns';
import Button from '../Button';
import { IconArrowDouble } from '../../../public/images/IconArrowDouble';

export default function Posts() {
  const [postLimit, setPostLimit] = useState(4);
  const posts: any = useFetch(
    'http://localhost/nrk/wp-json/wp/v2/posts?_embed'
  );

  if (!posts) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col w-full gap-20 py-20 items-center">
      <div className="flex justify-between w-full gap-10 items-stretch">
        {posts?.map((post: any, index: any) => {
          if (index !== 0 && index <= postLimit) {
            // console.log('hi', post);
            return (
              <div
                key={index}
                className="w-full overflow-hidden bg-primary-100 p-0 card card-base flex flex-col"
              >
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
                    className=" object-center object-cover"
                  />
                </div>
                <div className="text-sm font-medium pt-4 pb-8 px-6 flex flex-col grow md:headline-s">
                  <h2
                    dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                  />
                  <p
                    dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                    className="line-clamp-3 paragraph-s"
                  />
                  <p className="italic text-primary-500 font-medium pt-1 pb-4">
                    {format(new Date(post.date), 'dd MMMM, yyyy')}
                  </p>
                  {/* <Link href={`/post/${post.slug}`}> */}
                  <Link
                    //href={post.link}
                    href={`/posts/${post.slug}`}
                    className="mt-auto"
                  >
                    <Button className="" size="sm">
                      Läs mer
                    </Button>
                  </Link>
                </div>
              </div>
            );
          }
        })}
      </div>
      <Link href="/aktiviteter/anslagstavlan">
        <Button
          className=""
          size={'lg'}
          icon={<IconArrowDouble className="rotate-90 h-9 w-9" />}
        >
          Mer finns på anslagstavlan
        </Button>
      </Link>
    </div>
  );
}
