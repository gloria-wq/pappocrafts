-- Seed Categories
INSERT INTO categories (id, name, slug, description, icon, sort_order) VALUES
  ('c0000001-0000-0000-0000-000000000001', 'Rachită și Papură', 'rachita-si-papura', 'Coșuri, decorațiuni, obiecte utile', '🪶', 1),
  ('c0000001-0000-0000-0000-000000000002', 'Cupru', 'cupru', 'Ceaune, căldări, obiecte de artă', '🔔', 2),
  ('c0000001-0000-0000-0000-000000000003', 'Lemn', 'lemn', 'Ustensile, decorațiuni, mobilier', '🌳', 3),
  ('c0000001-0000-0000-0000-000000000004', 'Cadouri și Seturi', 'cadouri', 'Seturi unice, gata de oferit', '🎁', 4),
  ('c0000001-0000-0000-0000-000000000005', 'Fashion și Accesorii', 'fashion-si-accesorii', 'Perne, textile, accesorii', '🧵', 5),
  ('c0000001-0000-0000-0000-000000000006', 'Ceramică și Sticlă', 'ceramica-si-sticla', 'Străchini, vase, obiecte decorative', '🍵', 6),
  ('c0000001-0000-0000-0000-000000000007', 'Proiecte Speciale', 'proiecte-speciale', 'Produse unice disponibile', '⭐', 7)
ON CONFLICT (slug) DO NOTHING;

-- Seed Artisans
INSERT INTO artisans (id, name, role, quote, sort_order) VALUES
  ('a0000001-0000-0000-0000-000000000001', 'Cornel Sandu', 'Împletitor de răchită', 'Autenticitatea și puritatea trăirii, sinceritatea actului creator — asta definește meșteșugul nostru.', 1),
  ('a0000001-0000-0000-0000-000000000002', 'Dan Stingaciu', 'Meșter popular', 'Rachița are viață în ea — trebuie doar să știi să o asculți.', 2),
  ('a0000001-0000-0000-0000-000000000003', 'Răduly János', 'Ceramist, Corund', 'Culoarea este modulată cu tente prețioase, printr-o luminiscență aparte.', 3),
  ('a0000001-0000-0000-0000-000000000004', 'Traian Căldărar', 'Meșter Căldărar', 'Cuprul ia formă sub ciocanul lui ca și cum ar fi fost întotdeauna acolo, așteptând să fie descoperit.', 4)
ON CONFLICT DO NOTHING;

