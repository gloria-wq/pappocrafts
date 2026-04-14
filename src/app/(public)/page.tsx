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
    icon: "✋",
    title: "100% Handmade",
    desc: "Fiecare obiect este creat manual de meșteșugari cu experiență.",
  },
  {
    icon: "🌿",
    title: "Materiale Naturale",
    desc: "Lemn, cupru, rachită — materii prime curate și locale.",
  },
  {
    icon: "🎨",
    title: "Personalizare",
    desc: "Personalizăm obiectele în funcție de nevoile tale unice.",
  },
  {
    icon: "📦",
    title: "Livrare Rapidă",
    desc: "Expediere prin curier în 24–48 ore în toată România.",
  },
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
      <section className="relative min-h-screen flex items-center overflow-hidden bg-navy-700">
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-navy-700/90 via-navy-700/65 to-navy-700/25" />
        <div className="relative z-10 max-w-[1200px] mx-auto w-full px-7 pt-[120px] pb-20">
          <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-teal-300 block mb-5">
            ✦ Meșteșug Autentic Românesc
          </span>
          <h1 className="text-[clamp(40px,5.5vw,70px)] text-white font-bold leading-[1.08] max-w-[620px] mb-5">
            Artizanat Românesc{" "}
            <em className="text-warm-300 not-italic">Reimaginat</em>
          </h1>
          <p className="text-warm-300/80 text-[17px] leading-[1.75] max-w-[480px] mb-10 font-light">
            Fiecare piesă spune o poveste — de la mâinile meșterului, direct în
            casa ta. Obiecte unice, create cu dragoste din materiale naturale.
          </p>
          <div className="flex flex-wrap gap-4 items-center">
            <Link
              href="/magazin"
              className="inline-flex items-center gap-2 px-[30px] py-[13px] bg-russet-500 text-white font-semibold text-sm rounded-full hover:bg-russet-600 transition-all shadow-[0_6px_20px_rgba(162,110,115,0.3)]"
            >
              Explorează Colecția
            </Link>
            <Link
              href="/despre-noi"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-white/70 hover:text-warm-300 transition-colors"
            >
              Povestea noastră <ChevronRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── VALUES BAR ─── */}
      <section className="bg-navy-700 py-14 border-t border-white/[0.06]">
        <div className="max-w-[1200px] mx-auto px-7 grid grid-cols-2 lg:grid-cols-4 gap-0">
          {VALUES.map((v, i) => (
            <div
              key={v.title}
              className={`text-center py-6 px-4 ${
                i < 3 ? "lg:border-r border-white/[0.06]" : ""
              }`}
            >
              <span className="text-2xl block mb-2">{v.icon}</span>
              <h3 className="text-[13px] font-bold text-white mb-1.5 font-[var(--font-body)]">
                {v.title}
              </h3>
              <p className="text-[12px] text-warm-300/50 font-light leading-relaxed">
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
      <section className="bg-warm-100 py-24">
        <div className="max-w-[1200px] mx-auto px-7 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: image grid with badge */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4 rounded-2xl overflow-hidden">
              <div className="aspect-[3/4] bg-warm-200 rounded-2xl" />
              <div className="aspect-[3/4] bg-warm-300/50 rounded-2xl" />
            </div>
            <div className="absolute -bottom-5 -right-5 bg-russet-500 text-white rounded-2xl px-6 py-5 text-center shadow-[0_12px_40px_rgba(162,110,115,0.4)] z-10">
              <div className="text-[42px] font-bold leading-none font-[var(--font-heading)]">
                8+
              </div>
              <div className="text-[11px] opacity-85 mt-1 tracking-[0.05em]">
                Ani de
                <br />
                Meșteșug
              </div>
            </div>
          </div>

          {/* Right: text */}
          <div className="pl-0 lg:pl-4">
            <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-russet-500 block mb-2.5">
              ✦ Povestea noastră
            </span>
            <h2 className="text-[clamp(26px,3.8vw,42px)] font-bold text-navy-700 leading-[1.15] mb-6">
              Un studio mic cu
              <br />
              <em className="text-russet-500 not-italic">o inimă mare.</em>
            </h2>
            <p className="text-navy-500 text-[15px] leading-[1.85] font-light mb-4">
              PappoCrafts s-a născut dintr-o convingere simplă: meșteșugul
              tradițional românesc merită să trăiască. Nu în muzee — ci în
              casele oamenilor, în bucătării, pe mese, în viața de zi cu zi.
            </p>
            <p className="text-navy-500 text-[15px] leading-[1.85] font-light mb-8">
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
              className="group bg-white rounded-2xl p-6 border border-warm-300/40 hover:border-russet-300 hover:shadow-lg transition-all text-center"
            >
              <span className="text-3xl block mb-3">{cat.icon ?? "📦"}</span>
              <h3 className="font-semibold text-navy-700 group-hover:text-russet-500 transition-colors text-sm">
                {cat.name}
              </h3>
              <p className="text-[12px] text-navy-400 mt-1 font-light">
                {cat.description}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* ─── ARTISANS ─── */}
      <section className="bg-warm-100 py-24">
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
                className="bg-white rounded-2xl p-6 border border-warm-300/40 text-center"
              >
                <div className="w-20 h-20 rounded-full bg-russet-50 mx-auto flex items-center justify-center text-2xl font-bold text-russet-500">
                  {a.name.charAt(0)}
                </div>
                <h3 className="mt-4 font-semibold text-navy-700 text-sm">
                  {a.name}
                </h3>
                <p className="text-[12px] text-teal-500 font-semibold mt-1">
                  {a.role}
                </p>
                {a.quote && (
                  <blockquote className="mt-4 text-[13px] text-navy-400 italic leading-relaxed font-light">
                    <Quote
                      size={12}
                      className="inline mr-1 text-russet-300"
                    />
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
                className="bg-white rounded-2xl p-5 border border-warm-300/40"
              >
                <div className="flex items-center gap-0.5 mb-3 text-amber-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={13}
                      className={
                        i < r.rating
                          ? "fill-amber-400"
                          : "text-warm-200 fill-warm-200"
                      }
                    />
                  ))}
                </div>
                {r.content && (
                  <p className="text-[13px] text-navy-500 line-clamp-3 mb-4 font-light leading-relaxed">
                    {r.content}
                  </p>
                )}
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-russet-50 flex items-center justify-center text-[11px] font-bold text-russet-500">
                    {r.author_name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-[13px] font-semibold text-navy-700">
                      {r.author_name}
                    </p>
                    {r.verified && (
                      <p className="text-[10px] text-teal-500 font-semibold">
                        proprietar verificat
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ─── NEWSLETTER ─── */}
      <section className="bg-russet-500 py-20 px-6 text-center">
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
      </section>
    </>
  );
}
