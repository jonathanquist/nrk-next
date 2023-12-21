import React, { useState, useEffect, useRef } from 'react';
import { format } from 'date-fns';
import { usePost } from '@/hooks/PostContext';
import useFetch from '@/hooks/useFetch';

import Image from 'next/image';
import Link from 'next/link';
import StandardImg from '../../../public/images/hero_img.jpg';

export default function PostListMobile() {
  const { currentPage, updatePage, currentCat } = usePost();
  const [visiblePosts, setVisiblePosts] = useState(4); // Number of initially visible posts
  const observer = useRef<IntersectionObserver | null>(null);

  const fetchedPosts: any =
    currentCat !== ''
      ? useFetch(
          `http://localhost/nrk/wp-json/wp/v2/posts?_embed&categories=${currentCat}`
        )
      : useFetch(`http://localhost/nrk/wp-json/wp/v2/posts?_embed`);

  const postCats: any = useFetch(
    'http://localhost/nrk/wp-json/wp/v2/categories/'
  );

  const loadMorePosts = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Increase the number of visible posts when user reaches the end
        setVisiblePosts((prevVisiblePosts) => prevVisiblePosts + 4);
      }
    });
  };

  useEffect(() => {
    observer.current = new IntersectionObserver(loadMorePosts, {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    });

    if (observer.current && fetchedPosts) {
      const lastPostRef = document.getElementById(`post-${visiblePosts - 1}`);
      if (lastPostRef) {
        observer.current.observe(lastPostRef);
      }
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [visiblePosts, fetchedPosts]);

  // console.log(currentPage);

  if (!fetchedPosts || !postCats) {
    return <div>Loading...</div>;
  }

  const getCats = (catArr: any) => {
    const catNames = catArr.map((catId: any) => {
      const catObject = postCats.find(
        (currentCat: { id: string }) => currentCat.id === catId
      );
      return catObject
        ? catObject.name === 'tavling'
          ? 'tävling'
          : catObject.name === 'daglig'
          ? 'Daglig Verksamhet'
          : catObject.name
        : null;
    });

    // Filter out null values (cats that were not found)
    const filteredCatNames = catNames.filter(
      (catName: string) => catName !== null
    );

    // Join cat names with commas
    return filteredCatNames.join(', ');
  };

  // Function to get month marker
  const getMonthMarker = (postDate: string) => {
    const date = new Date(postDate);
    const monthYear = new Intl.DateTimeFormat('default', {
      year: 'numeric',
      month: 'long',
    }).format(date);
    return monthYear;
  };

  let currentMonth = '';

  return (
    <div className="flex justify-between md:w-full md:gap-12 gap-6 items-stretch flex-col pb-8">
      {/* Post list */}
      {fetchedPosts?.slice(0, visiblePosts).map((post: any, index: any) => {
        const postMonth = getMonthMarker(post.date); // Fetch the month of the post
        let monthMarker = null;

        // Display month marker if the month changes
        if (postMonth !== currentMonth) {
          monthMarker = (
            <div className="flex items-center justify-start md:w-full mb-6 md:mb-20 group-first:mt-0 md:mt-12 mt-2 md:px-0">
              <div className="h-1 w-8 md:w-32 bg-primary-500 rounded-full mt-1 shrink-0" />
              <div className="text-accent-500 text-2xl small font-cambria capitalize w-56 flex justify-center shrink-0">
                <div>{postMonth}</div>
              </div>
              <div className="h-1 bg-primary-500 rounded-full w-full" />
            </div>
          );
          currentMonth = postMonth;
        }

        return (
          <Link href={`/posts/${post.slug}`} className="group" key={index}>
            {monthMarker}
            <div className="md:px-10" id={`post-${index}`}>
              <div className="w-full overflow-hidden bg-primary-300 p-0 card card-base md:h-[270px] flex">
                <div className="relative h-36  md:h-full w-24 md:w-72 shrink-0">
                  <Image
                    src={
                      post._embedded['wp:featuredmedia']
                        ? post._embedded['wp:featuredmedia'][0].source_url
                        : StandardImg
                    }
                    alt="featured"
                    sizes="100%"
                    fill
                    className="object-center object-cover "
                  />
                </div>
                <div className="text-sm font-medium grow flex flex-col justify-between md:headline-m py-2.5 pl-4 pr-3.5 h-36">
                  <h2
                    dangerouslySetInnerHTML={{
                      __html: post.title.rendered,
                    }}
                    className="truncate w-56"
                  />
                  <p
                    dangerouslySetInnerHTML={{
                      __html: post.excerpt.rendered,
                    }}
                    className="line-clamp-3 break-words paragraph-l text-sm h-14 w-56"
                  />
                  <div className="flex text-sm text-primary-500 justify-start items-center">
                    <div className="italic font-medium">
                      {format(new Date(post.date), 'dd MMMM, yyyy')}
                    </div>
                    {/* <div className="font-light ml-5 capitalize">
                      {getCats(post.categories)}
                    </div> */}
                    <button className="small text-base text-primary-900 ml-auto">
                      Läs Mer
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
