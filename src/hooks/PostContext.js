import { createContext, useContext, useState } from 'react';
import { useSearchParams } from 'next/navigation';

const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const params = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [currentCat, setCurrentCat] = useState(params.get('cat') || '');

  const updatePage = (page) => {
    setCurrentPage(page);
  };
  const updateCat = (cat) => {
    setCurrentCat(cat);
    setCurrentPage(1);
  };

  return (
    <PostContext.Provider
      value={{ currentPage, updatePage, currentCat, updateCat }}
    >
      {children}
    </PostContext.Provider>
  );
};

export const usePost = () => {
  return useContext(PostContext);
};
