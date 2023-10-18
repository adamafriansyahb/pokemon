import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Credit: https://stackoverflow.com/a/196991
const titleCase = (str: string) =>
  str.replace(/\w\S*/g, (txt) => {
    return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase();
  });

export const toTitleCase = (str: string) =>
  str
    .split('_')
    .map((word) => titleCase(word))
    .join(' ');
