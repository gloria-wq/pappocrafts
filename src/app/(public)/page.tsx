import Link from "next/link";
import { Star, Quote, ChevronRight } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import SectionHeading from "@/components/SectionHeading";
import {
  getFeaturedProducts,
  getCategories,
  getArtisans,
  getRecentReviews,
} from "@/lib/get-data";

const VALUES = [
  {
    icon: "🤚",
    title: "100% Handmade",
    desc: "Fiecare obiect este creat manual de meșteșugari cu experiență.",
  },
  {
    icon: "🌿",
    title: "Materiale naturale",
    desc: "Lemn, cupru, rachită, textile — materii prime curate.",
  },
  {
    icon: "⚡",
    title: "Livrare 24-48h",
    desc: "Expediere rapidă prin curier în toată România.",
  },
  {
    icon: "🎨",
    title: "Personalizare",
    desc: "Personalizări unice, adaptate dorințelor tale.",
  },
];

const STATS = [
  { value: "4.96", label: "rating mediu", extra: "★★★★★", teal: false },
  { value: "77+", label: "recenzii reale", extra: null, teal: false },
  { value: "100%", label: "handmade", extra: null, teal: true },
  { value: "24-48h", label: "livrare națională", extra: null, teal: false },
];

export default async function HomePage() {
  const [featured, categories, artisans, reviews] = await Promise.all([
    getFeaturedProducts(),
    getCategories(),
    getArtisans(),
    getRecentReviews(),
  ]);

  return (
    <>
      {/* ─── HERO ─── */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="relative z-10 max-w-[1200px] mx-auto w-full px-7 pt-[120px] pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Content */}
            <div>
              <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-teal-500/20 text-white text-[11px] font-bold uppercase tracking-[0.2em] mb-6 backdrop-blur-sm border border-teal-400/30">
                ✦ Din inima meșterilor români
              </span>
              <h1 className="text-[clamp(36px,5vw,64px)] font-bold leading-[1.12] mb-5 drop-shadow-md">
                <em className="text-[#FDD2BC] italic font-[var(--font-heading)] not-italic">
                  Meșteșugul tradițional
                </em>
                <br />
                <em className="text-[#FDD2BC] not-italic">
                  adus în casa ta
                </em>
              </h1>
              <p className="text-white text-[16px] leading-[1.75] max-w-[480px] mb-8 font-light drop-shadow-sm">
                Descoperă obiecte unice lucrate manual din materiale naturale.
                Fiecare produs poartă povestea unui meșter și sufletul tradiției
                autentice.
              </p>
              <div className="flex flex-wrap gap-3 items-center">
                <Link
                  href="/magazin"
                  className="inline-flex items-center gap-2 px-7 py-3 bg-teal-500 text-white font-semibold text-sm rounded-full hover:bg-teal-600 transition-all shadow-[0_4px_16px_rgba(0,190,198,0.35)]"
                >
                  Explorează colecția
                </Link>
                <Link
                  href="https://pappocrafts.ro"
                  target="_blank"
                  className="inline-flex items-center gap-1.5 px-6 py-3 text-sm font-semibold text-navy-700 bg-white/60 backdrop-blur-sm border border-white/50 rounded-full hover:bg-white/80 transition-all"
                >
                  Site original →
                </Link>
              </div>
            </div>

            {/* Right: Stat cards */}
            <div className="grid grid-cols-2 gap-4 max-w-[420px] lg:ml-auto">
              {STATS.map((s) => (
                <div
                  key={s.label}
                  className={`rounded-2xl p-6 text-center border backdrop-blur-md transition-shadow hover:shadow-lg ${
                    s.teal
                      ? "bg-teal-500/20 border-teal-300/50"
                      : "bg-white/60 border-white/50"
                  }`}
                >
                  <div
                    className={`text-[32px] font-bold leading-none mb-1 font-[var(--font-heading)] ${
                      s.teal ? "text-teal-700" : "text-navy-700"
                    }`}
                  >
                    {s.value}
                  </div>
                  {s.extra && (
                    <div className="text-amber-500 text-[13px] mb-1">
                      {s.extra}
                    </div>
                  )}
                  <div className="text-[12px] text-navy-500 font-medium">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── VALUES BAR ─── */}
      <section className="py-14">
        <div className="max-w-[1200px] mx-auto px-7 grid grid-cols-2 lg:grid-cols-4 gap-5">
          {VALUES.map((v) => (
            <div
              key={v.title}
              className="bg-white/60 backdrop-blur-md rounded-2xl p-6 border border-white/50 hover:shadow-lg transition-all hover:bg-white/75"
            >
              <span className="text-2xl block mb-3">{v.icon}</span>
              <h3 className="text-[14px] font-bold text-navy-700 mb-1.5 font-[var(--font-body)]">
                {v.title}
              </h3>
              <p className="text-[12px] text-navy-500 font-light leading-relaxed">
                {v.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── FEATURED PRODUCTS ─── */}
      <section className="max-w-[1200px] mx-auto px-7 py-24">
        <SectionHeading
          eyebrow="✦ Alese pentru tine"
          title="Favorite din Atelier"
          description="Piese în care suntem mândri. Fiecare e creată la comandă, cu materiale naturale."
        />
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link
            href="/magazin"
            className="inline-flex items-center gap-2 text-navy-700 font-semibold text-sm hover:text-russet-500 transition-colors"
          >
            Vezi toate produsele <ChevronRight size={15} />
          </Link>
        </div>
      </section>

      {/* ─── STORY SECTION ─── */}
      <section className="py-24">
        <div className="max-w-[1200px] mx-auto px-7 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="aspect-[3/4] bg-warm-200/60 backdrop-blur-sm rounded-2xl border border-white/40" />
              <div className="aspect-[3/4] bg-warm-300/40 backdrop-blur-sm rounded-2xl border border-white/40" />
            </div>
            <div className="absolute -bottom-5 -right-5 bg-russet-500 text-white rounded-2xl px-6 py-5 text-center shadow-[0_12px_40px_rgba(162,110,115,0.4)] z-10">
              <div className="text-[42px] font-bold leading-none font-[var(--font-heading)]">8+</div>
              <div className="text-[11px] opacity-85 mt-1 tracking-[0.05em]">Ani de<br />Meșteșug</div>
            </div>
          </div>

          <div className="pl-0 lg:pl-4">
            <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-russet-500 block mb-2.5">
              ✦ Povestea noastră
            </span>
            <h2 className="text-[clamp(26px,3.8vw,42px)] font-bold text-navy-700 leading-[1.15] mb-6">
              Un studio mic cu<br />
              <em className="text-russet-500 not-italic">o inimă mare.</em>
            </h2>
            <p className="text-navy-600 text-[15px] leading-[1.85] font-light mb-4">
              PappoCrafts s-a născut dintr-o convingere simplă: meșteșugul
              tradițional românesc merită să trăiască. Nu în muzee — ci în
              casele oamenilor, în bucătării, pe mese, în viața de zi cu zi.
            </p>
            <p className="text-navy-600 text-[15px] leading-[1.85] font-light mb-8">
              Folosim materii prime curate: lemn de tei, cupru alimentar cu
              puritate de 99,97%, răchită naturală. Fiecare obiect a trecut
              prin mâinile unui meșter — niciodată printr-o fabrică.
            </p>
            <div className="flex flex-wrap gap-4 items-center">
              <Link
                href="/despre-noi"
                className="inline-flex items-center gap-2 px-[30px] py-[13px] bg-russet-500 text-white font-semibold text-sm rounded-full hover:bg-russet-600 transition-all shadow-[0_6px_20px_rgba(162,110,115,0.3)]"
              >
                Citește povestea
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy-700 hover:text-russet-500 transition-colors"
              >
                Contactează-ne <ChevronRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CATEGORIES ─── */}
      <section className="max-w-[1200px] mx-auto px-7 py-24">
        <SectionHeading
          eyebrow="✦ Tradiție vie"
          title="Explorează pe Categorii"
          description="Materiale naturale, mâini dibace, meșteșug autentic."
        />
        <div className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/produse/${cat.slug}`}
              className="group bg-white/60 backdrop-blur-md rounded-2xl p-6 border border-white/50 hover:border-russet-300 hover:shadow-lg hover:bg-white/80 transition-all text-center"
            >
              <span className="text-3xl block mb-3">{cat.icon ?? "📦"}</span>
              <h3 className="font-semibold text-navy-700 group-hover:text-russet-500 transition-colors text-sm">
                {cat.name}
              </h3>
              <p className="text-[12px] text-navy-500 mt-1 font-light">
                {cat.description}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* ─── ARTISANS ─── */}
      <section className="py-24">
        <div className="max-w-[1200px] mx-auto px-7">
          <SectionHeading
            eyebrow="✦ Mâinile care creează"
            title="Meșterii Noștri"
            description="Parteneri, prieteni, oameni care pun suflet în ceea ce fac."
          />
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {artisans.map((a) => (
              <div
                key={a.id}
                className="bg-white/60 backdrop-blur-md rounded-2xl p-6 border border-white/50 text-center hover:bg-white/75 transition-all"
              >
                <div className="w-20 h-20 rounded-full bg-russet-50 mx-auto flex items-center justify-center text-2xl font-bold text-russet-500">
                  {a.name.charAt(0)}
                </div>
                <h3 className="mt-4 font-semibold text-navy-700 text-sm">{a.name}</h3>
                <p className="text-[12px] text-teal-600 font-semibold mt-1">{a.role}</p>
                {a.quote && (
                  <blockquote className="mt-4 text-[13px] text-navy-500 italic leading-relaxed font-light">
                    <Quote size={12} className="inline mr-1 text-russet-300" />
                    {a.quote}
                  </blockquote>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── REVIEWS ─── */}
      {reviews.length > 0 && (
        <section className="max-w-[1200px] mx-auto px-7 py-24">
          <SectionHeading
            eyebrow="✦ Părerea clienților"
            title="Ce spun clienții noștri"
          />
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {reviews.map((r) => (
              <div
                key={r.id}
                className="bg-white/60 backdrop-blur-md rounded-2xl p-5 border border-white/50 hover:bg-white/75 transition-all"
              >
                <div className="flex items-center gap-0.5 mb-3 text-amber-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={13}
                      className={i < r.rating ? "fill-amber-400" : "text-warm-200 fill-warm-200"}
                    />
                  ))}
                </div>
                {r.content && (
                  <p className="text-[13px] text-navy-600 line-clamp-3 mb-4 font-light leading-relaxed">
                    {r.content}
                  </p>
                )}
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-russet-50 flex items-center justify-center text-[11px] font-bold text-russet-500">
                    {r.author_name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-[13px] font-semibold text-navy-700">{r.author_name}</p>
                    {r.verified && (
                      <p className="text-[10px] text-teal-600 font-semibold">proprietar verificat</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ─── NEWSLETTER ─── */}
      <section className="py-20 px-6 text-center">
        <div className="max-w-2xl mx-auto bg-russet-500/90 backdrop-blur-md rounded-3xl px-8 py-14 border border-russet-400/30 shadow-2xl">
          <h2 className="text-white text-[clamp(26px,4vw,38px)] font-bold mb-3">
            Fii primul care află de noutăți
          </h2>
          <p className="text-white/75 text-[15px] max-w-[480px] mx-auto mb-8 font-light">
            Abonează-te și primești oferte speciale, produse noi și povești din
            atelierele meșterilor noștri.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Adresa ta de email"
              className="flex-1 min-w-[200px] px-5 py-[13px] rounded-full border border-white/30 bg-white/15 text-white placeholder-white/50 text-[13px] outline-none focus:border-white/60"
            />
            <button className="px-6 py-[13px] rounded-full bg-white text-russet-600 font-bold text-[13px] hover:bg-warm-100 transition-colors">
              Abonează-te
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
