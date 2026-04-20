import { Quote, ChevronRight, Trees, Zap, Leaf, Coffee, Shirt, Briefcase } from "lucide-react";
import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";
import { getArtisans } from "@/lib/get-data";

export const metadata = {
  title: "Despre Noi",
  description: "PappoCrafts - Readucem meșteșugul tradițional românesc în contemporaneitate.",
};

const MATERIALS = [
  { icon: Trees,    name: "Lemn",     detail: "Tei, fag, cireș, salcie, nuc" },
  { icon: Zap,      name: "Cupru",    detail: "Alimentar, 99,97% puritate" },
  { icon: Leaf,     name: "Răchită",  detail: "Naturală, împletită manual" },
  { icon: Coffee,   name: "Ceramică", detail: "Corund, Horezu, lut ars" },
  { icon: Shirt,    name: "Textile",  detail: "Bumbac, lână, țesături manuale" },
  { icon: Briefcase,name: "Piele",    detail: "Naturală, prelucrare artizanală" },
];

const STEPS = [
  { num: "01", title: "Selectăm meșterul", desc: "Vizităm comunități de meșteșugari, le cunoaștem poveștile și le evaluăm munca." },
  { num: "02", title: "Materia primă, curată", desc: "Lemnul vine din păduri gestionate. Cuprul are puritate 99,97%. Nu acceptăm compromisuri." },
  { num: "03", title: "Confecționarea manuală", desc: "Fiecare obiect ia naștere în atelierul meșterului, nu într-o fabrică." },
  { num: "04", title: "Verificare și ambalare", desc: "Inspectăm fiecare produs. Tratăm fiecare colet ca pe un cadou." },
  { num: "05", title: "Livrăm în toată România", desc: "Expediere prin curier în 24-48 ore, exact cum a ieșit din mâinile meșterului." },
];

