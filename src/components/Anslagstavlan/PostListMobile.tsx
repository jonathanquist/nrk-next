import React, { useState, useEffect, useRef, useCallback } from 'react';
import { format } from 'date-fns';
import { useSite } from '@/contexts/SiteContext';
import PostItem from './PostItem';
import MonthMarker from './MonthMarker';

interface PostListMobileProps {
  filteredPosts: any;
}

export default function PostListMobile({ filteredPosts }: PostListMobileProps) {
  const { cats } = useSite();
  const observer = useRef<IntersectionObserver | null>(null);
  const [visiblePosts, setVisiblePosts] = useState(4); // Number of initially visible posts
  const lastPostRef = useRef<HTMLDivElement | null>(null);

  const loadMorePosts = useCallback((entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        console.log('Entry is intersecting:', entry);
        // Increase the number of visible posts when user reaches the end
        setVisiblePosts((prevVisiblePosts) => prevVisiblePosts + 4);
      }
    });
  }, []);

  const setLastPostRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (observer.current) {
        observer.current.disconnect();
      }

      if (node) {
        observer.current = new IntersectionObserver(loadMorePosts, {
          root: null,
          rootMargin: '0px',
          threshold: 0.5,
        });
        observer.current.observe(node);
      }

      lastPostRef.current = node;
    },
    [loadMorePosts]
  );

  useEffect(() => {
    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, []);

  if (!filteredPosts || !cats) {
    return <div>Loading...</div>;
  }

  let currentMonth = '';

  return (
    <div className="flex justify-between w-full lg:gap-12 gap-6 items-stretch flex-col pb-8">
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

          // Attach ref to the last post element
          const isLastPost = index === visiblePosts - 1;

          return (
            <div key={index} ref={isLastPost ? setLastPostRef : null}>
              <PostItem post={post} monthMarker={monthMarker} />
            </div>
          );
        })}
    </div>
  );
}