-- Seed Products
INSERT INTO products (name, slug, description, price, category_id, featured, in_stock, artisan_id, rating_avg, review_count) VALUES
  ('Coș Mediu Clasic Din Rachită Împletită Manual', 'cos-mediu-rachita', 'Coș clasic din rachită, ideal pentru depozitare legume, fructe și cumpărături.', 45.00, 'c0000001-0000-0000-0000-000000000001', true, true, 'a0000001-0000-0000-0000-000000000001', 4.50, 12),
  ('Coș Rachită cu Toartă – Împletit Manual', 'cos-rachita-toarta', 'Coș din rachită cu toartă, perfect pentru depozitare sau cadou.', 60.00, 'c0000001-0000-0000-0000-000000000001', true, true, 'a0000001-0000-0000-0000-000000000001', 4.50, 8),
  ('Lingură Din Lemn De Tei Confecționată Manual', 'lingura-lemn-tei', 'Produs tradițional românesc util în bucătărie.', 5.00, 'c0000001-0000-0000-0000-000000000003', true, true, 'a0000001-0000-0000-0000-000000000002', 5.00, 15),
  ('Scaun Din Lemn Masiv Confecționat Manual', 'scaun-lemn-masiv', 'Scaun din lemn de salcie, potrivit pentru interior și exterior.', 90.00, 'c0000001-0000-0000-0000-000000000003', true, true, 'a0000001-0000-0000-0000-000000000002', 5.00, 6),
  ('Coș Împletit Din Rachită Pentru Carat Lemne', 'cos-rachita-lemne', 'Coș robust din rachită, ideal pentru carat lemne sau cereale.', 110.00, 'c0000001-0000-0000-0000-000000000001', true, true, 'a0000001-0000-0000-0000-000000000001', 4.80, 10),
  ('Zurzălăi Din Bronz, Set 3 Bucăți', 'zurzalai-bronz', 'Bijuterii de artă și sunet, set de 3 bucăți din bronz.', 75.00, 'c0000001-0000-0000-0000-000000000002', true, true, 'a0000001-0000-0000-0000-000000000004', 5.00, 4),
  ('Roată Decorativă din Lemn 40 cm', 'roata-decorativa-lemn', 'Farmec rustic și eleganță autentică, diametru 40 cm.', 90.00, 'c0000001-0000-0000-0000-000000000003', true, true, 'a0000001-0000-0000-0000-000000000002', 4.70, 3),
  ('Ibric din Cupru Masiv pentru Cafea Turcească', 'ibric-cupru-cafea', 'Forjat manual, cu capac, din cupru alimentar cu puritate de 99,97%.', 400.00, 'c0000001-0000-0000-0000-000000000002', true, true, 'a0000001-0000-0000-0000-000000000004', 4.90, 7),
  ('Planșetă din Lemn pentru Aluat', 'planseta-lemn-aluat', 'Planșetă din lemn de brad cu plintă stabilizatoare.', 110.00, 'c0000001-0000-0000-0000-000000000003', false, true, 'a0000001-0000-0000-0000-000000000002', 4.60, 9),
  ('Set Cadou Tradițional Românesc – O Primăvară Fericită', 'set-cadou-primavara', 'Set aranjat cu grijă și ambalat festiv, cu produse artizanale românești.', 180.00, 'c0000001-0000-0000-0000-000000000004', false, true, NULL, 5.00, 5),
  ('Mărțișor din Pâslă tip Broșă', 'martisor-pasla-brosa', 'Lucrat manual, simbol delicat al primăverii.', 30.00, 'c0000001-0000-0000-0000-000000000005', false, true, NULL, 4.80, 11),
  ('Coș Rachită Fără Toartă', 'cos-rachita-fara-toarta', 'Confecționat manual, pentru depozitat legume, fructe și produse de patiserie.', 60.00, 'c0000001-0000-0000-0000-000000000001', false, true, 'a0000001-0000-0000-0000-000000000001', 4.30, 2),
  ('Coș oval din răchită cu mânere', 'cos-oval-rachita-manere', 'Încăpător, rezistent și ideal pentru plocon, colaci sau cadouri.', 85.00, 'c0000001-0000-0000-0000-000000000001', false, true, 'a0000001-0000-0000-0000-000000000001', 4.60, 3),
  ('Mărțișor din lemn pictat manual', 'martisor-lemn-pictat', 'Simbol tradițional al primăverii, pictat manual.', 10.00, 'c0000001-0000-0000-0000-000000000005', false, true, NULL, 4.90, 6),
  ('Set cadou tradițional românesc – delicii și bucurii', 'set-cadou-delicii', 'Set cu produse artizanale și delicatese tradiționale.', 100.00, 'c0000001-0000-0000-0000-000000000004', false, true, NULL, 4.70, 4),
  ('Copaie Lemn Manuală pentru Panificație', 'copaie-lemn-panificatie', 'Covată din lemn de salcie sau plută, ideală pentru frământat aluat.', 250.00, 'c0000001-0000-0000-0000-000000000003', false, true, 'a0000001-0000-0000-0000-000000000002', 4.40, 5),
  ('Măturică Lucrată Manual din Paie de Sorg', 'maturica-paie-sorg', 'Eficientă și sustenabilă, confecționată manual.', 25.00, 'c0000001-0000-0000-0000-000000000003', false, true, NULL, 4.80, 3),
  ('Față de Masă Țesută Manual cu Motive Tradiționale', 'fata-masa-tesuta-manual', 'Din bumbac natural, eleganță și tradiție pentru masa ta.', 150.00, 'c0000001-0000-0000-0000-000000000005', false, true, NULL, 4.50, 2),
  ('Vas Oval din Lemn 30 cm Confecționat Manual', 'vas-oval-lemn-30cm', 'Vas oval din lemn, confecționat manual în România.', 45.00, 'c0000001-0000-0000-0000-000000000003', false, true, 'a0000001-0000-0000-0000-000000000002', 5.00, 3),
  ('Ibric Cupru Alimentar 500 ml cu Mâner Lemn', 'ibric-cupru-500ml', 'Rezistent și manual, ibric din cupru alimentar.', 200.00, 'c0000001-0000-0000-0000-000000000002', false, true, 'a0000001-0000-0000-0000-000000000004', 4.90, 4),
  ('Prosop Tradițional Cusut Manual – Mic', 'prosop-traditional-mic', 'Prosop decorativ tradițional, cusut manual.', 35.00, 'c0000001-0000-0000-0000-000000000005', false, true, NULL, 5.00, 2)
