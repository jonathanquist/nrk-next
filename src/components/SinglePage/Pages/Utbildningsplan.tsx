"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/UI";
import React from "react";
import PageSection from "../PageSection";
import Header from "@/components/Header";
import { usePages } from "@/hooks/useFetch";
import Loader from "@/components/Loader/Loader";
import HeaderMobile from "@/components/HeaderMobile";

export default function Utbildningsplan() {
  const { data: pages, isLoading } = usePages([
    "utbildningsplan",
    "utbildningsplan-lek-och-lar",
    "utbildningsplan-junior",
    "utbildningsplan-vuxen",
    "utbildningsplan-special",
  ]);

  if (isLoading || !pages) return <Loader />;

  return (
    <div className="h-full w-full card-base overflow-y-auto custom-scroll">
      <Header
        variant="page"
        title={pages.utbildningsplan?.title.rendered || "Utbildningsplan"}
        image={
          pages.utbildningsplan?._embedded["wp:featuredmedia"][0].source_url
        }
      />
      <div className="block lg:hidden">
        <HeaderMobile
          variant="page"
          title={pages.utbildningsplan?.title.rendered || "Utbildningsplan"}
          image={
            pages.utbildningsplan?._embedded["wp:featuredmedia"][0].source_url
          }
        />
      </div>
      <div className="card-px card-py h-full space-y-16">
        <PageSection page={pages.utbildningsplan} />
        <Tabs defaultValue="junior">
          <TabsList className="w-full justify-between   ">
            <TabsTrigger value="lek-och-lar">Lek & Lär</TabsTrigger>
            <TabsTrigger value="junior">Junior</TabsTrigger>
            <TabsTrigger value="vuxen">Vuxen</TabsTrigger>
            <TabsTrigger value="special">Special/Tävling</TabsTrigger>
          </TabsList>
          <div className="py-8">
            <TabsContent value="lek-och-lar">
              <PageSection page={pages["utbildningsplan-lek-och-lar"]} />
            </TabsContent>
            <TabsContent value="junior">
              <PageSection page={pages["utbildningsplan-junior"]} />
            </TabsContent>
            <TabsContent value="vuxen">
              <PageSection page={pages["utbildningsplan-vuxen"]} />
            </TabsContent>
            <TabsContent value="special">
              <PageSection page={pages["utbildningsplan-special"]} />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}
