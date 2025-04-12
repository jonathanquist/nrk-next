import { useQuery, useQueryClient } from '@tanstack/react-query';

const BASE_URL = `https://wordpress.nybroridklubb.se/wp-json`;

async function fetchData(url: string) {
  const res = await fetch(`${BASE_URL}${url}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });
  return res.json();
}

//SINGLE PAGE
export function usePage(slug: string) {
  const url = `/wp/v2/pages/?slug=${slug}&_embed`;

  return useQuery({
    queryKey: ['PAGE', slug],
    queryFn: async () => {
      const data = await fetchData(url);
      return data.length > 0 ? data[0] : null; // Return the first post or null if no post is found
    },
    staleTime: 1000 * 60 * 10,
  });
}

//MULTIPLE PAGES
export function usePages(slugs: string[]) {
  return useQuery({
    queryKey: ['PAGES', slugs],
    queryFn: async () => {
      const pages = await Promise.all(
        slugs.map((slug) =>
          fetchData(`/wp/v2/pages/?slug=${slug}&_embed`).then((data) => ({
            slug,
            data,
          }))
        )
      );

      // Convert the array of pages into an object keyed by slug
      return pages.reduce((acc, { slug, data }) => {
        acc[slug] = data[0]; // Assuming each slug returns a single page
        return acc;
      }, {} as Record<string, any>);
    },
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
}

//SINGLE POST
export function usePost(slug: string) {
  const url = `/wp/v2/posts?slug=${slug}&_embed`;

  return useQuery({
    queryKey: ['POST', slug],
    queryFn: async () => {
      const data = await fetchData(url);
      return data.length > 0 ? data[0] : null; // Return the first post or null if no post is found
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

//MULTIPLE POSTS
export function usePosts(
  currentCat?: number,
  page: number = 1,
  perPage: number = 5
) {
  const url =
    `/wp/v2/posts?_embed&per_page=${perPage}&page=${page}` +
    (currentCat ? `&categories=${currentCat}` : '');

  return useQuery({
    queryKey: ['POSTS', currentCat || 'ALL', page],
    queryFn: () => fetchData(url),
    staleTime: 1000 * 60 * 5, // 5 min fresh
    gcTime: 1000 * 60 * 30, // 30 min cached in memory
  });
}

//CATEGORIES
export function useCats() {
  const url = `/wp/v2/categories/`;

  return useQuery({
    queryKey: ['CATS'],
    queryFn: () => fetchData(url),
    staleTime: Infinity,
    gcTime: Infinity, // never refetch unless manually invalidated
  });
}

//PAGINATION
export function usePagination(perPage: number = 10, currentCat?: number) {
  const url =
    `/wp/v2/posts?per_page=${perPage}` +
    (currentCat ? `&categories=${currentCat}` : '');

  return useQuery({
    queryKey: ['PAGINATION', currentCat ?? 'ALL', perPage],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}${url}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      const totalPages = res.headers.get('x-wp-totalpages');
      return totalPages ? parseInt(totalPages, 10) : 1;
    },
    staleTime: 1000 * 60 * 10, // 10 min
  });
}

//EVENTS
export function useEvents() {
  return useQuery({
    queryKey: ['EVENTS'],
    queryFn: async () => {
      let allEvents: any[] = [];
      let page = 1;
      let totalPages = 1;

      while (page <= totalPages) {
        const url = `/tribe/events/v1/events?start_date=2024-01-01&page=${page}`;
        const response = await fetchData(url);

        if (response && response.events) {
          allEvents = allEvents.concat(response.events);
          totalPages = response.total_pages || 1;
          page++;
        } else {
          break;
        }
      }

      return { events: allEvents };
    },
    staleTime: 1000 * 60 * 5,
  });
}

export function useEventSpan(start_date: string, end_date: string) {
  const url = `/tribe/events/v1/events?start_date=${start_date}&end_date=${end_date}`;

  return useQuery({
    queryKey: ['EVENTS', start_date, end_date],
    queryFn: async () => {
      let allEvents: any[] = [];
      let page = 1;
      let totalPages = 1;

      while (page <= totalPages) {
        const paginatedUrl = `${url}&page=${page}`;
        const response = await fetchData(paginatedUrl);

        if (response && response.events) {
          // Fix missing categories
          const eventsWithCategories = response.events.map((event: any) => {
            if (!event.categories || event.categories.length === 0) {
              event.categories = [{ slug: 'annat' }]; // Default category
            }
            return event;
          });

          allEvents = allEvents.concat(eventsWithCategories);
          totalPages = response.total_pages || 1;
          page++;
        } else {
          break;
        }
      }

      return { events: allEvents };
    },
    staleTime: 1000 * 60 * 10, // Cache for 10 minutes
  });
}