ON CONFLICT (slug) DO NOTHING;

-- Seed Reviews
INSERT INTO reviews (product_id, author_name, rating, content, verified) VALUES
  ((SELECT id FROM products WHERE slug = 'planseta-lemn-aluat'), 'Constantin-Dan Vlăduț', 5, 'Calitate excelentă, recomand cu încredere!', true),
  ((SELECT id FROM products WHERE slug = 'maturica-paie-sorg'), 'Tudor Popescu', 5, 'Foarte bună măturica, exact ca la bunica.', true),
  ((SELECT id FROM products WHERE slug = 'ibric-cupru-500ml'), 'Celesta Nemțaru', 5, 'Produs minunat, livrat rapid.', true),
  ((SELECT id FROM products WHERE slug = 'prosop-traditional-mic'), 'Tofana Alina', 5, 'Calitate deosebită, un cadou perfect.', true),
  ((SELECT id FROM products WHERE slug = 'cos-mediu-rachita'), 'Maria Ionescu', 5, 'Coșul este superb, se vede că e lucrat manual cu grijă.', true),
  ((SELECT id FROM products WHERE slug = 'lingura-lemn-tei'), 'Ana Popa', 5, 'Lingura e ușoară și foarte practică, se simte calitatea lemnului.', true),
  ((SELECT id FROM products WHERE slug = 'ibric-cupru-cafea'), 'Andrei Marin', 5, 'Ibricul e o operă de artă, cafeaua iese perfectă.', true),
  ((SELECT id FROM products WHERE slug = 'cos-rachita-toarta'), 'Elena Dragomir', 4, 'Frumos coșul, toarta e solidă. Ușor asimetric dar asta îi dă farmec artizanal.', true);

-- Seed Site Content
INSERT INTO site_content (section, key, value) VALUES
  ('hero', 'main', '{"title": "Meșteșugul tradițional adus în casa ta", "subtitle": "din inima meșterilor români", "description": "Obiecte unice, lucrate manual din materiale naturale. Fiecare produs poartă povestea unui meșter și sufletul tradiției românești autentice."}'),
  ('about', 'main', '{"title": "Readucem meșteșugul tradițional românesc în contemporaneitate", "description": "Produsele noastre sunt concepute pentru a satisface nevoile contemporane de reconectare la natură și de protejare a mediului. Folosim materii prime curate și de cea mai bună calitate."}'),
  ('cta', 'main', '{"title": "Fiecare obiect are o poveste. Vrei să o aduci acasă?", "description": "Explorează colecția noastră de produse artizanale românești, confecționate manual de meșteri din comunități tradiționale."}')
ON CONFLICT (section, key) DO NOTHING;
