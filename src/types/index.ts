export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image_url: string | null;
  parent_id: string | null;
  sort_order: number;
  icon: string | null;
  created_at: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price: number;
  category_id: string | null;
  images: string[];
  rating_avg: number;
  review_count: number;
  featured: boolean;
  in_stock: boolean;
  artisan_id: string | null;
  created_at: string;
  category?: Category;
  artisan?: Artisan;
}

export interface Artisan {
  id: string;
  name: string;
  role: string;
  quote: string | null;
  image_url: string | null;
  sort_order: number;
  created_at: string;
}

export interface Review {
  id: string;
  product_id: string;
  author_name: string;
  rating: number;
  content: string | null;
  verified: boolean;
  created_at: string;
  product?: Product;
}

export interface Order {
  id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  shipping_address: string;
  status: "pending" | "paid" | "confirmed" | "shipped" | "delivered" | "cancelled";
  payment_method: "card" | "ramburs";
  stripe_session_id: string | null;
  total: number;
  created_at: string;
  items?: OrderItem[];
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  quantity: number;
  unit_price: number;
  product?: Product;
}

export interface SiteContent {
  id: string;
  section: string;
  key: string;
  value: Record<string, unknown>;
  updated_at: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  read: boolean;
  created_at: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
