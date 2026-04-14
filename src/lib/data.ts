import { getSupabaseBrowser } from "./supabase";
import type { Product, Category, Artisan, Review } from "@/types";

function db() {
  return getSupabaseBrowser();
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const { data } = await db()
    .from("products")
    .select("*")
    .eq("featured", true)
    .eq("in_stock", true)
    .order("created_at", { ascending: false })
    .limit(8);
  return (data as Product[]) ?? [];
}

export async function getProducts(opts?: {
  categorySlug?: string;
  search?: string;
  sort?: string;
  page?: number;
  limit?: number;
}): Promise<{ products: Product[]; count: number }> {
  const limit = opts?.limit ?? 12;
  const page = opts?.page ?? 1;
  const offset = (page - 1) * limit;

  let query = db().from("products").select("*, category:categories(*)", { count: "exact" });

  if (opts?.categorySlug) {
    const { data: cat } = await db()
      .from("categories")
      .select("id")
      .eq("slug", opts.categorySlug)
      .single();
    if (cat) query = query.eq("category_id", cat.id);
  }

  if (opts?.search) {
    query = query.ilike("name", `%${opts.search}%`);
  }

  switch (opts?.sort) {
    case "price_asc":
      query = query.order("price", { ascending: true });
      break;
    case "price_desc":
      query = query.order("price", { ascending: false });
      break;
    case "rating":
      query = query.order("rating_avg", { ascending: false });
      break;
    default:
      query = query.order("created_at", { ascending: false });
  }

  query = query.range(offset, offset + limit - 1);

  const { data, count } = await query;
  return { products: (data as Product[]) ?? [], count: count ?? 0 };
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const { data } = await db()
    .from("products")
    .select("*, category:categories(*), artisan:artisans(*)")
    .eq("slug", slug)
    .single();
  return (data as Product) ?? null;
}

export async function getCategories(): Promise<Category[]> {
  const { data } = await db()
    .from("categories")
    .select("*")
    .is("parent_id", null)
    .order("sort_order");
  return (data as Category[]) ?? [];
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const { data } = await db()
    .from("categories")
    .select("*")
    .eq("slug", slug)
    .single();
  return (data as Category) ?? null;
}

export async function getArtisans(): Promise<Artisan[]> {
  const { data } = await db()
    .from("artisans")
    .select("*")
    .order("sort_order");
  return (data as Artisan[]) ?? [];
}

export async function getReviewsByProduct(productId: string): Promise<Review[]> {
  const { data } = await db()
    .from("reviews")
    .select("*")
    .eq("product_id", productId)
    .order("created_at", { ascending: false });
  return (data as Review[]) ?? [];
}

export async function getRecentReviews(): Promise<Review[]> {
  const { data } = await db()
    .from("reviews")
    .select("*, product:products(name, slug)")
    .eq("verified", true)
    .order("created_at", { ascending: false })
    .limit(8);
  return (data as Review[]) ?? [];
}

export async function getSiteContent(section: string) {
  const { data } = await db()
    .from("site_content")
    .select("key, value")
    .eq("section", section);
  const map: Record<string, Record<string, unknown>> = {};
  data?.forEach((row: { key: string; value: Record<string, unknown> }) => {
    map[row.key] = row.value;
  });
  return map;
}
