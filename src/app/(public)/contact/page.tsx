import { Phone, Mail, MapPin, Clock, Building } from "lucide-react";
import ContactForm from "./ContactForm";

export const metadata = {
  title: "Contact",
  description: "Contactează-ne pentru comenzi, întrebări sau colaborări.",
};

export default function ContactPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-earth-900">Contact</h1>
        <p className="mt-3 text-earth-600">
          Scrie-ne un mesaj și în cel mai scurt timp vei fi contactat(ă) de
          către unul din operatorii noștri.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <ContactForm />

        <div className="space-y-8">
          <div className="bg-white rounded-xl p-6 border border-earth-100">
            <h3 className="font-semibold text-earth-800 mb-4 flex items-center gap-2">
              <Building size={18} className="text-brand-600" />
              CSI Management and Research S.R.L.
            </h3>
            <dl className="space-y-3 text-sm text-earth-600">
              {[
                { label: "Cod Fiscal", value: "RO44678251" },
                { label: "Nr. Reg. Com", value: "J34/628/02.08.2021" },
                { label: "Capital Social", value: "200 RON" },
                { label: "Cont Bancar", value: "RO20RZBR0000060022876416" },
                { label: "Banca", value: "Raiffeisen Bank" },
              ].map((item) => (
                <div key={item.label} className="flex justify-between">
                  <dt className="font-medium text-earth-700">{item.label}</dt>
                  <dd>{item.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="bg-white rounded-xl p-6 border border-earth-100">
            <h3 className="font-semibold text-earth-800 mb-4">Informații Contact</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <Mail size={18} className="text-brand-600 mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium text-earth-700">Email</p>
                  <a href="mailto:office@pappocrafts.ro" className="text-brand-600 hover:underline">
                    office@pappocrafts.ro
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Phone size={18} className="text-brand-600 mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium text-earth-700">Telefon</p>
                  <a href="tel:0726344038" className="text-brand-600 hover:underline">
                    0726 344 038
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-brand-600 mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium text-earth-700">Adresă</p>
                  <p className="text-earth-600">
                    Comuna Blejești, Sat Blejești, Jud. Teleorman
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Clock size={18} className="text-brand-600 mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium text-earth-700">Program Suport</p>
                  <p className="text-earth-600">Luni – Vineri: 09:00 – 17:00</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
