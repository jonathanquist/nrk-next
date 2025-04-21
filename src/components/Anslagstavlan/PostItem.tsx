import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import StandardImg from "../../../public/images/standard_image.jpg";
import ListTags from "./ListTags";
import { cleanAndTruncateText } from "@/lib/utils";
import { sv } from "date-fns/locale";

interface PostItemProps {
  post: any;
  monthMarker: React.ReactNode | null;
}

export default function PostItem({ post, monthMarker }: PostItemProps) {
  const title = post.title.rendered;
  const previewText = cleanAndTruncateText(post.excerpt.rendered);

  return (
    <>
      {monthMarker}
      <div className="lg:px-10">
        <Link href={`/posts/${post.slug}`} className="group" as="image">
          <div className="w-full overflow-hidden bg-primary-300 p-0 card card-base rise-animation lg:h-[270px] flex">
            <div className="relative w-24 sm:w-32 md:w-40 lg:w-72 shrink-0">
              <Image
                src={
                  post._embedded["wp:featuredmedia"]
                    ? post._embedded["wp:featuredmedia"][0].source_url
                    : StandardImg
                }
                alt="featured"
                sizes="100%"
                fill
                className="object-center object-cover "
              />
            </div>
            <div className="font-medium grow flex flex-col max-lg:justify-between lg:headline-m py-5 pl-5 pr-6 lg:py-10 lg:pl-10 lg:pr-16 lg:w-96 lg:gap-3.5">
              <h2 className="max-lg:line-clamp-1 lg:line-clamp-2 max-w-full lg:w-full break-words break-all">
                {title}
              </h2>
              <p className="line-clamp-3 max-lg:mt-1 break-words break-all paragraph-lg text-sm lg:text-base h-[60px] lg:h-[76px] lg:w-auto  lg:grow max-w-full">
                {previewText}
              </p>
              <div className="flex max-lg:mt-2 text-sm lg:text-xl text-primary-500 justify-start items-center">
                <div className="italic font-medium capitalize sm:hidden">
                  {format(new Date(post.date), "dd MMM yyyy", { locale: sv })}
                </div>
                <div className="italic font-medium capitalize hidden sm:flex">
                  {format(new Date(post.date), "dd MMMM, yyyy", { locale: sv })}
                </div>
                <div className="ml-5 hidden lg:flex">
                  {/* {getCats(post.categories)} */}
                  <ListTags tags={post.categories} />
                </div>
                <div className="small text-primary-900 ml-auto">Läs Mer</div>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
}
