import Homepage from '@/components/Homepage/Homepage';
import { getEvents, getPages, getPosts } from '@/lib/api';

export default async function Page() {
  const posts = await getPosts();
  const pages = await getPages(['allmant', 'allmant-mobile', 'calendarmini']);
  const events = await getEvents();

  return <Homepage posts={posts} pages={pages} events={events} />;
}
