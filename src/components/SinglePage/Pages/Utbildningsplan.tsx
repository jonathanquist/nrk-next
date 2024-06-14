'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/UI';
import React from 'react';
import PageSection from '../PageSection';
import Header from '@/components/Header';

interface UtbildningsplanProps {
  pages: any;
}

export default function Utbildningsplan({ pages }: UtbildningsplanProps) {
  console.log(pages);
  return (
    <div className="card-base">
      <Header
        variant="page"
        title={pages.utbildningsplan?.title.rendered || 'Utbildningsplan'}
        // image={null}
      />
      <div className="card-px card-py space-y-16">
        <PageSection page={pages.utbildningsplan} />
        <Tabs defaultValue="junior" className="">
          <TabsList className="w-full justify-between   ">
            <TabsTrigger value="lek-och-lar">Lek & Lär</TabsTrigger>
            <TabsTrigger value="junior">Junior</TabsTrigger>
            <TabsTrigger value="vuxen">Vuxen</TabsTrigger>
            <TabsTrigger value="special">Special/Tävling</TabsTrigger>
          </TabsList>
          <div className="py-8">
            <TabsContent value="lek-och-lar">
              <PageSection page={pages['utbildningsplan-lek-och-lar']} />
            </TabsContent>
            <TabsContent value="junior">
              <PageSection page={pages['utbildningsplan-junior']} />
            </TabsContent>
            <TabsContent value="vuxen">
              <PageSection page={pages['utbildningsplan-vuxen']} />
            </TabsContent>
            <TabsContent value="special">
              <PageSection page={pages['utbildningsplan-special']} />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}
