'use client';

import PageSection from '../PageSection';
import Header from '@/components/Header';
import { usePage } from '@/hooks/useFetch';
import Loader from '@/components/Loader/Loader';
import {
  APIProvider,
  Map,
  Marker,
  useMarkerRef,
} from '@vis.gl/react-google-maps';
import { API } from '@/lib/const';
import HeaderMobile from '@/components/HeaderMobile';

export default function Kontakt() {
  const { data: page, isLoading } = usePage(API.KONTAKT);
  const [markerRef, marker] = useMarkerRef();

  if (isLoading || !page) return <Loader />;

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;

  if (!apiKey) {
    throw new Error(
      'Google Maps API key is missing. Please set NEXT_PUBLIC_GOOGLE_MAPS_API_KEY in your .env file.'
    );
  }

  return (
    <div className="h-full w-full card-base overflow-y-auto custom-scroll ">
      <Header
        variant="page"
        title={page.title.rendered || 'Kontakt'}
        image={page._embedded['wp:featuredmedia'][0].source_url}
      />
      <div className="block lg:hidden">
        <HeaderMobile
          variant="page"
          title={page.title.rendered || 'Kontakt'}
          image={page._embedded['wp:featuredmedia'][0].source_url}
        />
      </div>
      <div className="card-px card-py h-full space-y-16">
        {/* <PageSection page={page} /> */}
        <div className="flex justify-between gap-4 flex-col lg:flex-row">
          <PageSection page={page} />

          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2186.721455069235!2d15.867948756840628!3d56.76491955357067!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4657b127d3f1c865%3A0xd854eae537c57d4b!2sNybro%20Ridklubb!5e0!3m2!1ssv!2sse!4v1744046332356!5m2!1ssv!2sse"
            width="650"
            height="430"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        {/* <APIProvider apiKey={apiKey}>
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
        </APIProvider> */}
      </div>
    </div>
  );
}
