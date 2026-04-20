import Image from "next/image";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

const ARTISANS = [
  {
    videoId: "aVnEuYlon-4",
    name: "Stingaciu Iordan",
    role: "Meșter popular",
    quote: "Autenticitatea și puritatea trăirii, sinceritatea actului creator — asta definește meșteșugul nostru.",
  },
  {
    videoId: "DP-SLjk3A_Y",
    name: "Stingaciu Ion",
    role: "Meșter popular",
    quote: "Tușa, uneori onctuoasă, alteori rafinată, contribuie la unitatea imaginii fiecărui obiect.",
  },
  {
    videoId: "K-sz3DfcWsw",
    name: "Raduly Janos",
    role: "Meșter popular",
    quote: "Culoarea este modulată cu tente prețioase, printr-o luminiscență aparte.",
  },
  {
    videoId: "trZOsHycUT4",
    name: "Victor Clopotar",
    role: "Meșter popular",
    quote: "Când îl întrebi cum a învățat meșteșugul, îți răspunde senin: Așa m-am născut!",
  },
];

const CARDS = [
  {
    icon: "/icons/responsible.png",
    label: "responsible",
    title: "Tradiție meșteșugărească",
    desc: "Fiecare piesă este modelată manual, purtând secole de meșteșug românesc transmis din generație în generație.",
  },
  {
    icon: "/icons/natural.png",
    label: "natural",
    title: "Materiale naturale",
    desc: "Lucrăm exclusiv cu lemn de tei, cupru de 99,97% puritate, răchită naturală și textile organice — nimic artificial.",
  },
  {
    icon: "/icons/handmade.png",
    label: "handmade",
    title: "Făcut cu grijă",
    desc: "Fiecare obiect necesită ore, uneori zile de muncă. Acel timp și acea intenție se simt când ții în mâini o piesă PappoCrafts.",
  },
];

export default function ArtisansPage() {
  return (
    <>
      {/* ─── HERO ─── */}
      <section className="pt-[140px] pb-20 px-7 max-w-[860px] mx-auto">
        {/* Back link — left aligned */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-white/80 hover:text-white transition-colors"
          >
            <ChevronLeft size={15} /> Înapoi acasă
          </Link>
        </div>

        <div className="text-center">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-teal-500/20 text-white text-[11px] font-bold uppercase tracking-[0.2em] mb-6 backdrop-blur-sm border border-teal-400/30">
            ✦ Din inima meșterilor români
          </span>
          <h1 className="text-[clamp(36px,5vw,60px)] font-bold leading-[1.1] mb-6 drop-shadow-md" style={{ color: "#FDD2BC" }}>
            Cunoaște-i pe meșterii noștri
          </h1>
          <p className="text-white text-[17px] leading-[1.8] font-light max-w-[580px] mx-auto">
            În spatele fiecărui obiect PappoCrafts se află o persoană — un meșter care
            a dedicat ani întregi pentru a-și perfecționa arta. Acestea sunt poveștile
            lor, mâinile lor și pasiunea lor pentru a păstra vie tradiția românească.
          </p>
        </div>
      </section>

      {/* ─── ARTISAN VIDEOS ─── */}
      <section className="max-w-[1100px] mx-auto px-7 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {ARTISANS.map((a) => (
            <div key={a.videoId} className="flex flex-col gap-5">
              <div className="rounded-2xl overflow-hidden shadow-[0_16px_48px_rgba(0,0,0,0.25)] border border-white/20">
                {/* Replace this video with the real artisans video */}
                <iframe
                  src={`https://www.youtube.com/embed/${a.videoId}`}
                  title={`${a.name} — ${a.role}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full aspect-video"
                />
              </div>
              <div className="bg-white/60 backdrop-blur-md rounded-2xl px-6 py-5 border border-white/50">
                <p className="text-[15px] font-bold text-navy-700">{a.name}</p>
                <p className="text-[12px] text-teal-600 font-semibold mb-3">{a.role}</p>
                <blockquote className="text-[14px] text-navy-600 italic leading-[1.75] font-light border-l-2 border-russet-300 pl-4">
                  &bdquo;{a.quote}&rdquo;
                </blockquote>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── THREE CARDS ─── */}
      <section className="max-w-[1100px] mx-auto px-7 pb-28">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CARDS.map((c) => (
            <div
              key={c.title}
              className="bg-white/60 backdrop-blur-md rounded-2xl p-8 border border-white/50 hover:bg-white/75 hover:shadow-xl transition-all flex flex-col items-center text-center"
            >
              {/* Brand icon — mix-blend-mode:multiply removes the colored background */}
              <div className="mb-5 w-[88px] h-[88px] relative">
                <Image
                  src={c.icon}
                  alt={c.label}
                  fill
                  className="object-contain"
                  style={{ mixBlendMode: "multiply" }}
                />
              </div>
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-russet-400 mb-2">
                {c.label}
              </p>
              <h3 className="text-[16px] font-bold text-navy-700 mb-3">{c.title}</h3>
              <p className="text-[13px] text-navy-600 leading-[1.8] font-light">{c.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-14 text-center">
          <Link
            href="/magazin"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-russet-500 text-white font-semibold text-sm rounded-full hover:bg-russet-600 transition-all shadow-[0_6px_20px_rgba(162,110,115,0.35)]"
          >
            Explorează lucrările lor →
          </Link>
        </div>
      </section>
    </>
  );
}
