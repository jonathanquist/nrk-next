import { createContext, useContext, useState } from 'react';
import { useSearchParams } from 'next/navigation';

const SiteContext = createContext();

export const SiteProvider = ({ children }) => {
  const params = useSearchParams();
  const [posts, setPosts] = useState();
  const [pages, setPages] = useState();
  const [events, setEvents] = useState();
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [currentCat, setCurrentCat] = useState(params.get('cat') || '');

  const updatePosts = (posts) => {
    setPosts(posts);
  };

  const updatePages = (pages) => {
    setPages(pages);
  };

  const updateEvents = (events) => {
    setEvents(events);
  };

  const updatePageNumber = (pageNumber) => {
    setCurrentPageNumber(pageNumber);
  };

  const updateCat = (cat) => {
    setCurrentCat(cat);
    setCurrentPageNumber(1);
  };

  return (
    <SiteContext.Provider
      value={{
        posts,
        updatePosts,
        pages,
        updatePages,
        events,
        updateEvents,
        currentPageNumber,
        updatePageNumber,
        currentCat,
        updateCat,
      }}
    >
      {children}
    </SiteContext.Provider>
  );
};

export const useSite = () => {
  return useContext(SiteContext);
};
