import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getEventColor(category: string): string {
  switch (category) {
    case 'clinic':
      return 'rgb(254 97 0)';
    case 'event':
      return 'rgb(78 58 167)';
    case 'lektion':
      return 'rgb(195 38 220)';
    case 'tavling':
      return 'rgb(100 143 255)';
    default:
      return 'rgb(253 193 60)';
  }
}

// export function getWeek(date: Date) {
//   const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
//   const pastDaysOfYear = (date.getTime() - firstDayOfYear.getTime()) / 86400000;
//   return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
// }
