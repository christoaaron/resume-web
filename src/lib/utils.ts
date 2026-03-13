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

export function stripHtml(html: string): string {
  if (!html) return "";
  const cleaned = html
    .replace(/<[^>]*>?/gm, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    // Strip soft hyphens, zero-width spaces, and other hidden break characters
    .replace(/[\u00AD\u200B\u200C\u200D\u2060\uFEFF]/g, '')
    .replace(/\s+/g, " ")
    .trim();
  return cleaned;
}

export function cleanText(text: string): string {
  if (!text) return "";
  return text
    .replace(/[\u00AD\u200B\u200C\u200D\u2060\uFEFF]/g, '')
    .replace(/\s+/g, " ")
    .trim();
}

export function stripHiddenChars(text: string): string {
  if (!text) return "";
  return text.replace(/[\u00AD\u200B\u200C\u200D\u2060\uFEFF]/g, '');
}
