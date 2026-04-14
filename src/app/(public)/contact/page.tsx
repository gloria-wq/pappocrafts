import { Phone, Mail, MapPin, Clock, Building } from "lucide-react";
import ContactForm from "./ContactForm";

export const metadata = {
  title: "Contact",
  description: "Contactează-ne pentru comenzi, întrebări sau colaborări.",
};

export default function ContactPage() {
  return (
    <>
      <section className="bg-navy-700 pt-[120px] pb-16 px-7 text-center">
        <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-russet-300 block mb-2.5">
          ✦ Contact
        </span>
        <h1 className="text-[clamp(32px,4.5vw,52px)] font-bold text-white">Contact</h1>
        <p className="text-warm-300/70 text-[15px] font-light mt-3 max-w-lg mx-auto">
          Scrie-ne un mesaj și vom reveni cu un răspuns cât mai rapid.
        </p>
      </section>

      <div className="max-w-[1200px] mx-auto px-7 py-12 grid grid-cols-1 lg:grid-cols-2 gap-12">
        <ContactForm />

        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-warm-300/40">
            <h3 className="font-semibold text-navy-700 mb-4 flex items-center gap-2 font-[var(--font-body)] text-sm">
              <Building size={16} className="text-russet-500" />
              CSI Management and Research S.R.L.
            </h3>
            <dl className="space-y-3 text-[13px] text-navy-500 font-light">
              {[
                { label: "Cod Fiscal", value: "RO44678251" },
                { label: "Nr. Reg. Com", value: "J34/628/02.08.2021" },
                { label: "Capital Social", value: "200 RON" },
                { label: "Cont Bancar", value: "RO20RZBR0000060022876416" },
                { label: "Banca", value: "Raiffeisen Bank" },
              ].map((item) => (
                <div key={item.label} className="flex justify-between">
                  <dt className="font-medium text-navy-700">{item.label}</dt>
                  <dd>{item.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-warm-300/40">
            <h3 className="font-semibold text-navy-700 mb-4 font-[var(--font-body)] text-sm">
              Informații Contact
            </h3>
            <ul className="space-y-4 text-[13px]">
              {[
                { icon: Mail, label: "Email", value: "office@pappocrafts.ro", href: "mailto:office@pappocrafts.ro" },
                { icon: Phone, label: "Telefon", value: "0726 344 038", href: "tel:0726344038" },
                { icon: MapPin, label: "Adresă", value: "Comuna Blejești, Jud. Teleorman" },
                { icon: Clock, label: "Program", value: "Luni – Vineri: 09:00 – 17:00" },
              ].map((item) => (
                <li key={item.label} className="flex items-start gap-3">
                  <item.icon size={16} className="text-russet-500 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-medium text-navy-700">{item.label}</p>
                    {item.href ? (
                      <a href={item.href} className="text-teal-500 hover:underline font-light">{item.value}</a>
                    ) : (
                      <p className="text-navy-400 font-light">{item.value}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
