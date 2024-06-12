import { useLayoutEffect, useRef } from 'react';
import Image from 'next/image';
import StandardImg from '../../../public/images/hero_img.jpg';
import Link from 'next/link';
import { useViewport } from '@/hooks/useViewport';
import { ButtonOld } from '../UI';
import { usePost } from '@/contexts/PostContext';

export default function Hero() {
  const { posts } = usePost();

  const containerRef = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    if (containerRef.current && containerRef.current.firstElementChild) {
      containerRef.current.firstElementChild.classList.add('text-primary-900');
    }
  });

  if (posts.length <= 0) {
    return (
      <div className="flex items-center justify-center bg-transparent rounded-xl m-4 h-48 md:h-[calc(100vh-8.5rem)]  md:pt-16 md:pb-20  w-full">
        <div className=" overflow-hidden w-full h-48 md:h-full rounded-t-2xl rounded-b-none md:rounded-2xl md:shadow-md animate-pulse" />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-48 md:h-[calc(100vh-8.5rem)] md:pt-16 md:pb-20 w-full">
      <div className="relative bg-transparent overflow-hidden flex justify-start items-end pb-10 md:py-24 md:px-16 w-full h-48 md:h-full rounded-t-2xl rounded-b-none md:rounded-2xl md:shadow-md">
        <div className="bg-primary-100 relative bg-opacity-75 px-6 md:px-10 justify-between items-center md:justify-start md:items-start py-3 md:pt-12 md:pb-8 z-10 w-full flex md:flex-col headline-s md:headline-l md:w-[550px] backdrop-blur-sm card h-14 md:h-60">
          {posts.length > 0 && (
            <>
              <h1
                dangerouslySetInnerHTML={{ __html: posts[0].title.rendered }}
                className="md:mb-5 truncate md:w-[450px]"
              />

              <p
                dangerouslySetInnerHTML={{
                  __html: posts[0].excerpt.rendered,
                }}
                ref={containerRef}
                className="hidden lg:block paragraph-m mb-5 w-full line-clamp-2 break-words"
              />

              <Link href={posts[0].link}>
                <ButtonOld className="" size="sm">
                  Läs mer
                </ButtonOld>
              </Link>
            </>
          )}
        </div>
        <Image
          src={
            posts[0]._embedded['wp:featuredmedia']
              ? posts[0]._embedded['wp:featuredmedia'][0].source_url
              : StandardImg
          }
          alt="logo"
          sizes="100%"
          fill
          priority
          className="z-0 object-center object-cover opacity-90"
        />
      </div>
    </div>
  );
}
