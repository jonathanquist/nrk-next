import { cn, decodeHtmlEntities, getEventColor } from '@/lib/utils';
import Image from 'next/image';
import { IconArrowSimple } from '../UI';

interface EventMobileProps {
  info: any;
  action: (event: any) => void; // Update the type to accept an argument
}

export function EventMobile({ info, action }: EventMobileProps) {
  if (!info) return null;

  const {
    title,
    start_date_details: start,
    end_date_details: end,
    venue,
    image,
    description,
  } = info;

  // Create Date objects
  const startDate = new Date(
    start.year,
    start.month - 1,
    start.day,
    start.hour,
    start.minutes
  );
  const endDate = new Date(
    end.year,
    end.month - 1,
    end.day,
    end.hour,
    end.minutes
  );

  const decodedTitle = decodeHtmlEntities(title);

  // Format dates to Swedish locale
  const startDayName = startDate.toLocaleString('sv-SE', { weekday: 'long' });
  const startMonthName = startDate.toLocaleString('sv-SE', { month: 'long' });

  return (
    <div className="flex gap-2 h-full pl-1.5">
      <button
        onClick={() => action(null)}
        className="w-9 py-6 h-full flex justify-center items-center"
      >
        <div className="h-full flex justify-center items-center rounded-l-xl font-semibold text-primary-100 bg-accent-500">
          <IconArrowSimple className="w-8 h-8 transform rotate-180" />
        </div>
      </button>
      <div className="grid h-fit w-full max-w-lg gap-4 border bg-primary-300 p-6 duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg">
        <div>
          <div>{decodeHtmlEntities(title)}</div>
          <div className="capitalize">
            <p className="italic">
              {`${startDayName} ${start.day} ${startMonthName} ${start.hour}:${start.minutes} - ${end.hour}:${end.minutes}, `}
            </p>
            <p className="">{venue.venue}</p>
          </div>
        </div>
        <div className="flex gap-4">
          {image && (
            <div className="w-16 h-full relative rounded-lg overflow-hidden">
              <Image
                src={image.url}
                alt={title}
                fill
                className="object-cover"
              />
            </div>
          )}

          <div
            dangerouslySetInnerHTML={{ __html: description }}
            className="paragraph-md mb-7 wordpress-content"
          />
        </div>
        <div>
          {info.categories.map((category: any) => (
            <span
              key={category.slug}
              className={cn(
                category.slug === 'annat'
                  ? 'text-accent-500'
                  : 'text-primary-100',
                'rounded-md px-2 py-1 text-xs'
              )}
              style={{
                backgroundColor: getEventColor(category.slug),
              }}
            >
              {category.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
