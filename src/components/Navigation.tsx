"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { ShoppingCart, Menu, X } from "lucide-react";
import { useCart } from "@/context/CartContext";

const NAV_LINKS = [
  { href: "/", label: "Acasă" },
  { href: "/magazin", label: "Magazin" },
  { href: "/produse", label: "Categorii" },
  { href: "/despre-noi", label: "Despre Noi" },
  { href: "/contact", label: "Contact" },
];

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { totalItems } = useCart();
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const transparent = isHome && !scrolled;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        transparent
          ? "bg-transparent"
          : "bg-white/95 backdrop-blur shadow-sm"
      }`}
    >
      <nav className="max-w-[1200px] mx-auto px-7 flex items-center justify-between h-[72px]">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span
            className={`text-xl font-bold tracking-wide transition-colors font-[var(--font-heading)] ${
              transparent ? "text-white" : "text-navy-700"
            }`}
          >
            PAPPO
          </span>
          <span
            className={`text-xs font-semibold tracking-[0.15em] uppercase transition-colors ${
              transparent ? "text-teal-300" : "text-teal-500"
            }`}
          >
            crafts
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-0.5">
          {NAV_LINKS.map((l) => {
            const active = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`px-[18px] py-2 rounded-full text-[13px] font-semibold transition-all ${
                  transparent
                    ? active
                      ? "text-white bg-white/15"
                      : "text-white/85 hover:text-white hover:bg-white/15"
                    : active
                      ? "text-russet-500 bg-russet-50"
                      : "text-navy-700 hover:text-russet-500 hover:bg-russet-50"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <Link
            href="/cos"
            className={`relative p-2.5 rounded-full transition-all ${
              transparent
                ? "text-white/85 hover:bg-white/15 hover:text-white"
                : "text-navy-700 hover:text-russet-500 hover:bg-russet-50"
            }`}
          >
            <ShoppingCart size={20} />
            {totalItems > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-russet-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-md">
                {totalItems}
              </span>
            )}
          </Link>
          <button
            onClick={() => setOpen(!open)}
            className={`md:hidden p-2.5 rounded-full transition-all ${
              transparent
                ? "text-white/85 hover:bg-white/15"
                : "text-navy-700 hover:bg-russet-50"
            }`}
            aria-label="Meniu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-warm-200 shadow-lg">
          <div className="px-4 py-3 space-y-1">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className={`block px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
                  pathname === l.href
                    ? "text-russet-500 bg-russet-50"
                    : "text-navy-700 hover:text-russet-500 hover:bg-warm-100"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
