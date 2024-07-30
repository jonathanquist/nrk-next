import Anslagstavlan from '@/components/Anslagstavlan/Anslagstavlan';
import { Breadcrumb } from '@/components/UI';
import { getCats, getPage, getPosts } from '@/lib/api';

export default async function Page() {
  const posts = await getPosts();
  const cats = await getCats();
  const page = await getPage('anslagstavlan');

  return (
    <>
      <Breadcrumb section="Aktiviteter" current={'Anslagstavlan'} />
      <Anslagstavlan page={page} posts={posts} cats={cats} />
    </>
  );
}
