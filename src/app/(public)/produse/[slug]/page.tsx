import { notFound } from "next/navigation";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { getCategoryBySlug, getProducts } from "@/lib/get-data";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cat = await getCategoryBySlug(slug);
  if (!cat) return { title: "Categorie" };
  return { title: cat.name, description: cat.description ?? `Produse din categoria ${cat.name}` };
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cat = await getCategoryBySlug(slug);
  if (!cat) notFound();

  const { products } = await getProducts({ categorySlug: slug });

  return (
    <>
      <section className="bg-navy-700 pt-[120px] pb-16 px-7 text-center">
        <span className="text-4xl block mb-3">{cat.icon ?? "📦"}</span>
        <h1 className="text-[clamp(32px,4.5vw,48px)] font-bold text-white">{cat.name}</h1>
        {cat.description && (
          <p className="text-warm-300/70 text-[15px] font-light mt-3 max-w-lg mx-auto">{cat.description}</p>
        )}
      </section>

      <div className="max-w-[1200px] mx-auto px-7 py-12">
        <nav className="flex items-center gap-2 text-[13px] text-navy-400 mb-8 font-light">
          <Link href="/" className="hover:text-russet-500">Acasă</Link>
          <span>/</span>
          <Link href="/produse" className="hover:text-russet-500">Categorii</Link>
          <span>/</span>
          <span className="text-navy-700 font-medium">{cat.name}</span>
        </nav>

        {products.length === 0 ? (
          <div className="text-center py-20 text-navy-400">
            <p className="text-lg font-medium">Nu sunt produse în această categorie încă.</p>
            <Link href="/magazin" className="inline-block mt-4 text-russet-500 font-semibold">
              Explorează magazinul &rarr;
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
