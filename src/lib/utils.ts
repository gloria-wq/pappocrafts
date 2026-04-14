export function formatPrice(price: number): string {
  return `${price.toFixed(2).replace(".", ",")} lei`;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export function getImageUrl(path: string | null): string {
  if (!path) return "/images/placeholder.jpg";
  if (path.startsWith("http")) return path;
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  return `${supabaseUrl}/storage/v1/object/public/images/${path}`;
}

export function renderStars(rating: number): string[] {
  const stars: string[] = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(rating)) stars.push("full");
    else if (i - 0.5 <= rating) stars.push("half");
    else stars.push("empty");
  }
  return stars;
}
