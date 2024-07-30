import { useLayoutEffect, useRef } from 'react';
import Image from 'next/image';
import StandardImg from '../../../public/images/hero_img.jpg';
import Link from 'next/link';
import { ButtonOld } from '../UI';
import { useSite } from '@/contexts/SiteContext';

export default function Hero() {
  const { posts } = useSite();

  const containerRef = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    if (containerRef.current && containerRef.current.firstElementChild) {
      containerRef.current.firstElementChild.classList.add('text-primary-900');
    }
  });

  if (!posts) {
    return <div>Loading...</div>;
  }

  if (posts.length <= 0) {
    return (
      <div className="flex items-center justify-center bg-transparent rounded-xl m-4 h-48 lg:h-[calc(100vh-8.5rem)]  lg:pt-16 lg:pb-20  w-full">
        <div className=" overflow-hidden w-full h-48 lg:h-full rounded-t-2xl rounded-b-none lg:rounded-2xl lg:shadow-md animate-pulse" />
      </div>
    );
  }

  console.log('hero', posts[0]);

  return (
    <div className="flex items-center justify-center h-48 lg:h-[calc(100vh-8.5rem)] lg:pt-16 lg:pb-20 w-full">
      <div className="relative bg-transparent overflow-hidden flex justify-start items-end pb-10 lg:py-24 lg:px-16 w-full h-48 lg:h-full rounded-t-2xl rounded-b-none lg:rounded-2xl lg:shadow-md">
        <div className="bg-primary-100 relative bg-opacity-75 px-6 lg:px-10 justify-between items-center lg:justify-between lg:items-start py-3 lg:pt-12 lg:pb-8 z-10 w-full flex lg:flex-col headline-s lg:headline-l lg:w-[650px] backdrop-blur-sm card h-14 lg:h-60">
          {posts.length > 0 && (
            <>
              <h1
                dangerouslySetInnerHTML={{ __html: posts[0].title.rendered }}
                className="truncate lg:w-[550px] lg:h-12"
              />

              <p
                dangerouslySetInnerHTML={{
                  __html: posts[0].excerpt.rendered,
                }}
                ref={containerRef}
                className="hidden lg:block paragraph-md w-full h-12 line-clamp-2 break-words"
              />

              <Link href={`/posts/${posts[0].slug}`}>
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
