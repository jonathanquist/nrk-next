'use client';

import {
  QueryClientProvider,
  QueryClient,
  HydrationBoundary,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';

export default function QueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      {/* <HydrationBoundary> */}
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
      {/* </HydrationBoundary> */}
    </QueryClientProvider>
  );
}
