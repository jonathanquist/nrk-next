'use client';

import useFetch from '@/hooks/useFetch';
import Image from 'next/image';
import StandardImg from '../../../../public/images/hero_img.jpg';
import { format } from 'date-fns';
import Link from 'next/link';
import Button from '@/components/Button';
import { useRouter } from 'next/navigation';
import { IconArrowDouble } from '../../../../public/images/IconArrowDouble';
import { FacebookShareButton, TwitterShareButton } from 'react-share';
import { IconSocialFacebook } from '../../../../public/images/IconSocialFacebook';
import { IconSocialTwitter } from '../../../../public/images/IconSocialTwitter';
import Breadcrumb from '@/components/Breadcrumb';
import { useMenu } from '@/hooks/MenuContext';

export default function Page({ params }: { params: { slug: string } }) {
  // const { updatePage } = useMenu();
  const router = useRouter();

  const posts: any = useFetch(
    'http://localhost/nrk/wp-json/wp/v2/posts?_embed'
  );
  const tags: any = useFetch('http://localhost/nrk/wp-json/wp/v2/tags/');

  if (!posts || !tags) {
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

  const getTags = (tagArr: any) => {
    // const tagNames = tagArr.map((tagId: any) => {
    //   const tagObject = tags.find((tag: { id: string }) => tag.id === tagId);
    //   return tagObject
    //     ? tagObject.name === 'tavling'
    //       ? 'tävling'
    //       : tagObject.name === 'daglig'
    //       ? 'Daglig Verksamhet'
    //       : tagObject.name
    //     : null;
    // });

    // // Filter out null values (tags that were not found)
    // const filteredTagNames = tagNames.filter(
    //   (tagName: string) => tagName !== null
    // );

    // // Join tag names with commas
    // return filteredTagNames.join(', ');
    const tagElements = tagArr.map((tagId: any, index: number) => {
      const tagObject = tags.find(
        (tag: { id: string; url: string }) => tag.id === tagId
      );
      return tagObject ? (
        <div key={tagObject.id} className="capitalize">
          <Link
            href={{
              pathname: `/aktiviteter/anslagstavlan`,
              query: { tag: tagObject.id },
            }}
          >
            {tagObject.name === 'tavling'
              ? 'tävling'
              : tagObject.name === 'daglig'
              ? 'Daglig Verksamhet'
              : tagObject.name}
          </Link>
          {index < tagArr.length - 1 && <span>, </span>}
        </div>
      ) : null;
    });

    return tagElements;
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
      //console.log(post, tags);
      return (
        <div className="mt-8" key={post.id}>
          <Breadcrumb
            section="Aktiviteter"
            subsection={{
              label: 'Anslagstavlan',
              link: '/aktiviteter/anslagstavlan',
            }}
            current={post.title.rendered}
          />
          <div className="card-base mt-9">
            <div className="flex flex-col">
              {/* Image */}
              <div className="relative h-[535px] w-full">
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
                <div className="headline-l flex flex-col gap-7 mb-9">
                  <h1>{post.title.rendered}</h1>
                  <div className="flex text-xl text-primary-500 justify-start items-center">
                    <div className="italic font-medium">
                      {format(new Date(post.date), 'dd MMMM, yyyy')}
                    </div>
                    <div className="font-light ml-5 flex gap-1">
                      {getTags(post.tags)}
                      {/* {post.tags.map((tagId: any) => {
                            const tagObject = tags.find(
                              (tag: { id: string }) => tag.id === tagId
                            );
                            return tagObject ? (
                              <div className="">{tagObject.name}</div>
                            ) : null;
                          })} */}
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
                  <Button
                    className=""
                    size={'md'}
                    icon={<IconArrowDouble className="-rotate-90 h-7 w-7" />}
                    // onClick={handleBack}
                  >
                    Återgå till anslagstavlan
                  </Button>
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
          <p>Jake the {params.slug}</p>
        </div>
      );
    }
  });

  return <div>{article}</div>;
}
