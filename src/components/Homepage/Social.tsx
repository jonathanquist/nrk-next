import Link from 'next/link';
import React from 'react';
import {
  ButtonOld,
  IconSocialFacebookSimple,
  IconSocialInstagram,
} from '../UI';

export default function Social() {
  return (
    <div className="w-full flex justify-center py-20">
      <div className="rounded-xl flex flex-col bg-primary-100 gap-8 py-10 max-w-xl items-center w-full desktop card-base">
        <h2>Följ oss på sociala medier</h2>
        <div className="flex items-center gap-10">
          <Link href="https://www.facebook.com">
            <ButtonOld
              className=""
              size={'md'}
              icon={<IconSocialFacebookSimple className="h-8 w-8" />}
            >
              Facebook
            </ButtonOld>
          </Link>
          <Link href="https://www.instagram.com">
            <ButtonOld
              className=""
              size={'md'}
              icon={<IconSocialInstagram className="h-8 w-8" />}
            >
              Instagram
            </ButtonOld>
          </Link>
        </div>
      </div>
    </div>
  );
}
