// export async function getPosts() {
//   const res = await fetch(`http://localhost/nrk/wp-json/wp/v2/posts?_embed`);
//   const posts = await res.json();

//   return posts;
// }

// General fetch function
async function fetchData(url: string) {
  const res = await fetch(url);
  const data = await res.json();
  return data;
}

// Fetch posts with optional category
export async function getPosts(currentCat?: number) {
  let url = `http://localhost/nrk/wp-json/wp/v2/posts?_embed`;
  if (currentCat) {
    url += `&categories=${currentCat}`;
  }
  return fetchData(url);
}

export async function getCats() {
  const url = `http://localhost/nrk/wp-json/wp/v2/categories/`;
  return fetchData(url);
}

// Fetch pages by slug
export async function getPage(slug: string) {
  const url = `http://localhost/nrk/wp-json/wp/v2/pages/?slug=${slug}`;
  return fetchData(url);
}

export async function getPages(slugs: string[]) {
  const urls = slugs.map(
    (slug) => `http://localhost/nrk/wp-json/wp/v2/pages/?slug=${slug}`
  );
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
