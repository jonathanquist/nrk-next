import Homepage from '@/components/Homepage/Homepage';
import { getPages, getPosts } from '@/lib/api';

export default async function Page() {
  const posts = await getPosts();
  const pages = await getPages(['allmant', 'allmant-mobile', 'calendarmini']);

  return <Homepage posts={posts} pages={pages} />;
}
