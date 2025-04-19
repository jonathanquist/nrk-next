"use client";

import Post from "@/components/Post/Post";
import PostMobile from "@/components/Post/PostMobile";
import Loader from "@/components/Loader/Loader";
import { usePost } from "@/hooks/useFetch";
import { useViewport } from "@/hooks/useViewport";

export default function Page({ params }: { params: { slug: string } }) {
  const { data: post, isLoading } = usePost(params.slug);
  const { width } = useViewport();

  if (isLoading) return <Loader />;

  return (
    <div className="w-full height-full overflow-y-auto custom-scroll">
      <div className="hidden lg:block">
        {width > 1040 && <Post post={post} />}
      </div>
      <div className="block lg:hidden">
        {width < 1040 && <PostMobile post={post} />}
      </div>
    </div>
  );
}
