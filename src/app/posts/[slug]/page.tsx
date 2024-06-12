'use client';

import useFetch from '@/hooks/useFetch';
import Image from 'next/image';
import StandardImg from '../../../../public/images/hero_img.jpg';
import { format } from 'date-fns';
import Link from 'next/link';

import Breadcrumb from '@/components/UI/Breadcrumb/Breadcrumb';
import {
  ButtonOld,
  IconArrowDouble,
  IconSocialFacebook,
  IconSocialTwitter,
} from '@/components/UI';

export default function Page({ params }: { params: { slug: string } }) {
  const posts: any = useFetch(
    'http://localhost/nrk/wp-json/wp/v2/posts?_embed'
  );
  const cats: any = useFetch('http://localhost/nrk/wp-json/wp/v2/categories/');

  if (!posts || !cats) {
    return <div>Loading...</div>;
  }

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

  const getCats = (catArr: any) => {
    const catElements = catArr.map((catId: any, index: number) => {
      const catObject = cats.find(
        (cat: { id: string; url: string }) => cat.id === catId
      );
      return catObject ? (
        <div
          key={catObject.id}
          className="capitalize px-2.5 py-1 text-sm lg:text-lg font-medium lg:font-thin rounded-lg bg-accent-500 text-primary-100 lg:text-primary-500 lg:bg-transparent lg:p-0"
        >
          <Link
            href={{
              pathname: `/aktiviteter/anslagstavlan`,
              query: { cat: catObject.id },
            }}
          >
            {catObject.name === 'tavling'
              ? 'Tävling'
              : catObject.name === 'daglig'
              ? 'Daglig Verksamhet'
              : catObject.name}
          </Link>
          {index < catArr.length - 1 && <span>, </span>}
        </div>
      ) : null;
    });

    return catElements;
  };

  const shareOnFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        window.location.href
      )}`
    );
  };

  const shareOnTwitter = (title: any) => {
    const tweetText = encodeURIComponent(`Nybro Ridklubb: "${title}"`);
    window.open(
      `https://twitter.com/intent/tweet?text=${tweetText}&url=${window.location.href}`
    );
  };

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const title =
    typeof document !== 'undefined'
      ? document.title
      : 'Check out this awesome content!';

  const article = posts.map((post: any) => {
    if (post.slug === params.slug) {
      return (
        <div key={post.id}>
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
                    <div className="italic lg:font-medium text-sm lg:text-xl lg:text-primary-500 md:my-0 mb-4 mt-1">
                      {format(new Date(post.date), 'dd MMMM, yyyy')}
                    </div>
                    <div className="font-light lg:ml-5 flex gap-2 lg:gap-1 lg:text-xl lg:text-primary-500">
                      {getCats(post.categories)}
                    </div>
                  </div>
                </div>

                {/* Post */}
                <div
                  dangerouslySetInnerHTML={{ __html: post.content.rendered }}
                  className="paragraph-l mb-7 wordpress-content"
                />

                {/* Share control */}
                <div className="flex flex-col gap-2.5 text-accent-500 mb-10">
                  <p className="small font-bold text-xl">Dela anslaget:</p>
                  <div className="flex gap-0.5 items-center justify-start">
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
                {/* <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="flex items-center">
                          <img
                            className="w-10 h-10 rounded-full mr-4"
                            src={post._embedded.author[0].avatar_urls[48]}
                            alt="Avatar of Jonathan Reinink"
                          />
                          <div className="text-sm">
                            <p className="text-gray-900 leading-none">
                              {post._embedded.author[0].name}
                            </p>
                            <p className="text-gray-600">{post.date}</p>
                          </div>
                        </div>
                      </div>
                    </div> */}
              </div>
            </div>
          </div>
          {/* <p>Jake the {params.slug}</p> */}
        </div>
      );
    }
  });

  const articleMobile = posts.map((post: any) => {
    if (post.slug === params.slug) {
      return (
        <div className="flex flex-col bg-primary-100 w-full" key={post.id}>
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
                  {getCats(post.categories)}
                </div>
              </div>
            </div>

            {/* Post */}
            <div
              dangerouslySetInnerHTML={{ __html: post.content.rendered }}
              className="paragraph-l mb-14 md:mb-7 wordpress-content"
            />

            {/* Share control */}
            <div className="flex flex-col gap-2.5 text-accent-500 mb-10">
              <p className="small font-bold text-base md:text-xl">
                Dela anslaget:
              </p>
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
  });

  return (
    <div className="w-full">
      <div className="hidden lg:block">{article}</div>
      <div className="block lg:hidden">{articleMobile}</div>
    </div>
  );
}
