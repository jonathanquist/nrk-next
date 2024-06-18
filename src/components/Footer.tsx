'use client';

import Link from 'next/link';
import Image from 'next/image';
import Logo from '../../public/images/logo.svg';

export default function Footer() {
  return (
    <div className="bg-primary-100 w-full flex flex-col gap-3 h-72 items-center pb-2 pt-10">
      {/* <div className="bg-primary-100 w-full mb-0 flex items-center justify-center absolute bottom-0 flex-col gap-3 pt-10 h-72 h pb-2"> */}
      <div className="flex justify-between w-full max-w-7xl">
        <div className="flex justify-center flex-col items-center gap-6">
          <div className="relative w-24 h-32">
            <Image src={Logo} alt="logo" sizes="100%" fill />
          </div>
          <span className="text-2xl font-normal font-cambria">
            Nybro Ridklubb
          </span>
        </div>
        <div className="flex flex-col gap-6 font-light">
          <h3>Du hittar oss</h3>
          <p className="text-sm">
            Rismåla 5017
            <br />
            Box 149
            <br />
            38222 Nybro
          </p>
        </div>
        <div className="flex flex-col gap-6 font-light">
          <h3>Kontakta Ridskolan</h3>
          <p className="text-sm">
            <span className="font-bold">Telefon</span>
            <br />
            0481-162 48
          </p>
          <p className="text-sm">
            <span className="font-bold">E-post</span>
            <br />
            ridskolan@nybroridklubb.se
          </p>
        </div>
        <div className="flex flex-col gap-6 font-light">
          <h3>Kontakta Föreningen</h3>
          <p className="text-sm">
            <span className="font-bold">Telefon</span>
            <br />
            0481-162 48
          </p>
          <p className="text-sm">
            <span className="font-bold">E-post</span>
            <br />
            ridskolan@nybroridklubb.se
          </p>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <span className="text-[10px] font-fira font-light">
          © 2022 All rights reserved
        </span>
      </div>
    </div>
  );
}
