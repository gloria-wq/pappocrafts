import { Suspense } from "react";
import ShopGrid from "./ShopGrid";

export const metadata = {
  title: "Magazin",
  description: "Explorează toate produsele artizanale tradiționale românești de la PappoCrafts.",
};

export default function ShopPage() {
  return (
    <>
      <section className="bg-navy-700 pt-[120px] pb-16 px-7 text-center">
        <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-russet-300 block mb-2.5">
          ✦ Colecția completă
        </span>
        <h1 className="text-[clamp(32px,4.5vw,52px)] font-bold text-white leading-[1.1]">
          Colecția Completă
        </h1>
        <p className="text-warm-300/70 text-[15px] font-light mt-3 max-w-lg mx-auto">
          Toate produsele noastre artizanale, lucrate manual de meșteri din România.
        </p>
      </section>
      <div className="max-w-[1200px] mx-auto px-7 py-12">
        <Suspense
          fallback={
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="bg-warm-100 rounded-2xl aspect-[4/5] animate-pulse" />
              ))}
            </div>
          }
        >
          <ShopGrid />
        </Suspense>
      </div>
    </>
  );
}
