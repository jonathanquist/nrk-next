'use client';

import { createContext, useContext, useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useCats, useEvents, usePagination } from '@/hooks/useFetch';

const SiteContext = createContext();

export const SiteProvider = ({ children }) => {
  const params = useSearchParams();
  const [events, setEvents] = useState();
  const [currentCat, setCurrentCat] = useState(params.get('cat') || '');
  const [totalPagination, setTotalPagination] = useState(2);
  const [currentPagination, setCurrentPagination] = useState(1);

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

  const { data: cats } = useCats();
  const { data: eventsObj } = useEvents();
  const { data: totalPages } = usePagination(5, currentCat);

  useEffect(() => {
    if (totalPages) {
      setTotalPagination(totalPages);
    }
  }, [totalPages]);

  useEffect(() => {
    if (eventsObj) {
      const eventsWithCategories = eventsObj.events.map((event) => {
        event.categories.length <= 0
          ? (event.categories = [{ slug: 'Annat' }])
          : event.categories;
        return event;
      });

      setEvents(eventsWithCategories);
    }
  }, [eventsObj]);

  const providerValue = useMemo(
    () => ({
      events,
      cats,
      totalPagination,
      updatePagination,
      currentCat,
      updateCurrentCat,
      currentPagination,
      updateCurrentPagination,
    }),
    [events, cats, currentCat, totalPagination, currentPagination]
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
