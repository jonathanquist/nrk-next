import { createContext, useContext, useState } from 'react';
import { useSearchParams } from 'next/navigation';

const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const params = useSearchParams();
  const [posts, setPosts] = useState([]);
  const [pages, setPages] = useState();
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [currentCat, setCurrentCat] = useState(params.get('cat') || '');

  const updatePosts = (posts) => {
    setPosts(posts);
  };

  const updatePages = (pages) => {
    setPages(pages);
  };

  const updatePageNumber = (pageNumber) => {
    setCurrentPageNumber(pageNumber);
  };

  const updateCat = (cat) => {
    setCurrentCat(cat);
    setCurrentPageNumber(1);
  };

  return (
    <PostContext.Provider
      value={{
        posts,
        updatePosts,
        pages,
        updatePages,
        currentPageNumber,
        updatePageNumber,
        currentCat,
        updateCat,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

export const usePost = () => {
  return useContext(PostContext);
};
