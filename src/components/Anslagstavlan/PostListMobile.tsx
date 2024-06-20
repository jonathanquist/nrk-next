import React, { useState, useEffect, useRef } from 'react';
import { format } from 'date-fns';
import { useSite } from '@/contexts/SiteContext';
import PostItem from './PostItem';
import MonthMarker from './MonthMarker';

interface PostListMobileProps {
  filteredPosts: any;
}

export default function PostListMobile({ filteredPosts }: PostListMobileProps) {
  const { cats } = useSite();
  const [visiblePosts, setVisiblePosts] = useState(4); // Number of initially visible posts
  const observer = useRef<IntersectionObserver | null>(null);

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

    if (observer.current && filteredPosts) {
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
  }, [visiblePosts, filteredPosts]);

  // console.log(currentPageNumber);

  if (!filteredPosts || !cats) {
    return <div>Loading...</div>;
  }

  let currentMonth = '';

  return (
    <div className="flex justify-between w-full md:gap-12 gap-6 items-stretch flex-col pb-8">
      {/* Post list */}
      {(filteredPosts as any[])
        ?.slice(0, visiblePosts)
        .map((post: any, index: any) => {
          const postMonth = format(new Date(post.date), 'MMMM yyyy'); // Fetch the month of the post
          let monthMarker = null;

          // Display month marker if the month changes
          if (postMonth !== currentMonth) {
            monthMarker = <MonthMarker date={post.date} />;

            currentMonth = postMonth;
          }

          return <PostItem key={index} post={post} monthMarker={monthMarker} />;
        })}
    </div>
  );
}
