import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";
import { getCategories } from "@/lib/get-data";

export const metadata = {
  title: "Categorii",
  description: "Explorează categoriile de produse tradiționale românești de la PappoCrafts.",
};

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <SectionHeading
        title="Categorii de Produse"
        description="Materiale naturale, mâini dibace, meșteșug autentic transmis din generație în generație."
      />
      <div className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/produse/${cat.slug}`}
            className="group bg-white rounded-xl p-8 border border-earth-100 hover:border-brand-200 hover:shadow-md transition-all text-center"
          >
            <span className="text-4xl block mb-4">{cat.icon ?? "📦"}</span>
            <h3 className="text-lg font-semibold text-earth-800 group-hover:text-brand-600 transition-colors">
              {cat.name}
            </h3>
            <p className="text-sm text-earth-500 mt-2">{cat.description}</p>
            <span className="inline-block mt-4 text-sm text-brand-600 font-medium">
              Explorează &rarr;
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
