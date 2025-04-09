'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/UI';
import PageSection from '../PageSection';
import Header from '@/components/Header';
import { usePages } from '@/hooks/useFetch';
import Loader from '@/components/Loader/Loader';
import {
  APIProvider,
  Map,
  Marker,
  useMarkerRef,
} from '@vis.gl/react-google-maps';
import HeaderMobile from '@/components/HeaderMobile';

export default function OmOss() {
  // const { data: pages, isLoading } = usePages([
  //   'utbildningsplan',
  //   'utbildningsplan-lek-och-lar',
  //   'utbildningsplan-junior',
  //   'utbildningsplan-vuxen',
  //   'utbildningsplan-special',
  // ]);
  const { data: pages, isLoading } = usePages(['test', 'om-oss']);
  const [markerRef, marker] = useMarkerRef();

  if (isLoading || !pages) return <Loader />;

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;

  if (!apiKey) {
    throw new Error(
      'Google Maps API key is missing. Please set NEXT_PUBLIC_GOOGLE_MAPS_API_KEY in your .env file.'
    );
  }

  return (
    <div className="h-full w-full card-base overflow-y-auto custom-scroll">
      <Header
        variant="page"
        title={pages.test?.title.rendered || 'Om Oss'}
        image={pages.test?._embedded['wp:featuredmedia'][0].source_url}
      />
      <div className="block lg:hidden">
        <HeaderMobile
          variant="page"
          title={pages.test?.title.rendered || 'Om Oss'}
          image={pages.test?._embedded['wp:featuredmedia'][0].source_url}
        />
      </div>
      <div className="card-px card-py h-full space-y-16">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2186.721455069235!2d15.867948756840628!3d56.76491955357067!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4657b127d3f1c865%3A0xd854eae537c57d4b!2sNybro%20Ridklubb!5e0!3m2!1ssv!2sse!4v1744046332356!5m2!1ssv!2sse"
          width="600"
          height="450"
          style={{ border: 0 }}
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
        <APIProvider apiKey={apiKey}>
          <Map
            style={{ width: '100%', height: '500px' }}
            defaultCenter={{ lat: 56.76496415622014, lng: 15.870196801337684 }}
            defaultZoom={16}
            gestureHandling={'greedy'}
            disableDefaultUI={true}
          >
            <Marker
              ref={markerRef}
              position={{ lat: 56.76496415622014, lng: 15.870196801337684 }}
            />
          </Map>
        </APIProvider>
        {/* <PageSection page={pages.test} /> */}
        <Tabs defaultValue="junior">
          <TabsList className="w-full justify-between">
            <TabsTrigger value="om">Om Nybro Ridklubb</TabsTrigger>
            <TabsTrigger value="historia">Vår historia</TabsTrigger>
          </TabsList>
          <div className="py-8">
            <TabsContent value="om">
              <PageSection page={pages['test']} />
            </TabsContent>
            <TabsContent value="historia">
              <PageSection page={pages['om-oss']} />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}
