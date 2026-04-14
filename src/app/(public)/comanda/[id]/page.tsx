import Link from "next/link";
import { CheckCircle } from "lucide-react";

export const metadata = {
  title: "Comandă confirmată",
};

export default async function OrderConfirmationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
      <CheckCircle size={64} className="mx-auto text-green-500 mb-6" />
      <h1 className="text-3xl font-bold text-earth-900">
        Mulțumim pentru comandă!
      </h1>
      <p className="mt-4 text-earth-600">
        Comanda ta cu numărul{" "}
        <span className="font-mono font-bold text-earth-800">
          {id.slice(0, 8).toUpperCase()}
        </span>{" "}
        a fost înregistrată cu succes.
      </p>
      <p className="mt-2 text-earth-500 text-sm">
        Vei primi un email de confirmare în curând.
        Echipa noastră va pregăti comanda pentru expediere.
      </p>
      <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
        <Link
          href="/magazin"
          className="px-6 py-3 bg-brand-600 text-white font-semibold rounded-xl hover:bg-brand-700"
        >
          Continuă cumpărăturile
        </Link>
        <Link
          href="/"
          className="px-6 py-3 bg-white text-brand-600 font-semibold rounded-xl border border-brand-200 hover:bg-brand-50"
        >
          Înapoi acasă
        </Link>
      </div>
    </div>
  );
}
