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
    <>
      <section className="bg-navy-700 pt-[120px] pb-16 px-7 text-center">
        <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-russet-300 block mb-2.5">
          ✦ Tradiție vie
        </span>
        <h1 className="text-[clamp(32px,4.5vw,52px)] font-bold text-white">Categorii de Produse</h1>
        <p className="text-warm-300/70 text-[15px] font-light mt-3 max-w-lg mx-auto">
          Materiale naturale, mâini dibace, meșteșug autentic transmis din generație în generație.
        </p>
      </section>
      <div className="max-w-[1200px] mx-auto px-7 py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/produse/${cat.slug}`}
              className="group bg-white rounded-2xl p-8 border border-warm-300/40 hover:border-russet-300 hover:shadow-lg transition-all text-center"
            >
              <span className="text-4xl block mb-4">{cat.icon ?? "📦"}</span>
              <h3 className="text-[15px] font-semibold text-navy-700 group-hover:text-russet-500 transition-colors">
                {cat.name}
              </h3>
              <p className="text-[12px] text-navy-400 mt-2 font-light">{cat.description}</p>
              <span className="inline-block mt-4 text-[13px] text-russet-500 font-semibold">
                Explorează &rarr;
              </span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
