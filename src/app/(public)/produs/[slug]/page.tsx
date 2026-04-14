import { notFound } from "next/navigation";
import Link from "next/link";
import { getProductBySlug, getReviewsByProduct } from "@/lib/get-data";
import AddToCartButton from "./AddToCartButton";
import ReviewSection from "./ReviewSection";
import { formatPrice, getImageUrl } from "@/lib/utils";
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <nav className="flex items-center gap-2 text-sm text-earth-500 mb-8">
        <Link href="/" className="hover:text-brand-600">Acasă</Link>
        <span>/</span>
        <Link href="/magazin" className="hover:text-brand-600">Magazin</Link>
        <span>/</span>
        <span className="text-earth-800 font-medium line-clamp-1">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Images */}
        <div className="space-y-4">
          <div className="relative aspect-square bg-earth-100 rounded-2xl overflow-hidden">
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
                <div key={i} className="relative w-20 h-20 shrink-0 rounded-lg overflow-hidden border-2 border-earth-200">
                  <Image src={getImageUrl(img)} alt="" fill className="object-cover" sizes="80px" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-earth-900">{product.name}</h1>

          {product.review_count > 0 && (
            <div className="flex items-center gap-2 mt-3">
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={
                      i < Math.round(product.rating_avg)
                        ? "fill-amber-400 text-amber-400"
                        : "text-earth-200"
                    }
                  />
                ))}
              </div>
              <span className="text-sm text-earth-500">
                {product.rating_avg.toFixed(2)} ({product.review_count} recenzii)
              </span>
            </div>
          )}

          <p className="mt-6 text-3xl font-bold text-brand-700">
            {formatPrice(product.price)}
          </p>

          {product.description && (
            <p className="mt-6 text-earth-600 leading-relaxed">{product.description}</p>
          )}

          {product.artisan && (
            <div className="mt-4 flex items-center gap-3 p-3 bg-brand-50 rounded-lg">
              <div className="w-10 h-10 rounded-full bg-brand-200 flex items-center justify-center text-sm font-bold text-brand-800">
                {product.artisan.name.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-medium text-earth-800">
                  Confecționat de {product.artisan.name}
                </p>
                <p className="text-xs text-earth-500">{product.artisan.role}</p>
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
              <div key={item.label} className="flex flex-col items-center gap-1.5 text-earth-500">
                <item.icon size={20} />
                <span className="text-xs">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <ReviewSection reviews={reviews} productId={product.id} />
    </div>
  );
}
