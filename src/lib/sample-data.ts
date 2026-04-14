import type { Product, Category, Artisan, Review } from "@/types";

export const sampleCategories: Category[] = [
  { id: "c1", name: "Rachită și Papură", slug: "rachita-si-papura", description: "Coșuri, decorațiuni, obiecte utile", image_url: null, icon: "🪶", parent_id: null, sort_order: 1, created_at: "" },
  { id: "c2", name: "Cupru", slug: "cupru", description: "Ceaune, căldări, obiecte de artă", image_url: null, icon: "🔔", parent_id: null, sort_order: 2, created_at: "" },
  { id: "c3", name: "Lemn", slug: "lemn", description: "Ustensile, decorațiuni, mobilier", image_url: null, icon: "🌳", parent_id: null, sort_order: 3, created_at: "" },
  { id: "c4", name: "Cadouri și Seturi", slug: "cadouri", description: "Seturi unice, gata de oferit", image_url: null, icon: "🎁", parent_id: null, sort_order: 4, created_at: "" },
  { id: "c5", name: "Fashion și Accesorii", slug: "fashion-si-accesorii", description: "Perne, textile, accesorii", image_url: null, icon: "🧵", parent_id: null, sort_order: 5, created_at: "" },
  { id: "c6", name: "Ceramică și Sticlă", slug: "ceramica-si-sticla", description: "Străchini, vase, obiecte decorative", image_url: null, icon: "🍵", parent_id: null, sort_order: 6, created_at: "" },
];

export const sampleProducts: Product[] = [
  { id: "p1", name: "Coș Mediu Clasic Din Rachită Împletită Manual", slug: "cos-mediu-rachita", description: "Coș din rachită împletită manual, ideal pentru depozitare legume, fructe și cumpărături.", price: 45, category_id: "c1", images: [], rating_avg: 4.5, review_count: 12, featured: true, in_stock: true, artisan_id: "a1", created_at: "" },
  { id: "p2", name: "Coș Rachită cu Toartă – Împletit Manual", slug: "cos-rachita-toarta", description: "Coș din rachită cu toartă, perfect pentru depozitare sau cadou.", price: 60, category_id: "c1", images: [], rating_avg: 4.5, review_count: 8, featured: true, in_stock: true, artisan_id: "a1", created_at: "" },
  { id: "p3", name: "Lingură Din Lemn De Tei Confecționată Manual", slug: "lingura-lemn-tei", description: "Produs tradițional românesc util în bucătărie, confecționat manual din lemn de tei.", price: 5, category_id: "c3", images: [], rating_avg: 5.0, review_count: 15, featured: true, in_stock: true, artisan_id: "a2", created_at: "" },
  { id: "p4", name: "Scaun Din Lemn Masiv Confecționat Manual", slug: "scaun-lemn-masiv", description: "Scaun din lemn de salcie, confecționat manual, potrivit pentru interior și exterior.", price: 90, category_id: "c3", images: [], rating_avg: 5.0, review_count: 6, featured: true, in_stock: true, artisan_id: "a2", created_at: "" },
  { id: "p5", name: "Coș Împletit Din Rachită Pentru Carat Lemne", slug: "cos-rachita-lemne", description: "Coș robust din rachită, ideal pentru carat lemne sau cereale.", price: 110, category_id: "c1", images: [], rating_avg: 4.8, review_count: 10, featured: true, in_stock: true, artisan_id: "a1", created_at: "" },
  { id: "p6", name: "Zurzălăi Din Bronz, Set 3 Bucăți", slug: "zurзalai-bronz", description: "Bijuterii de artă și sunet, set de 3 bucăți din bronz.", price: 75, category_id: "c2", images: [], rating_avg: 5.0, review_count: 4, featured: true, in_stock: true, artisan_id: "a4", created_at: "" },
  { id: "p7", name: "Roată Decorativă din Lemn 40 cm", slug: "roata-decorativa-lemn", description: "Farmec rustic și eleganță autentică, diametru 40 cm.", price: 90, category_id: "c3", images: [], rating_avg: 4.7, review_count: 3, featured: true, in_stock: true, artisan_id: "a2", created_at: "" },
  { id: "p8", name: "Ibric din Cupru Masiv pentru Cafea Turcească", slug: "ibric-cupru-cafea", description: "Forjat manual, cu capac, din cupru alimentar cu puritate de 99,97%.", price: 400, category_id: "c2", images: [], rating_avg: 4.9, review_count: 7, featured: true, in_stock: true, artisan_id: "a4", created_at: "" },
  { id: "p9", name: "Planșetă din Lemn pentru Aluat", slug: "planseta-lemn-aluat", description: "Planșetă din lemn de brad cu plintă stabilizatoare.", price: 110, category_id: "c3", images: [], rating_avg: 4.6, review_count: 9, featured: false, in_stock: true, artisan_id: "a2", created_at: "" },
  { id: "p10", name: "Set Cadou Tradițional Românesc", slug: "set-cadou-traditional", description: "Set aranjat cu grijă și ambalat festiv, cu produse artizanale românești.", price: 180, category_id: "c4", images: [], rating_avg: 5.0, review_count: 5, featured: false, in_stock: true, artisan_id: null, created_at: "" },
  { id: "p11", name: "Mărțișor din Pâslă tip Broșă", slug: "martisor-pasla-brosa", description: "Lucrat manual, simbol delicat al primăverii.", price: 30, category_id: "c5", images: [], rating_avg: 4.8, review_count: 11, featured: false, in_stock: true, artisan_id: null, created_at: "" },
  { id: "p12", name: "Coș Rachită Fără Toartă", slug: "cos-rachita-fara-toarta", description: "Confecționat manual, pentru depozitat legume, fructe și produse de patiserie.", price: 60, category_id: "c1", images: [], rating_avg: 4.3, review_count: 2, featured: false, in_stock: true, artisan_id: "a1", created_at: "" },
];

