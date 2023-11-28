import React, { useEffect, useState } from 'react';

export default function useFetch(url, pageNumber, postsPerPage) {
  const [data, setData] = useState(null);
  useEffect(() => {
    async function loadData() {
      let response;
      if (pageNumber && postsPerPage) {
        response = await fetch(
          `${url}&page=${pageNumber}&per_page=${postsPerPage}`
        );
      } else {
        response = await fetch(url);
      }
      if (!response.ok) {
        // Oops! something went wrong
        return;
      }

      const posts = await response.json();
      setData(posts);
    }

    loadData();
  }, [url, pageNumber, postsPerPage]);

  return data;
}
