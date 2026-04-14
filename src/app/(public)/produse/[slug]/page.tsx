import { notFound } from "next/navigation";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import SectionHeading from "@/components/SectionHeading";
import { getCategoryBySlug, getProducts } from "@/lib/get-data";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cat = await getCategoryBySlug(slug);
  if (!cat) return { title: "Categorie" };
  return {
    title: cat.name,
    description: cat.description ?? `Produse din categoria ${cat.name}`,
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cat = await getCategoryBySlug(slug);
  if (!cat) notFound();

  const { products } = await getProducts({ categorySlug: slug });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <nav className="flex items-center gap-2 text-sm text-earth-500 mb-8">
        <Link href="/" className="hover:text-brand-600">Acasă</Link>
        <span>/</span>
        <Link href="/produse" className="hover:text-brand-600">Categorii</Link>
        <span>/</span>
        <span className="text-earth-800 font-medium">{cat.name}</span>
      </nav>

      <SectionHeading
        title={cat.name}
        description={cat.description ?? undefined}
      />

      {products.length === 0 ? (
        <div className="text-center py-20 text-earth-500">
          <p className="text-lg">Nu sunt produse în această categorie încă.</p>
          <Link href="/magazin" className="inline-block mt-4 text-brand-600 font-semibold">
            Explorează magazinul &rarr;
          </Link>
        </div>
      ) : (
        <div className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
