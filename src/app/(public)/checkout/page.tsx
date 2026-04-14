import CheckoutForm from "./CheckoutForm";

export const metadata = { title: "Finalizare comandă" };

export default function CheckoutPage() {
  return (
    <div className="max-w-[1200px] mx-auto px-7 pt-[100px] pb-16">
      <h1 className="text-3xl font-bold text-navy-700 mb-8">Finalizare comandă</h1>
      <CheckoutForm />
    </div>
  );
}
