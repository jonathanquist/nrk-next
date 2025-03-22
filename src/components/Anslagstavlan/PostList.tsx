import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { useSite } from '@/contexts/SiteContext';

import MonthMarker from './MonthMarker';
import PostItem from './PostItem';
import Pagination from './Pagination';
import Loader from '../Loader/Loader';

import { usePosts } from '@/hooks/useFetch';

export default function PostList() {
  const { cats, currentCat, currentPagination } = useSite();

  const { data: posts, isLoading } = usePosts(currentCat, currentPagination);

  if (!cats || isLoading) return <Loader />;

  let currentMonth = '';

  return (
    <div className="flex justify-between lg:w-full lg:gap-12 gap-6 items-stretch flex-col">
      {/* Post list */}
      {posts?.map((post: any, index: any) => {
        const postMonth = format(new Date(post.date), 'MMMM yyyy');
        let monthMarker = null;

        if (postMonth !== currentMonth) {
          monthMarker = <MonthMarker date={post.date} />;
          currentMonth = postMonth;
        }

        return <PostItem key={index} post={post} monthMarker={monthMarker} />;
      })}

      {/* Pagination */}
      <Pagination />
    </div>
  );
}
