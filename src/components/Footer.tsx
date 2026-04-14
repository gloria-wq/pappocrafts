import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-navy-700 text-warm-300/45">
      <div className="max-w-[1200px] mx-auto px-7 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xl font-bold text-white font-[var(--font-heading)] tracking-wide">
                PAPPO
              </span>
              <span className="text-xs font-bold text-teal-400 tracking-[0.15em] uppercase">
                crafts
              </span>
            </div>
            <p className="text-[13px] leading-[1.75] max-w-[280px] font-light">
              Fiecare piesă este făcută cu mâinile, cu dragoste, într-un mic
              studio din inima României.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-warm-300 text-[13px] font-bold mb-4 tracking-[0.05em]">
              Magazin
            </h4>
            <ul className="space-y-2">
              {[
                { href: "/produse/rachita-si-papura", label: "Rachită" },
                { href: "/produse/cupru", label: "Cupru" },
                { href: "/produse/lemn", label: "Lemn" },
                { href: "/produse/cadouri", label: "Cadouri" },
                { href: "/produse/ceramica-si-sticla", label: "Ceramică" },
              ].map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-[13px] font-light hover:text-russet-300 transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="text-warm-300 text-[13px] font-bold mb-4 tracking-[0.05em]">
              Informații
            </h4>
            <ul className="space-y-2">
              {[
                { href: "/despre-noi", label: "Despre noi" },
                { href: "/contact", label: "Contact" },
                { href: "/magazin", label: "Magazin" },
              ].map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-[13px] font-light hover:text-russet-300 transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href="tel:0726344038"
                  className="text-[13px] font-light hover:text-russet-300 transition-colors"
                >
                  0726 344 038
                </a>
              </li>
              <li>
                <a
                  href="mailto:office@pappocrafts.ro"
                  className="text-[13px] font-light hover:text-russet-300 transition-colors"
                >
                  office@pappocrafts.ro
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/[0.06] pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-[12px] font-light text-warm-300/25">
            &copy; {new Date().getFullYear()} PappoCrafts. Toate drepturile
            rezervate. Creat cu dragoste in Romania.
          </span>
          <span className="text-[12px] font-light text-warm-300/25">
            CSI Management and Research S.R.L.
          </span>
        </div>
      </div>
    </footer>
  );
}
