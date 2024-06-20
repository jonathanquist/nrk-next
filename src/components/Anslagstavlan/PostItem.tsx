import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';
import StandardImg from '../../../public/images/hero_img.jpg';

import ListTags from './ListTags';

interface PostItemProps {
  post: any;
  monthMarker: React.ReactNode | null;
}

export default function PostItem({ post, monthMarker }: PostItemProps) {
  return (
    <>
      {monthMarker}
      <div className="md:px-10">
        <Link href={`/posts/${post.slug}`} className="group">
          <div className="w-full overflow-hidden bg-primary-300 p-0 card card-base md:h-[270px] flex">
            <div className="relative h-36 md:h-full w-24 md:w-72 shrink-0">
              <Image
                src={
                  post._embedded['wp:featuredmedia']
                    ? post._embedded['wp:featuredmedia'][0].source_url
                    : StandardImg
                }
                alt="featured"
                sizes="100%"
                fill
                className="object-center object-cover "
              />
            </div>
            <div className="font-medium grow flex flex-col max-lg:justify-between md:headline-m py-5 pl-5 pr-6 lg:py-10 lg:pl-10 lg:pr-16 lg:w-96 lg:gap-3.5">
              <h2
                dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                className="max-lg:truncate max-lg:w-56"
              />
              <p
                dangerouslySetInnerHTML={{
                  __html: post.excerpt.rendered,
                }}
                className="line-clamp-3 break-words paragraph-lg text-sm lg:text-base h-14 w-56 lg:w-auto lg:h-full lg:grow max-w-full"
              />
              <div className="flex text-sm lg:text-xl text-primary-500 justify-start items-center">
                <div className="italic font-medium">
                  {format(new Date(post.date), 'dd MMMM, yyyy')}
                </div>
                <div className="ml-5 hidden lg:flex">
                  {/* {getCats(post.categories)} */}
                  <ListTags tags={post.categories} />
                </div>
                <button className="small text-primary-900 ml-auto">
                  Läs Mer
                </button>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
}
