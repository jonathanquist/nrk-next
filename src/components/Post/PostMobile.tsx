'use client';

import { format } from 'date-fns';
import {
  ButtonOld,
  IconArrowDouble,
  IconSocialFacebook,
  IconSocialTwitter,
} from '../UI';

import Image from 'next/image';
import StandardImg from '../../../public/images/hero_img.jpg';
import { shareOnFacebook, shareOnTwitter } from './post.utils';
import Link from 'next/link';
import PostTags from './PostTags';

interface PostMobileProps {
  post: any;
  cats: any;
}

export default function PostMobile({ post, cats }: PostMobileProps) {
  return (
    <div className="flex flex-col bg-primary-100 w-full">
      {/* Image */}
      <div className="relative h-72 w-full">
        <Image
          src={
            post._embedded['wp:featuredmedia']
              ? post._embedded['wp:featuredmedia'][0].source_url
              : StandardImg
          }
          alt="featured"
          sizes="100%"
          fill
          priority
          className="object-center object-cover"
        />
      </div>
      <div className="pt-12 pb-12 card-px ">
        {/* Title */}
        <div className="headline-l flex flex-col md:gap-7 mb-9">
          <h1>{post.title.rendered}</h1>
          <div className="flex flex-col lg:flex-row justify-start items-start lg:items-center">
            <div className="italic lg:font-medium text-sm lg:text-xl lg:text-primary-500 md:my-0 mb-4 mt-1">
              {format(new Date(post.date), 'dd MMMM, yyyy')}
            </div>
            <div className="font-light lg:ml-5 flex gap-2 lg:gap-1 lg:text-xl lg:text-primary-500">
              <PostTags arr={post.categories} cats={cats} />
            </div>
          </div>
        </div>

        {/* Post */}
        <div
          dangerouslySetInnerHTML={{ __html: post.content.rendered }}
          className="paragraph-lg mb-14 md:mb-7 wordpress-content"
        />

        {/* Share control */}
        <div className="flex flex-col gap-2.5 text-accent-500 mb-10">
          <p className="small font-bold text-base md:text-xl">Dela anslaget:</p>
          <div className="flex gap-4 items-center justify-start">
            <button onClick={shareOnFacebook}>
              <IconSocialFacebook className="w-9 h-9 md:h-12 md:w-12" />
            </button>

            <button onClick={() => shareOnTwitter(post.title.rendered)}>
              <IconSocialTwitter className="w-9 h-9 md:h-12 md:w-12" />
            </button>
          </div>
        </div>
        <Link
          href={{
            pathname: '/aktiviteter/anslagstavlan',
            query: { slug: 'Anslagstavlan' },
          }}
        >
          <ButtonOld
            className=""
            size={'md'}
            icon={<IconArrowDouble className="-rotate-90 h-7 w-7" />}
          >
            Återgå till anslagstavlan
          </ButtonOld>
        </Link>
      </div>
    </div>
  );
}
