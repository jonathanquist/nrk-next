import React from 'react';
import { format } from 'date-fns';
import { useSite } from '@/contexts/SiteContext';

import MonthMarker from './MonthMarker';
import PostItem from './PostItem';
import Pagination from './Pagination';

interface PostListProps {
  filteredPosts: any;
}

export default function PostList({ filteredPosts }: PostListProps) {
  const { cats, currentPageNumber } = useSite();

  const postsPerPage = 3; // Set the number of posts per page

  if (!filteredPosts || !cats) {
    return <div>Loading...</div>;
  }

  const indexOfLastPost = currentPageNumber * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = (filteredPosts as any[])?.slice(
    indexOfFirstPost,
    indexOfLastPost
  );

  const totalPosts = (filteredPosts as any[])?.length;
  const totalPages = Math.ceil(totalPosts / postsPerPage);

  let currentMonth = '';

  return (
    <div className="flex justify-between md:w-full md:gap-12 gap-6 items-stretch flex-col">
      {/* Post list */}
      {currentPosts?.map((post: any, index: any) => {
        const postMonth = format(new Date(post.date), 'MMMM yyyy');
        let monthMarker = null;

        if (postMonth !== currentMonth) {
          monthMarker = <MonthMarker date={post.date} />;
          currentMonth = postMonth;
        }

        return <PostItem key={index} post={post} monthMarker={monthMarker} />;
      })}

      {/* Pagination */}
      <Pagination totalPages={totalPages} />
    </div>
  );
}
