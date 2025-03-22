const BASE_URL = `https://wordpress.nybroridklubb.se/wp-json`;
const CACHE_VALIDITY_PERIOD = 0;

const isBrowser = () => typeof window !== 'undefined';

function getCache<T = any>(key: string, useLocal = false): T | null {
  if (!isBrowser()) return null;
  const storage = useLocal ? localStorage : sessionStorage;
  const item = storage.getItem(key);
  return item ? (JSON.parse(item) as T) : null;
}

function setCache(key: string, data: any, useLocal = false) {
  if (!isBrowser()) return;
  const storage = useLocal ? localStorage : sessionStorage;
  storage.setItem(key, JSON.stringify(data));
}

async function fetchData(url: string, giveHeaders = false) {
  const res = await fetch(`${BASE_URL}${url}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    next: { revalidate: CACHE_VALIDITY_PERIOD },
  });

  console.log(`Fetching: ${BASE_URL}${url}`);

  const data = await res.json();
  return giveHeaders ? { data, headers: res.headers } : data;
}

async function fetchWithCache<T>(
  key: string,
  url: string,
  useLocal = false
): Promise<T> {
  const cached = getCache<T>(key, useLocal);
  if (cached) return cached;
  const data = await fetchData(url);
  setCache(key, data, useLocal);
  return data;
}

import { API } from './const';

export async function getPosts(currentCat?: number, page = 1, perPage = 10) {
  const cacheKey = `posts_${currentCat || 'all'}_page_${page}`;
  let url = `/wp/v2/posts?_embed&per_page=${perPage}&page=${page}`;
  if (currentCat) url += `&categories=${currentCat}`;
  return fetchWithCache(cacheKey, url);
}

export async function getCats() {
  return fetchWithCache(API.CATS, `/wp/v2/categories/`, true);
}

export async function getPagination(perPage = 10, currentCat?: number) {
  let url = `/wp/v2/posts?per_page=${perPage}`;
  if (currentCat) url += `&categories=${currentCat}`;

  const data = await fetchData(url, true);
  const totalPages = data.headers?.get('x-wp-totalpages');
  return totalPages ? parseInt(totalPages, 10) : 1;
}

export async function getPage(slug: string) {
  const cacheKey = `page_${slug}`;
  const url = `/wp/v2/pages/?slug=${slug}&_embed`;
  return fetchWithCache(cacheKey, url);
}

export async function getPages(slugs: string[]) {
  const pagesObject: Record<string, any> = {};

  await Promise.all(
    slugs.map(async (slug) => {
      const cacheKey = `page_${slug}`;
      const url = `/wp/v2/pages/?slug=${slug}&_embed`;
      const pageData = await fetchWithCache(cacheKey, url);
      pagesObject[slug] = pageData;
    })
  );

  return pagesObject;
}

export async function getEvents() {
  const cacheKey = 'events';

  if (typeof window !== 'undefined') {
    const cached = getCache(cacheKey);
    if (cached) return cached;
  }

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

  const eventsData = { events: allEvents };

  if (typeof window !== 'undefined') {
    setCache(cacheKey, eventsData);
  }

  return eventsData;
}
