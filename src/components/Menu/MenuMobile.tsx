"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { mobileLinks } from "./links.const";
import { usePathname } from "next/navigation";
import { useViewport } from "@/hooks/useViewport";
import {
  IconArrowDouble,
  Modal,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../UI";
import { cn } from "@/lib/utils";
import ScheduleDaily from "../Events/Schedule/ScheduleDaily";

interface Link {
  Icon: React.ReactNode;
  icon?: React.ReactNode;
  label: string;
  slug: string;
  subLinks?: Link[];
}

export default function MenuMobile() {
  const [currentPage, setCurrentPage] = useState("");
  const [showSubmenu, setShowSubmenu] = useState("");
  const [showSchema, setShowSchema] = useState(false);

  const path = usePathname();
  const { height } = useViewport();

  useEffect(() => {
    const paths = path.split("/");
    const currentPath =
      paths[paths.length - 2] === "posts"
        ? "anslagstavlan"
        : paths[paths.length - 1];

    setCurrentPage(currentPath);
  }, [path]);

  const handleMenuClick = (label: string) => {
    if (label === showSubmenu) {
      setShowSubmenu("");
    } else {
      setShowSubmenu(label);
    }
  };

  const handleLink = (page: string) => {
    setShowSubmenu("");
  };

  const handleScheduleClick = () => {
    setShowSchema(!showSchema);
    setShowSubmenu("");
  };

  return (
    <div className="relative w-full flex flex-col items-center justify-between overflow-y-none h-[122px] h-sm:h-[100dvh] h-sm:w-[140px] shrink-0">
      <ul className="flex items-center h-sm:flex-col justify-between px-6 pt-5 h-sm:pb-5 w-full gap-6 h-sm:h-[100dvh]">
        {mobileLinks.map((link) => {
          const { Icon, label, subLinks, slug } = link;
          const isActive = subLinks?.some(
            (subLink) => subLink.slug === currentPage
          );

          return (
            <li key={slug} className="w-full">
              <Popover open={showSubmenu === label}>
                <PopoverTrigger asChild>
                  <button
                    onClick={() => handleMenuClick(label)}
                    className={cn(
                      "text-sm leading-none font-bold hover:underline flex flex-col items-center rounded-lg pb-2 w-full px-2 bg-primary-100 shadow-md",

                      isActive && "text-accent-500"
                    )}
                  >
                    <Icon className="w-9 h-9 md:h-8 md:w-8 lg:h-9 lg:w-9" />
                    <span className="small">{label}</span>
                  </button>
                </PopoverTrigger>
                <PopoverContent
                  sideOffset={12}
                  side={height <= 520 ? "left" : "top"}
                  asChild
                >
                  <div className="px-3.5 py-5 max-h-[100dvh] overflow-y-none">
                    <ul className="text-accent-500 flex flex-col gap-4">
                      {link.subLinks?.map((subLink, index) => (
                        <li key={index} className="py-0.5 flex items-center">
                          <div className="shrink-0 mx-3 w-1.5 h-1.5 rounded-full bg-accent-500" />
                          <Link
                            href={{
                              pathname: `/${link.slug}/${subLink.slug}`,
                              query: { slug: subLink.label },
                            }}
                            onClick={() => handleLink(subLink.label)}
                            className="font-bold text-xl flex items-center"
                          >
                            <span
                              className={cn(
                                "small",
                                currentPage === subLink.slug
                                  ? "text-accent-500"
                                  : "text-primary-900"
                              )}
                            >
                              {subLink.label}
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </PopoverContent>
              </Popover>
            </li>
          );
        })}
      </ul>
      <div
        className={cn(
          "fixed top-0 w-full h-sm:hidden  h-[100dvh] transition flex-col z-50",
          !showSchema && "translate-y-full -m-8"
        )}
      >
        <div className="flex justify-center px-20 w-full">
          <button
            onClick={() => handleScheduleClick()}
            className="bg-primary-500 w-full rounded-t-full flex items-center justify-center py-2 gap-2 text-xs h-sm:hidden"
          >
            <IconArrowDouble
              className={cn(showSchema && "rotate-180", "w-4 h-4 transition")}
            />
            Ridhusschema
          </button>
        </div>
        {/*Schema*/}
        <div className="h-[calc(100dvh-32px)] w-full bg-primary-500">
          <ScheduleDaily />
        </div>
      </div>
    </div>
  );
}
