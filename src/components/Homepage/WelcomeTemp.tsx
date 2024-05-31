import Link from 'next/link';
import React from 'react';
import Button from '../UI/Button/Button';
import { IconCall, IconSocialFacebook } from '../UI';

export default function WelcomeTemp() {
  return (
    <div className="w-full flex flex-col pt-7 pb-8 px-6 h-full md:desktop">
      <h1 className="small mb-10">Allmänt Temp</h1>
      <div className="paragraph-l text-sm mb-16">
        <p>
          Välkommen till denna pärla i Glasrikets östra del. Nybro Ridklubb har
          lärt ut ridsportens ädla konst sedan 1958.
        </p>
      </div>

      <Link href="tel:+4670882215" className="w-full">
        <Button
          className="justify-start rounded-xl text-base px-5 py-4 gap-5 mb-7 w-full"
          icon={<IconCall className="h-9 w-9" />}
        >
          <div className="flex flex-col items-start leading-none">
            <span className="font-light">Telefon</span>0481-162 48
          </div>
        </Button>
      </Link>

      <Button
        className="justify-start rounded-xl text-base px-5 py-4 gap-5"
        icon={<IconSocialFacebook className=" h-9 w-9" />}
      >
        Följ oss på Facebook
      </Button>
    </div>
  );
}
