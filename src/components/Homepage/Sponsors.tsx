import Image from 'next/image';
import React from 'react';

import SponsorNBAB from '../../../public/images/sponsor_nbab.png';
import SponsorNybroEnergi from '../../../public/images/sponsor_nybro-energi.svg';
import SponsorRFSISU from '../../../public/images/sponsor_rf-sisu.svg';

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
];

export default function Sponsors() {
  return (
    <div className="w-full flex flex-col items-center justify-center gap-12 md:desktop">
      <h2 className="!font-normal">Sponsorer</h2>
      <div className="flex justify-center w-full gap-40 items-stretch">
        {sponsors.map((sponsor, index) => (
          <div key={index} className="relative w-52 h-52">
            <Image
              src={sponsor.image}
              alt={sponsor.name}
              fill
              sizes="100%"
              className="object-contain"
            />
          </div>
        ))}
        {/* <div className="relative w-52 h-52">
          <Image
            src={Sponsor1}
            alt="Sponsor 1"
            fill
            sizes="100%"
            className="object-contain"
          />
        </div> */}
      </div>
    </div>
  );
}
