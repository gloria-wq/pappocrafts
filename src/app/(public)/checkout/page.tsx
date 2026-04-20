import CheckoutForm from "./CheckoutForm";

export const metadata = { title: "Finalizare comandă" };

export default function CheckoutPage() {
  return (
    <div className="max-w-[1200px] mx-auto px-7 pt-[100px] pb-16">
      <h1 className="text-3xl font-bold mb-8" style={{ color: "#FDD2BC" }}>Finalizare comandă</h1>
      <CheckoutForm />
    </div>
  );
}
