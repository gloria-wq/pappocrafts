import type { Metadata } from "next";
import { CartProvider } from "@/context/CartContext";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "PappoCrafts - Meștesugul tradițional adus în casa ta",
    template: "%s | PappoCrafts",
  },
  description:
    "Obiecte unice, lucrate manual din materiale naturale. Fiecare produs poartă povestea unui meșter și sufletul tradiției românești autentice.",
  keywords: [
    "meșteșug tradițional",
    "produse artizanale",
    "handmade România",
    "rachită",
    "cupru",
    "lemn",
    "PappoCrafts",
  ],
  openGraph: {
    type: "website",
    locale: "ro_RO",
    siteName: "PappoCrafts",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ro">
      <body className="antialiased">
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
