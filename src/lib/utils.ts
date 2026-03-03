import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDateMonthYear(dateString: string | null | undefined): string {
  if (!dateString) return "";
  const [year, month] = dateString.split("-");
  if (!year || !month) return dateString;
  const date = new Date(parseInt(year), parseInt(month) - 1);
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

export function generateDateString(startDate: string | null | undefined, endDate: string | null | undefined, current: boolean): string {
  if (!startDate) return "";
  const startStr = formatDateMonthYear(startDate);
  if (current) return `${startStr} - Present`;
  if (endDate) return `${startStr} - ${formatDateMonthYear(endDate)}`;
  return startStr;
}
