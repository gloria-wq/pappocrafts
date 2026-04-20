"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { ShoppingCart, Menu, X, Moon, User } from "lucide-react";
import { useCart } from "@/context/CartContext";

const NAV_LINKS = [
  { href: "/magazin", label: "Colecție" },
  { href: "/produse", label: "Categorii" },
  { href: "/despre-noi", label: "Despre" },
];

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { totalItems } = useCart();
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/90 backdrop-blur shadow-sm" : "bg-transparent"
      }`}
    >
      <nav className="max-w-[1200px] mx-auto px-7 flex items-center justify-between h-[72px]">
        {/* Logo — mix-blend-mode removes the black PNG background */}
        <Link href="/" className="flex items-center shrink-0">
          {scrolled ? (
            <Image
              src="/logo.png"
              alt="PappoCrafts"
              width={160}
              height={50}
              className="h-[42px] w-auto object-contain"
              style={{ mixBlendMode: "multiply" }}
              priority
            />
          ) : (
            <Image
              src="/logo-white.png"
              alt="PappoCrafts"
              width={160}
              height={50}
              className="h-[42px] w-auto object-contain"
              style={{ mixBlendMode: "screen" }}
              priority
            />
          )}
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
                  scrolled
                    ? active
                      ? "text-russet-500 bg-russet-50"
                      : "text-navy-700 hover:text-russet-500 hover:bg-russet-50"
                    : active
                      ? "text-white bg-white/20"
                      : "text-white/90 hover:text-white hover:bg-white/15"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </div>

        {/* Right side icons */}
        <div className="flex items-center gap-1">
          <button
            className={`hidden md:flex p-2.5 rounded-full transition-all ${
              scrolled
                ? "text-navy-700 hover:text-russet-500 hover:bg-russet-50"
                : "text-white/90 hover:bg-white/15 hover:text-white"
            }`}
            aria-label="Mod întunecat"
          >
            <Moon size={18} />
          </button>
          <Link
            href="/admin"
            className={`hidden md:flex p-2.5 rounded-full transition-all ${
              scrolled
                ? "text-navy-700 hover:text-russet-500 hover:bg-russet-50"
                : "text-white/90 hover:bg-white/15 hover:text-white"
            }`}
            aria-label="Admin"
          >
            <User size={18} />
          </Link>
          <Link
            href="/cos"
            className={`relative p-2.5 rounded-full transition-all ${
              scrolled
                ? "text-navy-700 hover:text-russet-500 hover:bg-russet-50"
                : "text-white/90 hover:bg-white/15 hover:text-white"
            }`}
          >
            <ShoppingCart size={18} />
            {totalItems > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-teal-500 text-white text-[10px] font-bold w-[18px] h-[18px] rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
          <button
            onClick={() => setOpen(!open)}
            className={`md:hidden p-2.5 rounded-full transition-all ${
              scrolled
                ? "text-navy-700 hover:bg-russet-50"
                : "text-white/90 hover:bg-white/15"
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
