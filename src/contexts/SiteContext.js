import { createContext, useContext, useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';

const SiteContext = createContext();

export const SiteProvider = ({ children }) => {
  const params = useSearchParams();
  const [posts, setPosts] = useState();
  const [pages, setPages] = useState();
  const [events, setEvents] = useState();
  const [cats, setCats] = useState();
  const [currentCat, setCurrentCat] = useState(params.get('cat') || '');
  const [currentPageNumber, setCurrentPageNumber] = useState(1);

  const updatePosts = (posts) => {
    console.log('sc-posts', posts);
    setPosts(posts);
  };

  const updatePages = (pages) => {
    console.log('sc-pages', pages);
    setPages(pages);
  };

  const updateEvents = (events) => {
    console.log('sc-events', events);
    setEvents(events);
  };

  const updateCats = (cats) => {
    console.log('sc-cat', cats);
    setCats(cats);
  };

  const updateCurrentCat = (cat) => {
    console.log('sc-current-cat', cat);
    setCurrentCat(cat);
    setCurrentPageNumber(1);
  };

  const updatePageNumber = (pageNumber) => {
    setCurrentPageNumber(pageNumber);
  };

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
      currentCat,
      updateCurrentCat,
      currentPageNumber,
      updatePageNumber,
    }),
    [posts, pages, events, cats, currentCat, currentPageNumber]
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
