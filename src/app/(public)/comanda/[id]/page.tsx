import Link from "next/link";
import { CheckCircle } from "lucide-react";

export const metadata = { title: "Comandă confirmată" };

export default async function OrderConfirmationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <div className="max-w-2xl mx-auto px-7 pt-[120px] pb-20 text-center">
      <CheckCircle size={64} className="mx-auto text-teal-500 mb-6" />
      <h1 className="text-3xl font-bold text-navy-700">Mulțumim pentru comandă!</h1>
      <p className="mt-4 text-navy-500 font-light">
        Comanda ta cu numărul{" "}
        <span className="font-mono font-bold text-navy-700">{id.slice(0, 8).toUpperCase()}</span>{" "}
        a fost înregistrată cu succes.
      </p>
      <p className="mt-2 text-navy-400 text-sm font-light">
        Vei primi un email de confirmare în curând. Echipa noastră va pregăti comanda pentru expediere.
      </p>
      <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
        <Link href="/magazin" className="px-8 py-3 bg-russet-500 text-white font-bold rounded-full hover:bg-russet-600 shadow-[0_6px_20px_rgba(162,110,115,0.3)]">
          Continuă cumpărăturile
        </Link>
        <Link href="/" className="px-8 py-3 bg-white text-russet-500 font-bold rounded-full border border-warm-300/80 hover:bg-warm-100">
          Înapoi acasă
        </Link>
      </div>
    </div>
  );
}
