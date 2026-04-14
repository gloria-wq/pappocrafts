import { Suspense } from "react";
import SectionHeading from "@/components/SectionHeading";
import ShopGrid from "./ShopGrid";

export const metadata = {
  title: "Magazin",
  description: "Explorează toate produsele artizanale tradiționale românești de la PappoCrafts.",
};

export default function ShopPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <SectionHeading
        title="Magazin"
        description="Toate produsele noastre artizanale, lucrate manual de meșteri din România."
      />
      <Suspense
        fallback={
          <div className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bg-earth-100 rounded-xl aspect-square animate-pulse" />
            ))}
          </div>
        }
      >
        <ShopGrid />
      </Suspense>
    </div>
  );
}
