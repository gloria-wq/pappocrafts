import { Quote } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import { getArtisans } from "@/lib/get-data";

export const metadata = {
  title: "Despre Noi",
  description: "PappoCrafts - Readucem meșteșugul tradițional românesc în contemporaneitate.",
};

const MATERIALS = [
  { icon: "🌳", name: "Lemn", detail: "Tei, fag, cireș, salcie, nuc" },
  { icon: "🔔", name: "Cupru", detail: "Alimentar, 99,97% puritate" },
  { icon: "🪶", name: "Răchită", detail: "Naturală, împletită manual" },
  { icon: "🍵", name: "Ceramică", detail: "Corund, Horezu, lut ars" },
  { icon: "🧵", name: "Textile", detail: "Bumbac, lână, țesături manuale" },
  { icon: "💼", name: "Piele", detail: "Naturală, prelucrare artizanală" },
];

const STEPS = [
  { num: "01", title: "Selectăm meșterul", desc: "Vizităm comunități de meșteșugari, le cunoaștem poveștile și le evaluăm munca. Lucrăm doar cu oameni care pun suflet în ceea ce fac." },
  { num: "02", title: "Materia primă, curată", desc: "Lemnul vine din păduri gestionate. Cuprul are puritate 99,97%. Rachița este recoltată manual. Nu acceptăm compromisuri la calitatea materialului." },
  { num: "03", title: "Confecționarea manuală", desc: "Fiecare obiect ia naștere în atelierul meșterului, nu într-o fabrică. Tehnici transmise din tată în fiu, cu unelte simple și cu răbdare." },
  { num: "04", title: "Verificare și ambalare", desc: "Inspectăm fiecare produs. Îl fotografiem, îl descriem, îl ambalăm cu grijă. Tratăm fiecare colet ca pe un cadou." },
  { num: "05", title: "Livrăm în toată România", desc: "Expediere prin curier în 24-48 de ore. Produsul ajunge la tine exact cum a ieșit din mâinile meșterului." },
];

export default async function AboutPage() {
  const artisans = await getArtisans();

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-brand-50 to-earth-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <p className="text-sm font-semibold text-brand-600 uppercase tracking-widest mb-4">
            din inima meșterilor români
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-earth-900 leading-tight">
            Povestea <span className="text-brand-600">PappoCrafts</span>
          </h1>
          <p className="mt-6 text-lg text-earth-600 max-w-2xl mx-auto leading-relaxed">
            Nu vindem obiecte. Aducem în casele oamenilor fragmente dintr-o lume
            care refuză să dispară — lumea meșterilor populari români, a mâinilor
            care știu să transforme lemnul, cuprul și rachița în artă.
          </p>
        </div>
      </section>

      {/* Why */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <SectionHeading
          eyebrow="100% Lucrat Manual"
          title="De ce existăm"
        />
        <div className="mt-8 space-y-6 text-earth-600 leading-relaxed max-w-3xl mx-auto">
          <p>
            PappoCrafts s-a născut dintr-o convingere simplă: meșteșugul
            tradițional românesc merită să trăiască. Nu în muzee, nu în vitrine —
            ci în casele oamenilor, în bucătării, pe mese, în viața de zi cu zi.
          </p>
          <p>
            Suntem o platformă care leagă comunități de meșteșugari din toată
            România cu oameni care prețuiesc autenticitatea. Fiecare obiect de pe
            site-ul nostru a trecut prin mâinile unui meșter — niciodată printr-o
            fabrică.
          </p>
          <p>
            Folosim materii prime curate: lemn de tei, de fag, de cireș. Cupru
            alimentar cu puritate de 99,97%. Răchită naturală. Piele lucrată
            manual. Ceramică pictată cu motive transmise din generație în
            generație.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: "Autenticitate", desc: "Nu reinterpretăm tradiția, o păstrăm vie. Fiecare obiect respectă tehnicile transmise de generații întregi." },
            { title: "Sustenabilitate", desc: "Materiile noastre prime sunt regenerabile, locale, prelucrabile manual. Într-o lume a plasticului, alegem rachița și cuprul." },
            { title: "Comunitate", desc: "Lucrăm direct cu meșteșugari din sate, nu cu intermediari. Fiecare comandă sprijină familii care trăiesc din meșteșug." },
          ].map((v) => (
            <div key={v.title} className="bg-white rounded-xl p-6 border border-earth-100">
              <h3 className="font-semibold text-earth-800 mb-2">{v.title}</h3>
              <p className="text-sm text-earth-500">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Materials */}
      <section className="bg-white border-y border-earth-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <SectionHeading
            eyebrow="Ce ne definește"
            title="Materialele cu care lucrăm"
          />
          <div className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {MATERIALS.map((m) => (
              <div key={m.name} className="text-center">
                <span className="text-3xl block mb-2">{m.icon}</span>
                <h4 className="font-semibold text-earth-800">{m.name}</h4>
                <p className="text-xs text-earth-500 mt-1">{m.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Artisans */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <SectionHeading
          eyebrow="Mâinile care creează"
          title="Meșterii Noștri"
          description="Nu sunt angajați. Sunt parteneri, prieteni, oameni cu care împărtășim aceeași viziune."
        />
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {artisans.map((a) => (
            <div key={a.id} className="bg-white rounded-xl p-6 border border-earth-100">
              <div className="w-20 h-20 rounded-full bg-brand-100 mx-auto flex items-center justify-center text-2xl font-bold text-brand-700">
                {a.name.charAt(0)}
              </div>
              <h3 className="mt-4 text-center font-semibold text-earth-800">{a.name}</h3>
              <p className="text-center text-sm text-brand-600 mt-1">{a.role}</p>
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

      {/* Process */}
      <section className="bg-brand-50/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <SectionHeading
            eyebrow="De la atelier la tine"
            title="Cum ajunge un produs PappoCrafts la tine"
          />
          <div className="mt-12 space-y-8">
            {STEPS.map((s) => (
              <div key={s.num} className="flex gap-6 items-start">
                <div className="w-12 h-12 shrink-0 rounded-full bg-brand-600 text-white flex items-center justify-center font-bold text-sm">
                  {s.num}
                </div>
                <div>
                  <h3 className="font-semibold text-earth-800 text-lg">{s.title}</h3>
                  <p className="text-earth-600 mt-1">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h2 className="text-3xl font-bold text-earth-900">
          Fiecare obiect are o poveste.
          <br />
          <span className="text-brand-600">Vrei să o aduci acasă?</span>
        </h2>
        <p className="mt-4 text-earth-600">
          Explorează colecția noastră de produse artizanale românești,
          confecționate manual de meșteri din comunități tradiționale.
        </p>
        <a
          href="/magazin"
          className="inline-block mt-6 px-8 py-3.5 bg-brand-600 text-white font-semibold rounded-xl hover:bg-brand-700 transition-colors"
        >
          Explorează Magazinul
        </a>
        <p className="mt-4 text-sm text-earth-500 italic">— Echipa PappoCrafts</p>
      </section>
    </>
  );
}
