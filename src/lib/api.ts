// const BASE_URL = `http://localhost/nrk/wp-json`;
const BASE_URL = `http://129.151.217.120/~ozfea/wordpress/wp-json`;

// General fetch function
// async function fetchData(url: string) {
//   const res = await fetch(`${BASE_URL}${url}`);
//   const data = await res.json();
//   return data;
// }'

// const CACHE_VALIDITY_PERIOD = 5 * 60 * 1000;
const CACHE_VALIDITY_PERIOD = 0;

async function fetchData(url: string) {
  // Use Next.js's fetch to automatically cache data on the server side
  const res = await fetch(`${BASE_URL}${url}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    next: { revalidate: CACHE_VALIDITY_PERIOD },

    // Optional: Configure cache behavior here if needed
  });
  const data = await res.json();
  return data;
}

// Fetch posts with optional category
export async function getPosts(currentCat?: number) {
  let url = `/wp/v2/posts?_embed`;
  if (currentCat) {
    url += `&categories=${currentCat}`;
  }
  return fetchData(url);
}

export async function getCats() {
  const url = `/wp/v2/categories/`;
  return fetchData(url);
}

// Fetch pages by slug
export async function getPage(slug: string) {
  const url = `/wp/v2/pages/?slug=${slug}&_embed`;
  return fetchData(url);
}

export async function getPages(slugs: string[]) {
  const urls = slugs.map((slug) => `/wp/v2/pages/?slug=${slug}&_embed`);
  const fetchPromises = urls.map((url) => fetchData(url));

  const pagesArray = await Promise.all(fetchPromises);
  const pagesObject = pagesArray.reduce((acc, page, index) => {
    // Assuming the page data is an array and we're interested in the first item
    const pageData = page[0] ? page[0] : null;
    if (pageData) {
      acc[slugs[index]] = pageData;
    }
    return acc;
  }, {});

  return pagesObject;
}

export async function getEvents() {
  const url = `/tribe/events/v1/events?start_date=2024-06-01`;
  return fetchData(url);
}
