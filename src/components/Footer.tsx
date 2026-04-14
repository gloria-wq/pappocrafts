import Link from "next/link";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-earth-900 text-earth-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <h3 className="text-xl font-bold text-white mb-4 font-[var(--font-heading)]">
              PappoCrafts
            </h3>
            <p className="text-sm leading-relaxed">
              Obiecte unice, lucrate manual din materiale naturale. Fiecare
              produs poartă povestea unui meșter și sufletul tradiției românești
              autentice.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Navigare
            </h4>
            <ul className="space-y-2 text-sm">
              {[
                { href: "/magazin", label: "Magazin" },
                { href: "/produse", label: "Categorii" },
                { href: "/despre-noi", label: "Despre noi" },
                { href: "/contact", label: "Contact" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Categorii
            </h4>
            <ul className="space-y-2 text-sm">
              {[
                "Rachită și Papură",
                "Cupru",
                "Lemn",
                "Cadouri",
                "Ceramică",
              ].map((c) => (
                <li key={c}>
                  <span className="hover:text-white transition-colors cursor-default">
                    {c}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Contact
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <Phone size={16} className="mt-0.5 shrink-0" />
                <a href="tel:0726344038" className="hover:text-white">
                  0726 344 038
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Mail size={16} className="mt-0.5 shrink-0" />
                <a href="mailto:office@pappocrafts.ro" className="hover:text-white">
                  office@pappocrafts.ro
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={16} className="mt-0.5 shrink-0" />
                <span>Comuna Blejești, Jud. Teleorman</span>
              </li>
              <li className="flex items-start gap-2">
                <Clock size={16} className="mt-0.5 shrink-0" />
                <span>Luni – Vineri: 09:00 – 17:00</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-earth-700 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-earth-500">
          <p>&copy; {new Date().getFullYear()} PappoCrafts. Toate drepturile rezervate.</p>
          <p>CSI Management and Research S.R.L. &bull; CUI: RO44678251</p>
        </div>
      </div>
    </footer>
  );
}
