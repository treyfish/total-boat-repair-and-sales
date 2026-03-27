export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(" ");
}

export function formatPrice(price: number | null): string {
  if (price === null || price === undefined) return "Call for Price";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function getBoatTitle(boat: {
  year?: number | null;
  make?: string | null;
  model?: string | null;
  name: string;
}): string {
  const parts = [boat.year, boat.make, boat.model].filter(Boolean);
  return parts.length > 0 ? parts.join(" ") : boat.name;
}
