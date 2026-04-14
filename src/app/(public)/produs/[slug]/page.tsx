import { notFound } from "next/navigation";
import Link from "next/link";
import { getProductBySlug, getReviewsByProduct } from "@/lib/get-data";
import AddToCartButton from "./AddToCartButton";
import ReviewSection from "./ReviewSection";
import { getImageUrl } from "@/lib/utils";
import { Star, Truck, Shield, RotateCcw } from "lucide-react";
import Image from "next/image";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "Produs" };
  return {
    title: product.name,
    description: product.description?.slice(0, 160) ?? `${product.name} - PappoCrafts`,
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const reviews = await getReviewsByProduct(product.id);
  const imgSrc = getImageUrl(product.images?.[0] ?? null);

  return (
    <div className="max-w-[1200px] mx-auto px-7 pt-[100px] pb-16">
      <nav className="flex items-center gap-2 text-[13px] text-navy-400 mb-8 font-light">
        <Link href="/" className="hover:text-russet-500 transition-colors">Acasă</Link>
        <span>/</span>
        <Link href="/magazin" className="hover:text-russet-500 transition-colors">Magazin</Link>
        <span>/</span>
        <span className="text-navy-700 font-medium line-clamp-1">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Images */}
        <div className="space-y-4">
          <div className="relative aspect-square bg-warm-100 rounded-2xl overflow-hidden">
            <Image
              src={imgSrc}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          </div>
          {product.images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto">
              {product.images.map((img, i) => (
                <div key={i} className="relative w-20 h-20 shrink-0 rounded-xl overflow-hidden border-2 border-warm-300/40">
                  <Image src={getImageUrl(img)} alt="" fill className="object-cover" sizes="80px" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div>
          {product.category && (
            <span className="text-[11px] font-bold text-russet-400 uppercase tracking-[0.15em]">
              {product.category.name}
            </span>
          )}
          <h1 className="text-2xl md:text-3xl font-bold text-navy-700 mt-1">{product.name}</h1>

          {product.review_count > 0 && (
            <div className="flex items-center gap-2 mt-3">
              <div className="flex items-center gap-0.5 text-amber-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={15} className={i < Math.round(product.rating_avg) ? "fill-amber-400" : "text-warm-200 fill-warm-200"} />
                ))}
              </div>
              <span className="text-[13px] text-navy-400 font-light">
                {product.rating_avg.toFixed(2)} ({product.review_count} recenzii)
              </span>
            </div>
          )}

          <div className="mt-6 font-[var(--font-heading)]">
            <span className="text-[30px] font-bold text-navy-700">{product.price.toFixed(0)}</span>
            <span className="text-[16px] font-normal text-navy-500 ml-1.5 font-[var(--font-body)]">RON</span>
          </div>

          {product.description && (
            <p className="mt-6 text-navy-500 leading-relaxed text-[15px] font-light">{product.description}</p>
          )}

          {product.artisan && (
            <div className="mt-5 flex items-center gap-3 p-4 bg-russet-50 rounded-2xl border border-russet-100">
              <div className="w-10 h-10 rounded-full bg-russet-200 flex items-center justify-center text-sm font-bold text-russet-700">
                {product.artisan.name.charAt(0)}
              </div>
              <div>
                <p className="text-[13px] font-medium text-navy-700">
                  Confecționat de {product.artisan.name}
                </p>
                <p className="text-[11px] text-russet-500 font-light">{product.artisan.role}</p>
              </div>
            </div>
          )}

          <div className="mt-8">
            <AddToCartButton product={product} />
          </div>

          <div className="mt-8 grid grid-cols-3 gap-4 text-center">
            {[
              { icon: Truck, label: "Livrare 24-48h" },
              { icon: Shield, label: "Plată securizată" },
              { icon: RotateCcw, label: "Retur 14 zile" },
            ].map((item) => (
              <div key={item.label} className="flex flex-col items-center gap-1.5 text-navy-400">
                <item.icon size={18} />
                <span className="text-[11px] font-light">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <ReviewSection reviews={reviews} productId={product.id} />
    </div>
  );
}
