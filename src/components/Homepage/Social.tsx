import Link from 'next/link';
import React from 'react';
import Button from '../Button';
import { IconSocialFacebook } from '../../../public/images/IconSocialFacebook';
import { IconSocialInstagram } from '../../../public/images/IconSocialInstagram';

export default function Social() {
  return (
    <div className="w-full flex justify-center py-20">
      <div className="rounded-xl flex flex-col bg-primary-100 gap-8 py-10 max-w-xl items-center w-full desktop card-base">
        <h2>Följ oss på sociala medier</h2>
        <div className="flex items-center gap-10">
          <Link href="https://www.facebook.com">
            <Button
              className=""
              size={'md'}
              icon={<IconSocialFacebook className="h-8 w-8" />}
            >
              Facebook
            </Button>
          </Link>
          <Link href="https://www.instagram.com">
            <Button
              className=""
              size={'md'}
              icon={<IconSocialInstagram className="h-8 w-8" />}
            >
              Instagram
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
