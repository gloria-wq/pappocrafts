import CheckoutForm from "./CheckoutForm";

export const metadata = {
  title: "Finalizare comandă",
};

export default function CheckoutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-earth-900 mb-8">Finalizare comandă</h1>
      <CheckoutForm />
    </div>
  );
}
