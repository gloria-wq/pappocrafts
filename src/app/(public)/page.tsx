import Link from "next/link";
import { Hand, Leaf, Palette, Truck, Star, Quote } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import SectionHeading from "@/components/SectionHeading";
import { getFeaturedProducts, getCategories, getArtisans, getRecentReviews } from "@/lib/get-data";

export default async function HomePage() {
  const [featured, categories, artisans, reviews] = await Promise.all([
    getFeaturedProducts(),
    getCategories(),
    getArtisans(),
    getRecentReviews(),
  ]);

  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-brand-50 via-earth-50 to-brand-100 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-64 h-64 bg-brand-300 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-20 w-96 h-96 bg-brand-200 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-36">
          <p className="text-sm font-semibold text-brand-600 uppercase tracking-widest mb-4">
            din inima meșterilor români
          </p>
          <h1 className="text-4xl md:text-6xl font-bold text-earth-900 leading-tight max-w-3xl">
            Meșteșugul tradițional{" "}
            <span className="text-brand-600">adus în casa ta</span>
          </h1>
          <p className="mt-6 text-lg text-earth-600 max-w-xl leading-relaxed">
            Obiecte unice, lucrate manual din materiale naturale. Fiecare produs
            poartă povestea unui meșter și sufletul tradiției românești autentice.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/magazin"
              className="px-8 py-3.5 bg-brand-600 text-white font-semibold rounded-xl hover:bg-brand-700 transition-colors shadow-lg shadow-brand-600/20"
            >
              Explorează Magazinul
            </Link>
            <Link
              href="/despre-noi"
              className="px-8 py-3.5 bg-white text-brand-700 font-semibold rounded-xl hover:bg-brand-50 transition-colors border border-brand-200"
            >
              Despre Noi
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <SectionHeading
          eyebrow="Alese pentru tine"
          title="Produse Vedetă"
          description="Cele mai apreciate produse din atelierele noastre."
        />
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link
            href="/magazin"
            className="inline-flex items-center gap-2 text-brand-600 font-semibold hover:text-brand-700"
          >
            Vezi toate produsele &rarr;
          </Link>
        </div>
      </section>

      {/* USP Bar */}
      <section className="bg-white border-y border-earth-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: Hand, title: "Fabricat Manual", desc: "Fiecare obiect este confecționat manual de meșteri cu experiență" },
            { icon: Leaf, title: "Materiale Naturale", desc: "Lemn, cupru, rachită, textile — materii prime curate" },
            { icon: Palette, title: "Personalizare", desc: "Personalizăm obiectele în funcție de nevoile tale" },
            { icon: Truck, title: "Livrare Rapidă", desc: "Expediere prin curier în 24–48 de ore în toată România" },
          ].map((usp) => (
            <div key={usp.title} className="flex flex-col items-center text-center gap-3">
              <div className="w-12 h-12 rounded-full bg-brand-50 flex items-center justify-center">
                <usp.icon size={22} className="text-brand-600" />
              </div>
              <h3 className="font-semibold text-earth-800">{usp.title}</h3>
              <p className="text-sm text-earth-500">{usp.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <SectionHeading
          eyebrow="Tradiție vie"
          title="Explorează Produsele Tradiționale Românești"
          description="Materiale naturale, mâini dibace, meșteșug autentic transmis din generație în generație."
        />
        <div className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/produse/${cat.slug}`}
              className="group relative bg-white rounded-xl p-6 border border-earth-100 hover:border-brand-200 hover:shadow-md transition-all text-center"
            >
              <span className="text-3xl block mb-3">{cat.icon ?? "📦"}</span>
              <h3 className="font-semibold text-earth-800 group-hover:text-brand-600 transition-colors">
                {cat.name}
              </h3>
              <p className="text-xs text-earth-500 mt-1">{cat.description}</p>
            </Link>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link
            href="/produse"
            className="inline-flex items-center gap-2 text-brand-600 font-semibold hover:text-brand-700"
          >
            Explorează toate categoriile &rarr;
          </Link>
        </div>
      </section>

      {/* About Snippet */}
      <section className="bg-brand-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-sm font-semibold text-brand-600 uppercase tracking-wider mb-2">
              100% Handmade
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-earth-900">Despre Noi</h2>
            <p className="mt-6 text-earth-600 leading-relaxed">
              Readucem meșteșugul tradițional românesc în contemporaneitate.
              Produsele noastre sunt concepute pentru a satisface nevoile
              contemporane de reconectare la natură și de protejare a mediului.
              Folosim materii prime curate și de cea mai bună calitate.
            </p>
            <p className="mt-4 text-earth-600 leading-relaxed">
              Acoperim o gamă largă de materiale: lemn, cupru, argint, alamă,
              rachită, alun, textile, piele. Suntem promotori ai utilului, ai
              tradiționalului românesc autentic, ai esteticului.
            </p>
            <p className="mt-6 font-medium text-earth-700 italic">
              — Echipa PappoCrafts
            </p>
            <Link
              href="/despre-noi"
              className="inline-block mt-6 px-6 py-3 bg-brand-600 text-white font-semibold rounded-xl hover:bg-brand-700 transition-colors"
            >
              Citește povestea noastră
            </Link>
          </div>
        </div>
      </section>

      {/* Artisans */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <SectionHeading
          eyebrow="Arta mâinilor dibace"
          title="Meșterii Noștri la Lucru"
          description="Privește cum iau naștere obiectele tradiționale, direct din atelierele meșterilor populari."
        />
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {artisans.map((a) => (
            <div
              key={a.id}
              className="bg-white rounded-xl p-6 border border-earth-100 text-center"
            >
              <div className="w-20 h-20 rounded-full bg-brand-100 mx-auto flex items-center justify-center text-2xl font-bold text-brand-700">
                {a.name.charAt(0)}
              </div>
              <h3 className="mt-4 font-semibold text-earth-800">{a.name}</h3>
              <p className="text-sm text-brand-600 mt-1">{a.role}</p>
              {a.quote && (
                <blockquote className="mt-4 text-sm text-earth-500 italic leading-relaxed">
                  <Quote size={14} className="inline mr-1 text-brand-300" />
                  {a.quote}
                </blockquote>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Reviews */}
      {reviews.length > 0 && (
        <section className="bg-white border-t border-earth-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <SectionHeading
              eyebrow="Părerea clienților"
              title="Ce spun clienții noștri"
            />
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {reviews.map((r) => (
                <div
                  key={r.id}
                  className="bg-earth-50 rounded-xl p-5 border border-earth-100"
                >
                  <div className="flex items-center gap-1 mb-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        className={
                          i < r.rating
                            ? "fill-amber-400 text-amber-400"
                            : "text-earth-200"
                        }
                      />
                    ))}
                  </div>
                  {r.content && (
                    <p className="text-sm text-earth-600 line-clamp-3 mb-3">
                      {r.content}
                    </p>
                  )}
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-brand-100 flex items-center justify-center text-xs font-bold text-brand-700">
                      {r.author_name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-earth-800">
                        {r.author_name}
                      </p>
                      {r.verified && (
                        <p className="text-[10px] text-green-600 font-medium">
                          proprietar verificat
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
