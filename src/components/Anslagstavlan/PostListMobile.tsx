import React, { useState, useEffect, useRef, useCallback } from "react";
import { format } from "date-fns";
import { useSite } from "@/contexts/SiteContext";
import PostItem from "./PostItem";
import MonthMarker from "./MonthMarker";
import Loader from "../Loader/Loader";
import { getPosts } from "@/lib/api";
import { usePosts } from "@/hooks/useFetch";

export default function PostListMobile() {
  const {
    currentCat,
    currentPagination,
    updateCurrentPagination,
    totalPagination,
  } = useSite();

  const [visiblePosts, setVisiblePosts] = useState<any[]>([]);
  const {
    data: posts = [],
    isLoading,
    isFetching,
  } = usePosts(currentCat, currentPagination);
  const observer = useRef<IntersectionObserver | null>(null);

  const fetchMorePosts = useCallback(() => {
    if (currentPagination < totalPagination) {
      updateCurrentPagination(currentPagination + 1);
    }
  }, [currentPagination, totalPagination, updateCurrentPagination]);

  const setLastPostRef = useCallback(
    (node: HTMLElement | null) => {
      if (isFetching) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && currentPagination < totalPagination) {
          fetchMorePosts();
        }
      });

      if (node) observer.current.observe(node);
    },
    [isFetching, currentPagination, totalPagination, fetchMorePosts]
  );

  useEffect(() => {
    setVisiblePosts([]); // Clear the visible posts
    updateCurrentPagination(1); // Reset pagination to the first page
    if (posts.length > 0) {
      setVisiblePosts(posts);
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentCat]);

  useEffect(() => {
    if (posts.length > 0) {
      setVisiblePosts((prevPosts) => [...prevPosts, ...posts]);
    }
  }, [posts]);

  if (isLoading && visiblePosts.length === 0) return <Loader />;

  let currentMonth = "";

  return (
    <div className="flex justify-between w-full lg:gap-12 gap-6 items-stretch flex-col pb-8">
      {/* Post list */}
      {visiblePosts.map((post: any, index: any) => {
        const postMonth = format(new Date(post.date), "MMMM yyyy"); // Fetch the month of the post
        let monthMarker = null;

        // Display month marker if the month changes
        if (postMonth !== currentMonth) {
          monthMarker = <MonthMarker date={post.date} />;
          currentMonth = postMonth;
        }

        // Attach ref to the last post element
        const isLastPost = index === visiblePosts.length - 1;

        return (
          <div key={index} ref={isLastPost ? setLastPostRef : null}>
            <PostItem post={post} monthMarker={monthMarker} />
          </div>
        );
      })}
      {isFetching && <Loader />}
    </div>
  );
}
