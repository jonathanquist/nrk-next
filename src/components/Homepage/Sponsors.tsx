import Image from 'next/image';
import React from 'react';
7;
import Sponsor1 from '../../../public/images/sponsor_1.png';
import Sponsor2 from '../../../public/images/sponsor_2.png';
import Sponsor3 from '../../../public/images/sponsor_3.png';
import Sponsor4 from '../../../public/images/sponsor_4.png';

export default function Sponsors() {
  return (
    <div className="w-full flex flex-col items-center justify-center gap-12 md:desktop">
      <h2 className="!font-normal">Sponsorer</h2>
      <div className="flex justify-between w-full gap-10 items-stretch">
        <div className="relative w-52 h-52">
          <Image
            src={Sponsor1}
            alt="Sponsor 1"
            fill
            sizes="100%"
            className="object-contain"
          />
        </div>
        <div className="relative w-52 h-52">
          <Image
            src={Sponsor2}
            alt="Sponsor 2"
            fill
            sizes="100%"
            className="object-contain"
          />
        </div>
        <div className="relative w-52 h-52">
          <Image
            src={Sponsor3}
            alt="Sponsor 3"
            fill
            sizes="100%"
            className="object-contain"
          />
        </div>
        <div className="relative w-52 h-52">
          <Image
            src={Sponsor4}
            alt="Sponsor 4"
            fill
            sizes="100%"
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
}
