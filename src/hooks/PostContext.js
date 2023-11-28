import { createContext, useContext, useState } from 'react';

const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const [currentPage, setCurrentPage] = useState(null);
  const [currentTag, setCurrentTag] = useState(null);

  const updatePage = (page) => {
    setCurrentPage(page);
  };
  const updateTag = (tag) => {
    setCurrentTag(tag);
  };

  return (
    <PostContext.Provider value={{ currentPage, updatePage }}>
      {children}
    </PostContext.Provider>
  );
};

export const usePost = () => {
  return useContext(PostContext);
};