export const sampleArtisans: Artisan[] = [
  { id: "a1", name: "Cornel Sandu", role: "Împletitor de răchită", quote: "Autenticitatea și puritatea trăirii, sinceritatea actului creator — asta definește meșteșugul nostru.", image_url: null, sort_order: 1, created_at: "" },
  { id: "a2", name: "Dan Stingaciu", role: "Meșter popular", quote: "Rachița are viață în ea — trebuie doar să știi să o asculți.", image_url: null, sort_order: 2, created_at: "" },
  { id: "a3", name: "Răduly János", role: "Ceramist, Corund", quote: "Culoarea este modulată cu tente prețioase, printr-o luminiscență aparte.", image_url: null, sort_order: 3, created_at: "" },
  { id: "a4", name: "Traian Căldărar", role: "Meșter Căldărar", quote: "Cuprul ia formă sub ciocanul lui ca și cum ar fi fost întotdeauna acolo, așteptând să fie descoperit.", image_url: null, sort_order: 4, created_at: "" },
];

export const sampleReviews: Review[] = [
  { id: "r1", product_id: "p9", author_name: "Constantin-Dan Vlăduț", rating: 5, content: "Calitate excelentă, recomand cu încredere!", verified: true, created_at: new Date().toISOString() },
  { id: "r2", product_id: "p3", author_name: "Tudor Popescu", rating: 5, content: "Foarte bună lingura, exact ca la bunica.", verified: true, created_at: new Date().toISOString() },
  { id: "r3", product_id: "p2", author_name: "Celesta Nemțaru", rating: 5, content: "Produs minunat, livrat rapid.", verified: true, created_at: new Date().toISOString() },
  { id: "r4", product_id: "p5", author_name: "Tofana Alina", rating: 5, content: "Cosul este exact cum mi-am dorit, rezistent si frumos.", verified: true, created_at: new Date().toISOString() },
];
