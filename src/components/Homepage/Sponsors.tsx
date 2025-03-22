import Image from 'next/image';
import React from 'react';

import SponsorNBAB from '../../../public/images/sponsor_nbab.png';
import SponsorNybroEnergi from '../../../public/images/sponsor_nybro-energi.svg';
import SponsorRFSISU from '../../../public/images/sponsor_rf-sisu.svg';
import SponsorOgOhlsson from '../../../public/images/sponsor_og-ohlsson.png';
import { cn } from '@/lib/utils';

const sponsors = [
  {
    name: 'Nybro Energi',
    image: SponsorNybroEnergi,
  },
  {
    name: 'Nybro Bostads AB',
    image: SponsorNBAB,
  },
  {
    name: 'RF-SISU',
    image: SponsorRFSISU,
  },
  {
    name: 'Byggnads AB O.G. Ohlsson',
    image: SponsorOgOhlsson,
  },
];

export default function Sponsors() {
  return (
    <div className="w-full flex flex-col items-center justify-center gap-12 md:desktop">
      <h2 className="!font-normal">Sponsorer</h2>
      <div className="flex justify-center w-full lg:gap-32 xl:gap-40 items-stretch px-16">
        {sponsors.map((sponsor, index) => (
          <div key={index} className="relative w-52 h-52 flex items-center">
            <div
              className={cn(
                index === sponsors.length - 1
                  ? 'h-28 rounded-md bg-accent-500'
                  : 'h-full',
                'relative  w-full'
              )}
            >
              <Image
                src={sponsor.image}
                alt={sponsor.name}
                fill
                sizes="100%"
                className={cn(
                  index === sponsors.length - 1 && 'p-4',
                  'object-contain'
                )}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
