"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Logo from "../../../public/images/logo_text.svg";
import LogoSimple from "../../../public/images/logo.svg";
import { IconArrowSimple } from "../UI";

export default function MenuHeader() {
  const [title, setTitle] = useState<string>("Home");
  const path = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const slug = searchParams.get("slug");
    if (slug) {
      setTitle(slug);
    } else {
      const paths = path.split("/");
      const fallbackSlug = paths[paths.length - 1] || "Home";
      setTitle(fallbackSlug);
    }
  }, [path, searchParams]);

  return (
    <div className="w-full flex items-center justify-center pt-5 pb-3 px-6">
      {path === "/" ? (
        <div className="w-full flex justify-center items-center">
          <Link href="/" className="relative h-12 w-full shrink-0">
            <Image src={Logo} alt="logo" sizes="100%" fill priority />
          </Link>
        </div>
      ) : (
        <div className="w-full flex justify-between items-center">
          <div className="flex items-center gap-1">
            <Link href="/" className="relative h-9 w-6 shrink-0">
              <Image src={LogoSimple} alt="logo" sizes="100%" fill priority />
            </Link>
            <IconArrowSimple className="w-6 h-6 text-primary-700" />
          </div>
          <div className="pr-12 w-full text-center">
            <h1 className="text-4xl text small">{title}</h1>
          </div>
        </div>
      )}
    </div>
  );
}
