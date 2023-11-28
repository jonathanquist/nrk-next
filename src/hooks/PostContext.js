import { createContext, useContext, useState } from 'react';
import { useSearchParams } from 'next/navigation';

const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const params = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [currentTag, setCurrentTag] = useState(params.get('tag') || '');

  const updatePage = (page) => {
    setCurrentPage(page);
  };
  const updateTag = (tag) => {
    setCurrentTag(tag);
    setCurrentPage(1);
  };

  return (
    <PostContext.Provider
      value={{ currentPage, updatePage, currentTag, updateTag }}
    >
      {children}
    </PostContext.Provider>
  );
};

export const usePost = () => {
  return useContext(PostContext);
};
