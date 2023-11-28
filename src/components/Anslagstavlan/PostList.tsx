import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import StandardImg from '../../../public/images/hero_img.jpg';
import useFetch from '@/hooks/useFetch';
import { IconBack } from '../../../public/images/IconBack';
import { IconNext } from '../../../public/images/IconNext';
import { format } from 'date-fns';
import Link from 'next/link';
import { usePost } from '@/hooks/PostContext';

export default function PostList() {
  const [pageNumber, setPageNumber] = useState(1);
  const { currentPage, updatePage, currentTag } = usePost();
  const postsPerPage = 2; // Set the number of posts per page
  const maxPagesToShow = 5; // Maximum number of page buttons to show

  const fetchedPosts =
    currentTag !== ''
      ? useFetch(
          `http://localhost/nrk/wp-json/wp/v2/posts?_embed&tags=${currentTag}`
        )
      : useFetch(`http://localhost/nrk/wp-json/wp/v2/posts?_embed`);

  const postTags: any = useFetch('http://localhost/nrk/wp-json/wp/v2/tags/');

  // <  useEffect(() => {
  //     //setPageNumber(1);
  //     updatePage(1);
  //     console.log(currentTag);
  //   }, [currentTag]);>

  console.log(currentPage);

  if (!fetchedPosts || !postTags) {
    return <div>Loading...</div>;
  }

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const posts = (fetchedPosts as any[])?.slice(
    indexOfFirstPost,
    indexOfLastPost
  );

  const totalPosts = (fetchedPosts as any[])?.length;
  const totalPages = Math.ceil(totalPosts / postsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      //setPageNumber(pageNumber + 1);
      updatePage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      //setPageNumber(pageNumber - 1);
      updatePage(currentPage - 1);
    }
  };

  const getTags = (tagArr: any) => {
    const tagNames = tagArr.map((tagId: any) => {
      const tagObject = postTags.find(
        (currentTag: { id: string }) => currentTag.id === tagId
      );
      return tagObject
        ? tagObject.name === 'tavling'
          ? 'tävling'
          : tagObject.name === 'daglig'
          ? 'Daglig Verksamhet'
          : tagObject.name
        : null;
    });

    // Filter out null values (tags that were not found)
    const filteredTagNames = tagNames.filter(
      (tagName: string) => tagName !== null
    );

    // Join tag names with commas
    return filteredTagNames.join(', ');
  };

  const paginationItems = [];
  let startPage = 1;
  let endPage = totalPages;

  if (totalPages > maxPagesToShow) {
    const maxPagesBeforeCurrent = Math.floor(maxPagesToShow / 2);
    const maxPagesAfterCurrent = Math.ceil(maxPagesToShow / 2) - 1;

    if (currentPage <= maxPagesBeforeCurrent) {
      endPage = maxPagesToShow;
    } else if (currentPage + maxPagesAfterCurrent >= totalPages) {
      startPage = totalPages - maxPagesToShow + 1;
    } else {
      startPage = currentPage - maxPagesBeforeCurrent;
      endPage = currentPage + maxPagesAfterCurrent;
    }
  }

  for (let i = startPage; i <= endPage; i++) {
    paginationItems.push(
      <button key={i} onClick={() => updatePage(i)}>
        <li
          className={`${
            currentPage === i && 'bg-accent-500 rounded-lg text-primary-100'
          } px-3 py-1`}
        >
          {i}
        </li>
      </button>
    );
  }

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
    <div className="flex justify-between w-full gap-12 items-stretch flex-col">
      {/* Post list */}
      {posts?.map((post: any, index: any) => {
        const postMonth = getMonthMarker(post.date); // Fetch the month of the post
        let monthMarker = null;

        // Display month marker if the month changes
        if (postMonth !== currentMonth) {
          monthMarker = (
            <div className="flex items-center justify-start w-full mb-20 group-first:mt-0 mt-12">
              <div className="h-1 w-32 bg-primary-500 rounded-full mt-1 shrink-0" />
              <div className="text-accent-500 text-2xl small font-cambria capitalize w-56 flex justify-center shrink-0">
                <div>{postMonth}</div>
              </div>
              <div className="h-1 bg-primary-500 rounded-full w-full" />
            </div>
          );
          currentMonth = postMonth;
        }

        return (
          <Link href={`/posts/${post.slug}`} key={index} className="group ">
            {monthMarker}
            <div className="px-10">
              <div className="w-full overflow-hidden bg-primary-300 p-0 card card-base h-[270px] flex">
                <div className="relative h-full w-72 shrink-0">
                  <Image
                    src={
                      post._embedded['wp:featuredmedia']
                        ? post._embedded['wp:featuredmedia'][0].source_url
                        : StandardImg
                    }
                    alt="featured"
                    sizes="100%"
                    fill
                    className="object-center object-cover"
                  />
                </div>
                <div className="text-sm font-medium grow flex flex-col md:headline-m py-10 pl-10 pr-16 gap-3.5">
                  <h2
                    dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                  />
                  <p
                    dangerouslySetInnerHTML={{
                      __html: post.excerpt.rendered,
                    }}
                    className="line-clamp-3 break-words paragraph-l grow"
                  />
                  <div className="flex text-xl text-primary-500 justify-start items-center">
                    <div className="italic font-medium">
                      {format(new Date(post.date), 'dd MMMM, yyyy')}
                    </div>
                    <div className="font-light ml-5 capitalize">
                      {getTags(post.tags)}
                    </div>
                    <button className="small text-primary-900 ml-auto">
                      Läs Mer
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        );
      })}

      {/* Pagination */}
      <div className="flex justify-center items-center w-full">
        <div className="flex justify-between items-center w-96 font-medium">
          {currentPage !== 1 ? (
            <button onClick={handlePrevPage}>
              <IconBack className="w-12 h-12 text-accent-500" />
            </button>
          ) : (
            <IconBack className="w-12 h-12 text-primary-300" />
            // <div className="w-12 h-12 shrink-0" />
          )}
          <ul className="flex gap-4">{paginationItems}</ul>
          {currentPage !== totalPages ? (
            <button onClick={handleNextPage}>
              <IconNext className="w-12 h-12 text-accent-500" />
            </button>
          ) : (
            <IconNext className="w-12 h-12 text-primary-300" />
          )}
        </div>
      </div>
    </div>
  );
}
