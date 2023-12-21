import { set } from 'date-fns';
import { useState, useEffect } from 'react';

export const useViewport = () => {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [breakpointW, setBreakpointW] = useState(undefined);

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

  // Return both the height and width
  return { width, height, breakpoint: width > 768 };
};
