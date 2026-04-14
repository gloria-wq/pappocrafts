import type { Product, Category, Artisan, Review } from "@/types";
import { sampleProducts, sampleCategories, sampleArtisans, sampleReviews } from "./sample-data";

const hasSupabase = () =>
  !!process.env.NEXT_PUBLIC_SUPABASE_URL && !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

async function liveImport() {
  return await import("./data");
}

export async function getFeaturedProducts(): Promise<Product[]> {
  if (!hasSupabase()) return sampleProducts.filter((p) => p.featured);
  const mod = await liveImport();
  const products = await mod.getFeaturedProducts();
  return products.length ? products : sampleProducts.filter((p) => p.featured);
}

export async function getProducts(opts?: {
  categorySlug?: string;
  search?: string;
  sort?: string;
  page?: number;
  limit?: number;
}): Promise<{ products: Product[]; count: number }> {
  if (!hasSupabase()) {
    let filtered = [...sampleProducts];
    if (opts?.categorySlug) {
      const cat = sampleCategories.find((c) => c.slug === opts.categorySlug);
      if (cat) filtered = filtered.filter((p) => p.category_id === cat.id);
    }
    if (opts?.search) {
      const q = opts.search.toLowerCase();
      filtered = filtered.filter((p) => p.name.toLowerCase().includes(q));
    }
    return { products: filtered, count: filtered.length };
  }
  const mod = await liveImport();
  return mod.getProducts(opts);
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  if (!hasSupabase()) return sampleProducts.find((p) => p.slug === slug) ?? null;
  const mod = await liveImport();
  return mod.getProductBySlug(slug);
}

export async function getCategories(): Promise<Category[]> {
  if (!hasSupabase()) return sampleCategories;
  const mod = await liveImport();
  const cats = await mod.getCategories();
  return cats.length ? cats : sampleCategories;
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  if (!hasSupabase()) return sampleCategories.find((c) => c.slug === slug) ?? null;
  const mod = await liveImport();
  return mod.getCategoryBySlug(slug);
}

export async function getArtisans(): Promise<Artisan[]> {
  if (!hasSupabase()) return sampleArtisans;
  const mod = await liveImport();
  const artisans = await mod.getArtisans();
  return artisans.length ? artisans : sampleArtisans;
}

export async function getReviewsByProduct(productId: string): Promise<Review[]> {
  if (!hasSupabase()) return sampleReviews.filter((r) => r.product_id === productId);
  const mod = await liveImport();
  return mod.getReviewsByProduct(productId);
}

export async function getRecentReviews(): Promise<Review[]> {
  if (!hasSupabase()) return sampleReviews;
  const mod = await liveImport();
  const reviews = await mod.getRecentReviews();
  return reviews.length ? reviews : sampleReviews;
}
