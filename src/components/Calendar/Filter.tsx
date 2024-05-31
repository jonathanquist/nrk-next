import {
  IconSettings,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Switch,
} from '../UI';
import { cn, getEventColor } from '@/lib/utils';

interface FilterMenuProps {
  filtered: string[];
  setFiltered: (filtered: string[]) => void;
}

export default function Filter({ filtered, setFiltered }: FilterMenuProps) {
  //   const events = ['clinic', 'event', 'lektion', 'tavling', 'annat'];
  const items = [
    { id: 'clinic', name: 'Clinic' },
    { id: 'event', name: 'Event' },
    { id: 'lektion', name: 'Lektion' },
    { id: 'tavling', name: 'Tävling' },
    { id: 'annat', name: 'Annat' },
  ];

  const handleToggle = (id: string) => {
    if (filtered.includes(id)) {
      setFiltered(filtered.filter((item) => item !== id));
    } else {
      setFiltered([...filtered, id]);
    }
  };

  console.log(filtered, 'filtered');

  return (
    <div className="absolute z-30 top-2 right-2">
      <Popover>
        <PopoverTrigger asChild>
          <button>
            <IconSettings className="w-16 h-16 text-primary-100" />
          </button>
        </PopoverTrigger>
        <PopoverContent align="end" className="w-80 py-8 px-5">
          <ul className="space-y-7">
            {items.map((item) => (
              <li key={item.id} className="w-full flex gap-2">
                <div
                  className={cn(
                    item.id === 'annat'
                      ? 'text-accent-500'
                      : 'text-primary-100',
                    'flex justify-center items-center text-2xl w-8 font-bold font-cambria shrink-0 rounded-l-xl'
                  )}
                  style={{ backgroundColor: getEventColor(item.id) }}
                >
                  {item.id.charAt(0).toUpperCase()}
                </div>
                <span className="font-bold text-left font-fira small text-lg line-clamp-2 ">
                  {item.name}
                </span>
                <div className="ml-auto">
                  <Switch
                    checked={!filtered.includes(item.id)}
                    onCheckedChange={() => handleToggle(item.id)}
                  />
                </div>
              </li>
            ))}
          </ul>
        </PopoverContent>
      </Popover>
    </div>
  );
}
