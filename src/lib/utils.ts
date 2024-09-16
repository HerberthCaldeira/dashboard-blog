import { clsx, type ClassValue } from "clsx";

import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function isInteger(value: any) {
  return /^\d+$/.test(value);
}

export function handlePageQueryString(page: string | null): number {
  if (page == null || !isInteger(page)) return 1;
  const p = parseInt(page);
  return p == 0 ? 1 : p;
}
