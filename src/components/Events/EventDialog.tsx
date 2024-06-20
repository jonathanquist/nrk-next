import { cn, getEventColor } from '@/lib/utils';
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../UI';
import Image from 'next/image';

interface EventDialogProps {
  info: any;
  children: React.ReactNode;
}

export function EventDialog({ info, children }: EventDialogProps) {
  if (!info) return null;

  const {
    title,
    start_date_details: start,
    end_date_details: end,
    venue,
    image,
    description,
  } = info;

  console.log(info);

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

  // Format dates to Swedish locale
  const startDayName = startDate.toLocaleString('sv-SE', { weekday: 'long' });
  const startMonthName = startDate.toLocaleString('sv-SE', { month: 'long' });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button>{children}</button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription className="capitalize">
            <p className="italic">
              {`${startDayName} ${start.day} ${startMonthName} ${start.hour}:${start.minutes} - ${end.hour}:${end.minutes}, `}
            </p>
            <p className="">{venue.venue}</p>
          </DialogDescription>
        </DialogHeader>
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
        <DialogFooter>
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
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
