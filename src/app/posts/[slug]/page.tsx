import { getPosts, getCats } from '@/lib/api';
import Post from '@/components/Post/Post';
import PostMobile from '@/components/Post/PostMobile';

export default async function Page({ params }: { params: { slug: string } }) {
  const posts = await getPosts();
  const cats = await getCats();

  if (!posts || !cats) {
    return <div>Loading...</div>;
  }

  const selectedPost = posts.find((post: any) => post.slug === params.slug);

  // const handleBack = () => {
  //   updatePage('Anslagstavlan');
  //   router.back();
  // };

  // const getTags = (tagArr: any) => {
  //   return tagArr.map((tagId: any) => {
  //     const tagObject = tags.find((tag: { id: string }) => tag.id === tagId);
  //     return tagObject ? (
  //       <div className="capitalize">
  //         {tagObject.name === 'tavling' ? 'tävling' : tagObject.name}
  //       </div>
  //     ) : null;
  //   });
  // };

  return (
    <div className="w-full">
      <div className="hidden lg:block">
        {selectedPost && <Post post={selectedPost} cats={cats} />}
      </div>
      <div className="block lg:hidden">
        {selectedPost && <PostMobile post={selectedPost} cats={cats} />}
      </div>
    </div>
  );
}
