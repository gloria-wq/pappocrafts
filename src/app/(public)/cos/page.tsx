import CartView from "./CartView";

export const metadata = {
  title: "Coșul tău",
};

export default function CartPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-earth-900 mb-8">Coșul tău</h1>
      <CartView />
    </div>
  );
}
