'use client';

import { createContext, useContext, useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
// import { getCats, getPagination, getPosts } from '../lib/api';
// import { API } from '@/lib/const';
import { useCats, useEvents } from '@/hooks/useFetch';

const SiteContext = createContext();

export const SiteProvider = ({ children }) => {
  const params = useSearchParams();
  const [posts, setPosts] = useState();
  const [pages, setPages] = useState();
  // const [events, setEvents] = useState();
  // const [cats, setCats] = useState();
  const [currentCat, setCurrentCat] = useState(params.get('cat') || '');
  const [totalPagination, setTotalPagination] = useState();
  const [currentPagination, setCurrentPagination] = useState(1);

  const updatePosts = (posts) => {
    console.log('trig posts');
    // setPosts(posts);
  };

  const updatePages = (pages) => {
    setPages(pages);
  };

  const updateEvents = (events) => {
    console.log('trig events');
    // setEvents(events);
  };

  const updateCats = (cats) => {
    console.log('trig cats');
  };

  const updatePagination = (pagination) => {
    setTotalPagination(pagination);
  };

  const updateCurrentCat = (cat) => {
    setCurrentCat(cat);
    setCurrentPagination(1);
  };

  const updateCurrentPagination = (pagination) => {
    setCurrentPagination(pagination);
  };

  // useEffect(() => {
  //   const setPagination = async () => {
  //     const pagination = await getPagination(10, currentCat);
  //     // console.log(pagination);
  //     updatePagination(pagination);
  //   };
  //   setPagination();
  // }, [currentCat]);

  const { data: cats } = useCats();
  const { data: events } = useEvents();

  const providerValue = useMemo(
    () => ({
      posts,
      updatePosts,
      pages,
      updatePages,
      events,
      updateEvents,
      cats,
      updateCats,
      totalPagination,
      updatePagination,
      currentCat,
      updateCurrentCat,
      currentPagination,
      updateCurrentPagination,
    }),
    [posts, pages, events, cats, currentCat, totalPagination, currentPagination]
  );

  return (
    <SiteContext.Provider value={providerValue}>
      {children}
    </SiteContext.Provider>
  );
};

export const useSite = () => {
  return useContext(SiteContext);
};
