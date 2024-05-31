import Link from 'next/link';
import { useSearchParams } from 'next/dist/client/components/navigation';
import { IconBack } from '..';

export default function Breadcrumb({
  section,
  subsection,
  current,
}: {
  section: string;
  subsection?: {
    label: string;
    link: string;
  };
  current: string | null;
}) {
  return (
    <div className="flex gap-1 small font-bold px-8">
      {/*Home*/}
      <Link href="/">Hem</Link>

      {/*Section*/}
      <IconBack className="rotate-180 w-6 h-6 text-accent-500" />
      <span>{section}</span>

      {/*Subsection*/}
      {subsection && (
        <>
          <IconBack className="rotate-180 w-6 h-6 text-accent-500" />
          <Link
            href={{
              pathname: subsection.link,
              query: { slug: subsection.label },
            }}
          >
            {subsection.label}
          </Link>
        </>
      )}

      {/*Page*/}
      <IconBack className="rotate-180 w-6 h-6 text-accent-500" />
      <span className="font-light">{current}</span>
    </div>
  );
}
