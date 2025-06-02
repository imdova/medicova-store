import { destinationSurcharges } from "@/constants";
import { ShippingOptions } from "@/types";

export const isCurrentPage = (pathname?: string, pattern?: string): boolean => {
  if (!pathname || !pattern) return false;

  // Normalize paths by removing trailing slashes
  const normalizedPathname = pathname.replace(/\/$/, "");
  const normalizedPattern = pattern.replace(/\/$/, "");

  // Special handling for root path
  if (normalizedPattern === "") {
    return normalizedPathname === "";
  }

  // Handle exact matches first
  if (normalizedPathname === normalizedPattern) return true;

  // Convert pattern to regex
  const regexPattern = normalizedPattern
    .replace(/\[.*?\]/g, "[^/]+") // Handle dynamic segments
    .replace(/\//g, "\\/");

  // Check exact match with regex
  const exactRegex = new RegExp(`^${regexPattern}$`);
  if (exactRegex.test(normalizedPathname)) return true;

  // Check for nested routes (e.g., account/profile under account)
  // But exclude the root path from this check
  if (normalizedPattern !== "") {
    const nestedRegex = new RegExp(`^${regexPattern}(\\/|$)`);
    if (nestedRegex.test(normalizedPathname)) return true;
  }

  // Handle wildcards if needed
  if (pattern.includes("*")) {
    const wildcardPattern = normalizedPattern.replace(/\*/g, ".*");
    const wildcardRegex = new RegExp(`^${wildcardPattern}`);
    return wildcardRegex.test(normalizedPathname);
  }

  return false;
};

// Ex Data
// "3 days"	Today + 3 days in ms
// "5-7 days"	Today + 5 days in ms
export function getExecuteDateFormatted(
  deliveryTime: string,
  format: string = "EEE, MMM d",
): string {
  const now = new Date();

  let targetDate: Date | null = null;

  // Check if deliveryTime is a date string
  const date = new Date(deliveryTime);
  if (!isNaN(date.getTime())) {
    targetDate = date;
  } else {
    // Check for "3 days" or "5-7 days"
    const daysMatch = deliveryTime.match(/(\d+)(?:\s*-\s*(\d+))?\s*days?/i);
    if (daysMatch) {
      const minDays = parseInt(daysMatch[1], 10);
      const deliveryDays = minDays; // Or pick average/min
      targetDate = new Date();
      targetDate.setDate(now.getDate() + deliveryDays);
    }
  }

  if (!targetDate) {
    targetDate = now; // fallback
  }

  // Use Intl.DateTimeFormat for formatting
  const options: Intl.DateTimeFormatOptions = getDateFormatOptions(format);
  return targetDate.toLocaleDateString(undefined, options);
}

// Helper to map format string to Intl.DateTimeFormat options
function getDateFormatOptions(format: string): Intl.DateTimeFormatOptions {
  switch (format) {
    case "EEE, MMM d":
      return { weekday: "short", month: "short", day: "numeric" }; // Mon, Jun 2
    case "MMMM d, yyyy":
      return { month: "long", day: "numeric", year: "numeric" }; // June 2, 2025
    case "yyyy-MM-dd":
      return { year: "numeric", month: "2-digit", day: "2-digit" }; // 2025-06-02
    default:
      return { weekday: "short", month: "short", day: "numeric" }; // fallback
  }
}

// calculate Shipping Fee

export function calculateShippingFee(options: ShippingOptions): number {
  const { shippingMethod, destination, weightKg = 1 } = options;

  // Free shipping conditions
  if (shippingMethod === "free") {
    return 0;
  }

  // Base fees by shipping method
  const baseFees = {
    standard: 5,
    express: 15,
  };

  let fee = baseFees[shippingMethod] || 0;

  fee += destinationSurcharges[destination] ?? 10; // Default international fee

  // Weight handling
  const MAX_FREE_WEIGHT = 1; // kg
  const WEIGHT_SURCHARGE = 2; // per kg over max free weight

  if (weightKg > MAX_FREE_WEIGHT) {
    fee += (weightKg - MAX_FREE_WEIGHT) * WEIGHT_SURCHARGE;
  }

  // Ensure fee isn't negative
  return Math.max(0, fee);
}
