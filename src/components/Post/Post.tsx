'use client';

import { format } from 'date-fns';
import {
  Breadcrumb,
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

interface PostProps {
  post: any;
  cats: any;
}

export default function Post({ post, cats }: PostProps) {
  return (
    <div>
      <Breadcrumb
        section="Aktiviteter"
        subsection={{
          label: 'Anslagstavlan',
          link: '/aktiviteter/anslagstavlan',
        }}
        current={post.title.rendered}
      />
      <div className="card-base">
        <div className="flex flex-col">
          {/* Image */}
          <div className="relative rounded-t-2xl overflow-hidden h-[535px] w-full">
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
          <div className="pt-32 pb-36 px-52">
            {/* Title */}
            <div className="headline-l flex flex-col lg:gap-7 mb-9">
              <h1>{post.title.rendered}</h1>
              <div className="flex flex-col lg:flex-row justify-start items-start lg:items-center">
                <div className="italic lg:font-medium text-sm lg:text-xl lg:text-primary-500 lg:my-0 mb-4 mt-1">
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
              className="paragraph-lg mb-7 wordpress-content"
            />

            {/* Share control */}
            <div className="flex flex-col gap-2.5 text-accent-500 mb-10">
              <p className="small font-bold text-xl">Dela anslaget:</p>
              <div className="flex gap-3 items-center justify-start">
                <button onClick={shareOnFacebook}>
                  <IconSocialFacebook className="h-12 w-12" />
                </button>

                <button onClick={() => shareOnTwitter(post.title.rendered)}>
                  <IconSocialTwitter className="h-12 w-12" />
                </button>
                {/* <FacebookShareButton url={shareUrl} quote={title}>
                  Share on Facebook
                </FacebookShareButton>
                <TwitterShareButton url={shareUrl} title={title}>
                  Share on Twitter
                  </TwitterShareButton> */}
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
                // onClick={handleBack}
              >
                Återgå till anslagstavlan
              </ButtonOld>
            </Link>

            {/* Signature */}
          </div>
        </div>
      </div>
      {/* <p>Jake the {params.slug}</p> */}
    </div>
  );
}
