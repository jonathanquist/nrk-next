import Image from 'next/image';
import HeroImg from '../../../public/images/hero_img.jpg';
import useFetch from '@/hooks/useFetch';
import Link from 'next/link';
import Button from '../Button';
import { useEffect, useLayoutEffect, useRef } from 'react';

export default function Hero() {
  const posts: any = useFetch('http://localhost/nrk/wp-json/wp/v2/posts') || [];

  const containerRef = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    if (containerRef.current && containerRef.current.firstElementChild) {
      containerRef.current.firstElementChild.classList.add('text-primary-900');
    }
  });

  // console.log(posts);
  return (
    <div className="flex items-center justify-center h-[calc(100vh-8.5rem)] pt-16 pb-20">
      <div className="relative bg-transparent overflow-hidden flex justify-start items-end py-24 px-16 w-full h-full card-base">
        <div className="bg-primary-100 relative bg-opacity-75 px-10 pt-12 pb-8 z-10 w-[550px] backdrop-blur-sm card h-60">
          {posts.length > 0 && (
            <>
              <h1
                dangerouslySetInnerHTML={{ __html: posts[0].title.rendered }}
              />
              <p
                dangerouslySetInnerHTML={{ __html: posts[0].excerpt.rendered }}
                ref={containerRef}
                className="åaragraph-m mb-5 w-full line-clamp-2 break-words"
              />
              <Link href={posts[0].link}>
                <Button className="" size="sm">
                  Läs mer
                </Button>
              </Link>
            </>
          )}
        </div>
        <Image
          src={HeroImg}
          alt="logo"
          sizes="100%"
          fill
          className="z-0 object-center object-cover"
        />
      </div>
    </div>
  );
}
