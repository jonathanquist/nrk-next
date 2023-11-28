import { createContext, useContext, useState } from 'react';

const MenuContext = createContext();

export const MenuProvider = ({ children }) => {
  const [currentPage, setCurrentPage] = useState(null);

  const updatePage = (page) => {
    setCurrentPage(page);
  };

  return (
    <MenuContext.Provider value={{ currentPage, updatePage }}>
      {children}
    </MenuContext.Provider>
  );
};

export const useMenu = () => {
  return useContext(MenuContext);
};
