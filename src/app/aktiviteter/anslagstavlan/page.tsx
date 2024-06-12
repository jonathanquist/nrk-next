import Anslagstavlan from '@/components/Anslagstavlan/Anslagstavlan';
import { Breadcrumb } from '@/components/UI';
import { getCats, getPosts } from '@/lib/api';

export default async function Page() {
  const posts = await getPosts();
  const cats = await getCats();

  return (
    <>
      <Breadcrumb section="Aktiviteter" current={'Anslagstavlan'} />
      <Anslagstavlan posts={posts} cats={cats} />
    </>
  );
}
