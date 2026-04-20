import Link from "next/link";
import { ChevronLeft, Leaf, Heart, Hammer } from "lucide-react";

const CARDS = [
  {
    icon: <Hammer size={28} className="text-russet-500" />,
    title: "Handmade Tradition",
    desc: "Every piece is shaped by hand, carrying centuries of Romanian craft passed down through generations of dedicated artisans.",
  },
  {
    icon: <Leaf size={28} className="text-teal-500" />,
    title: "Natural Materials",
    desc: "We work exclusively with linden wood, 99.97% pure copper, natural wicker, and organic textiles — nothing artificial, nothing rushed.",
  },
  {
    icon: <Heart size={28} className="text-russet-400" />,
    title: "Made with Care",
    desc: "Each object takes hours, sometimes days to complete. That time and intention is what you feel when you hold a PappoCrafts piece.",
  },
];

export default function ArtisansPage() {
  return (
    <>
      {/* ─── HERO ─── */}
      <section className="pt-[140px] pb-20 px-7 text-center max-w-[760px] mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-white/80 hover:text-white transition-colors mb-8"
        >
          <ChevronLeft size={15} /> Back to home
        </Link>
        <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-teal-500/20 text-white text-[11px] font-bold uppercase tracking-[0.2em] mb-6 backdrop-blur-sm border border-teal-400/30">
          ✦ Din inima meșterilor români
        </span>
        <h1 className="text-[clamp(36px,5vw,60px)] font-bold text-[#FDD2BC] leading-[1.1] mb-6 drop-shadow-md">
          Meet our artisans
        </h1>
        <p className="text-white text-[17px] leading-[1.8] font-light max-w-[580px] mx-auto">
          Behind every PappoCrafts object is a person — a craftsman or craftswoman
          who has devoted years to mastering their trade. These are their stories,
          their hands, and their passion for keeping Romanian tradition alive.
        </p>
      </section>

      {/* ─── VIDEO ─── */}
      <section className="max-w-[860px] mx-auto px-7 pb-24">
        <div className="rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.3)] border border-white/20">
          {/* Replace this video with the real artisans video */}
          <iframe
            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
            title="Meet the artisans of PappoCrafts"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full aspect-video"
          />
        </div>
      </section>

      {/* ─── THREE CARDS ─── */}
      <section className="max-w-[1100px] mx-auto px-7 pb-28">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CARDS.map((c) => (
            <div
              key={c.title}
              className="bg-white/60 backdrop-blur-md rounded-2xl p-8 border border-white/50 hover:bg-white/75 hover:shadow-xl transition-all"
            >
              <div className="mb-5">{c.icon}</div>
              <h3 className="text-[17px] font-bold text-navy-700 mb-3">
                {c.title}
              </h3>
              <p className="text-[14px] text-navy-600 leading-[1.8] font-light">
                {c.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-14 text-center">
          <Link
            href="/magazin"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-russet-500 text-white font-semibold text-sm rounded-full hover:bg-russet-600 transition-all shadow-[0_6px_20px_rgba(162,110,115,0.35)]"
          >
            Explore their work →
          </Link>
        </div>
      </section>
    </>
  );
}
