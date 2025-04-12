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
    case 'kurs':
      return 'rgb(195 38 220)';
    case 'tavling':
      return 'rgb(100 143 255)';
    case 'annat':
      return 'rgb(253 193 60)';
    default:
      return 'rgb(204 68 75)';
  }
}

export function decodeHtmlEntities(text: string): string {
  const textArea = document.createElement('textarea');
  textArea.innerHTML = text;
  return textArea.value;
}

export function getMonth(postDate: string): string {
  const date = new Date(postDate);
  const monthYear = new Intl.DateTimeFormat('sv-SE', {
    year: 'numeric',
    month: 'long',
  }).format(date);
  return monthYear;
}

export function getDay(postDate: string): string {
  const date = new Date(postDate);
  const dayMonth = new Intl.DateTimeFormat('sv-SE', {
    day: 'numeric',
    month: 'long',
  }).format(date);
  return dayMonth;
}

export function getDayInfo(clickInfo: any): any {
  return {
    y: clickInfo.dayEl.offsetTop + 132,
    x: clickInfo.dayEl.offsetLeft + clickInfo.dayEl.offsetWidth / 2,
    date: clickInfo.date,
  };
}

export function getDayEvents(clickInfo: any, events: any): any {
  const clickedDateStart = new Date(clickInfo.date);
  clickedDateStart.setHours(0, 0, 0, 0);

  // Set the time of the clicked date to the end of the day
  const clickedDateEnd = new Date(clickInfo.date);
  clickedDateEnd.setHours(23, 59, 59, 999);

  const clickedDateEvents = events.filter((event: any) => {
    const eventStartDate = new Date(event.start_date);
    const eventEndDate = new Date(event.end_date);

    // Check if the clicked date is within the entire day of the event
    return eventStartDate <= clickedDateEnd && clickedDateStart <= eventEndDate;
  });

  return clickedDateEvents;
}

// export function getWeek(date: Date) {
//   const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
//   const pastDaysOfYear = (date.getTime() - firstDayOfYear.getTime()) / 86400000;
//   return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
// }

export function cleanAndTruncateText(text: string, maxLength?: number): string {
  // Remove HTML tags
  let cleanedText = text.replace(/<\/?[^>]+(>|$)/g, '');

  // Decode HTML entities
  const textArea = document.createElement('textarea');
  textArea.innerHTML = cleanedText;
  cleanedText = textArea.value;

  // Ensure that [...] at the end is replaced with ...
  cleanedText = cleanedText.replace(/\[?&hellip;\]?|…/g, '...');
  cleanedText = cleanedText.replace(/\s*\[\.\.\.\]\s*$/, '...');

  // If maxLength is provided, truncate the text
  if (maxLength && cleanedText.length > maxLength) {
    return `${cleanedText.substring(0, maxLength)}...`;
  }

  return cleanedText;
}
