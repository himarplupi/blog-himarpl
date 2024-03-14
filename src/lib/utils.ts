import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function abbreviation(name: string | undefined | null) {
  if (!name) return "";
  return name
    .split(" ")
    .map((x) => x[0])
    .join("")
    .substring(0, 2);
}
