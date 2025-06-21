import { destinationSurcharges } from "@/constants";
import { ShippingOptions } from "@/types";

export const isCurrentPage = (pathname: string, href: string): boolean => {
  if (!pathname || !href) return false;

  // Normalize paths by removing trailing slashes (but keep "/" intact)
  const normalize = (path: string) =>
    path === "/" ? "/" : path.replace(/\/$/, "");
  const normalizedPathname = normalize(pathname);
  const normalizedHref = normalize(href);

  // Exact match
  if (normalizedPathname === normalizedHref) return true;

  // Special handling: '/' should only match exact root, not every path
  if (normalizedHref === "/") return false;

  // Special handling for seller dashboard
  if (normalizedHref === "/seller") {
    return normalizedPathname === "/seller";
  }
  // Special handling for seller dashboard
  if (normalizedHref === "/admin") {
    return normalizedPathname === "/admin";
  }

  // Match nested routes (e.g., "/user/orders" startsWith "/user")
  return normalizedPathname.startsWith(normalizedHref);
};

// Ex Data
// "3 days"	Today + 3 days in ms
// "5-7 days"	Today + 5 days in ms
export function getExecuteDateFormatted(
  deliveryTime: string,
  format: string = "EEE, MMM d",
  locale: string = "en", // Accept a locale (e.g., "en" or "ar")
): string {
  const now = new Date();
  let targetDate: Date | null = null;

  // Try to parse as ISO date string
  const date = new Date(deliveryTime);
  if (!isNaN(date.getTime())) {
    targetDate = date;
  } else {
    // Match formats like "3 days" or "5-7 days"
    const daysMatch = deliveryTime.match(/(\d+)(?:\s*-\s*(\d+))?\s*days?/i);
    if (daysMatch) {
      const minDays = parseInt(daysMatch[1], 10);
      targetDate = new Date();
      targetDate.setDate(now.getDate() + minDays);
    }
  }

  if (!targetDate) {
    targetDate = now; // fallback to now if nothing matched
  }

  const options: Intl.DateTimeFormatOptions = getDateFormatOptions(format);

  return targetDate.toLocaleDateString(locale, options);
}
// Helper to map format string to Intl.DateTimeFormat options
function getDateFormatOptions(format: string): Intl.DateTimeFormatOptions {
  switch (format) {
    case "EEE, MMM d":
      return { weekday: "short", month: "short", day: "numeric" };
    case "MMMM d, yyyy":
      return { month: "long", day: "numeric", year: "numeric" };
    case "yyyy-MM-dd":
      return { year: "numeric", month: "2-digit", day: "2-digit" };
    default:
      return { weekday: "short", month: "short", day: "numeric" };
  }
}

// calculate Shipping Fee
export function calculateShippingFee(options: ShippingOptions): number {
  const { shippingMethod, destination, weightKg = 1 } = options;

  // Normalize the shipping method to English
  const methodEn = shippingMethod?.en?.toLowerCase() || "";
  const methodAr = shippingMethod?.ar?.toLowerCase() || "";

  // Free shipping check (both EN/AR)
  if (methodEn === "free" || methodAr === "مجاني") {
    return 0;
  }

  // Base fees by normalized method
  const baseFees: Record<string, number> = {
    standard: 5,
    express: 15,
  };

  // Determine the base fee using English value
  let fee = baseFees[methodEn] ?? 0;

  // Add destination-based surcharge
  fee += destinationSurcharges[destination] ?? 10;

  // Weight handling
  const MAX_FREE_WEIGHT = 1; // kg
  const WEIGHT_SURCHARGE = 2; // per kg over max

  if (weightKg > MAX_FREE_WEIGHT) {
    fee += (weightKg - MAX_FREE_WEIGHT) * WEIGHT_SURCHARGE;
  }

  return Math.max(0, fee);
}