export default async function AboutPage() {
  const artisans = await getArtisans();

  return (
    <>
      {/* Hero */}
      <section className="bg-navy-700 pt-[120px] pb-20 px-7 text-center">
        <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-russet-300 block mb-2.5">
          ✦ Despre PappoCrafts
        </span>
        <div className="marquee-track my-4">
          <span
            className="marquee-text text-[clamp(48px,7vw,80px)] font-bold leading-[1.08]"
            style={{ color: "#FDD2BC", fontFamily: "var(--font-heading)" }}
          >
            Povestea&nbsp;<em className="not-italic">PappoCrafts</em>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            Povestea&nbsp;<em className="not-italic">PappoCrafts</em>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </span>
        </div>
        <p className="text-warm-300/70 text-[17px] font-light mt-6 max-w-xl mx-auto leading-[1.75]">
          Nu vindem obiecte. Aducem în casele oamenilor fragmente dintr-o lume
          care refuză să dispară — lumea meșterilor populari români.
        </p>
      </section>

      {/* Why */}
      <section className="max-w-3xl mx-auto px-7 py-24 text-center">
        <SectionHeading eyebrow="✦ 100% Lucrat Manual" title="De ce existăm" light />
        <div className="mt-8 space-y-5 text-[15px] leading-[1.85] font-light" style={{ color: "#FDD2BC" }}>
          <p>
            PappoCrafts s-a născut dintr-o convingere simplă: meșteșugul
            tradițional românesc merită să trăiască. Nu în muzee, nu în vitrine —
            ci în casele oamenilor, în bucătării, pe mese, în viața de zi cu zi.
          </p>
          <p>
            Suntem o platformă care leagă comunități de meșteșugari din toată
            România cu oameni care prețuiesc autenticitatea. Fiecare obiect de pe
            site-ul nostru a trecut prin mâinile unui meșter — niciodată printr-o fabrică.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            { title: "Autenticitate", desc: "Nu reinterpretăm tradiția, o păstrăm vie." },
            { title: "Sustenabilitate", desc: "Materiile prime sunt regenerabile, locale, prelucrabile manual." },
            { title: "Comunitate", desc: "Lucrăm direct cu meșteșugari din sate." },
          ].map((v) => (
            <div key={v.title} className="bg-white rounded-2xl p-6 border border-warm-300/40">
              <h3 className="font-semibold text-navy-700 mb-2 font-[var(--font-body)] text-sm">{v.title}</h3>
              <p className="text-[13px] text-navy-400 font-light">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Materials */}
      <section className="bg-warm-100 py-24">
        <div className="max-w-[1200px] mx-auto px-7">
          <SectionHeading eyebrow="✦ Ce ne definește" title="Materialele cu care lucrăm" />
          <div className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {MATERIALS.map((m) => (
              <div key={m.name} className="text-center bg-white rounded-2xl p-5 border border-warm-300/40">
                <div className="w-10 h-10 rounded-xl bg-russet-50 flex items-center justify-center mx-auto mb-2">
                  <m.icon size={20} className="text-russet-500" />
                </div>
                <h4 className="font-semibold text-navy-700 text-sm">{m.name}</h4>
                <p className="text-[11px] text-navy-400 mt-1 font-light">{m.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Artisans */}
      <section className="max-w-[1200px] mx-auto px-7 py-24">
        <div className="text-center">
          <span className="text-[11px] font-bold uppercase tracking-[0.22em] block mb-2.5 text-teal-300">
            ✦ Mâinile care creează
          </span>
          <h2
            className="text-[clamp(26px,3.8vw,42px)] font-bold leading-[1.15]"
            style={{ color: "#FDD2BC" }}
          >
            Meșterii Noștri
          </h2>
          <p
            className="mt-3 text-[15px] font-light leading-relaxed max-w-lg mx-auto"
            style={{ color: "#FDD2BC" }}
          >
            Parteneri, prieteni, oameni care pun suflet.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {artisans.map((a) => (
            <div key={a.id} className="bg-white rounded-2xl p-6 border border-warm-300/40">
              <div className="w-20 h-20 rounded-full bg-russet-50 mx-auto flex items-center justify-center text-2xl font-bold text-russet-500">
                {a.name.charAt(0)}
              </div>
              <h3 className="mt-4 text-center font-semibold text-navy-700 text-sm">{a.name}</h3>
              <p className="text-center text-[12px] text-teal-500 font-semibold mt-1">{a.role}</p>
              {a.quote && (
                <blockquote className="mt-4 text-[13px] text-navy-400 italic leading-relaxed font-light text-center">
                  <Quote size={12} className="inline mr-1 text-russet-300" />
                  {a.quote}
                </blockquote>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="bg-warm-100 py-24">
        <div className="max-w-3xl mx-auto px-7">
          <SectionHeading eyebrow="✦ De la atelier la tine" title="Cum ajunge un produs la tine" />
          <div className="mt-12 space-y-8">
            {STEPS.map((s) => (
              <div key={s.num} className="flex gap-6 items-start">
                <div className="w-12 h-12 shrink-0 rounded-2xl bg-russet-500 text-white flex items-center justify-center font-bold text-sm shadow-[0_6px_20px_rgba(162,110,115,0.3)]">
                  {s.num}
                </div>
                <div>
                  <h3 className="font-semibold text-navy-700 text-[15px] font-[var(--font-body)]">{s.title}</h3>
                  <p className="text-navy-400 mt-1 text-[14px] font-light leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-russet-500 py-20 px-7 text-center">
        <h2 className="text-white text-[clamp(26px,4vw,38px)] font-bold mb-3">
          Fiecare obiect are o poveste.
        </h2>
        <p className="text-white/75 text-[15px] max-w-md mx-auto font-light mb-8">
          Explorează colecția noastră de produse artizanale românești.
        </p>
        <Link
          href="/magazin"
          className="inline-flex items-center gap-2 px-8 py-[14px] bg-white text-russet-600 font-bold text-sm rounded-full hover:bg-warm-100 transition-colors"
        >
          Explorează Magazinul <ChevronRight size={15} />
        </Link>
      </section>
    </>
  );
}
