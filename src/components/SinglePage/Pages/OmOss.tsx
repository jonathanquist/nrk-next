"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/UI";
import PageSection from "../PageSection";
import Header from "@/components/Header";
import { usePages } from "@/hooks/useFetch";
import Loader from "@/components/Loader/Loader";
import HeaderMobile from "@/components/HeaderMobile";

export default function OmOss() {
  const { data: pages, isLoading } = usePages([
    "om-oss-allmant",
    "om-oss-historik",
  ]);

  if (isLoading || !pages) return <Loader />;

  return (
    <div className="h-full w-full card-base overflow-y-auto custom-scroll">
      <Header
        variant="page"
        title={pages.test?.title.rendered || "Om Oss"}
        image={pages.test?._embedded["wp:featuredmedia"][0].source_url}
      />
      <div className="block lg:hidden">
        <HeaderMobile
          variant="page"
          title={pages.test?.title.rendered || "Om Oss"}
          image={pages.test?._embedded["wp:featuredmedia"][0].source_url}
        />
      </div>
      <div className="card-px card-py h-full space-y-16">
        {/* <PageSection page={pages.test} /> */}
        <Tabs defaultValue="allmant">
          <TabsList className="w-full justify-between">
            <TabsTrigger value="allmant">Om Nybro Ridklubb</TabsTrigger>
            <TabsTrigger value="historia">Vår historia</TabsTrigger>
          </TabsList>
          <div className="py-8">
            <TabsContent value="allmant">
              <PageSection page={pages["om-oss-allmant"]} />
            </TabsContent>
            <TabsContent value="historia">
              <PageSection page={pages["om-oss-historik"]} />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}
