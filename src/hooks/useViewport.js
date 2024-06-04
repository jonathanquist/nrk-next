import { set } from 'date-fns';
import { useState, useEffect } from 'react';

export const useViewport = () => {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [breakpoint, setBreakpoint] = useState('load');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Set the initial width
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);

      const handleWindowResize = () => {
        setWidth(window.innerWidth);
        // Set the height in state as well as the width
        setHeight(window.innerHeight);
      };

      window.addEventListener('resize', handleWindowResize);
      return () => window.removeEventListener('resize', handleWindowResize);
    }
  }, []);

  useEffect(() => {
    if (width < 768) {
      setBreakpoint('xs');
    } else if (width >= 768 && width < 992) {
      setBreakpoint('sm');
    } else if (width >= 992 && width < 1200) {
      setBreakpoint('md');
    } else if (width >= 1200 && width < 1400) {
      setBreakpoint('lg');
    } else if (width >= 1400) {
      setBreakpoint('xl');
    }
  }, [width]);

  // Return both the height and width
  return { width, height, breakpoint };
};
