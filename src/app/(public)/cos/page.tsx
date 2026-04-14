import CartView from "./CartView";

export const metadata = { title: "Coșul tău" };

export default function CartPage() {
  return (
    <div className="max-w-3xl mx-auto px-7 pt-[100px] pb-16">
      <h1 className="text-3xl font-bold text-navy-700 mb-8">Coșul tău</h1>
      <CartView />
    </div>
  );
}
