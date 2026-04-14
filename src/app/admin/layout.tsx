"use client";

import { useState, useEffect, createContext, useContext } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  Package,
  FolderTree,
  ShoppingCart,
  Users,
  Star,
  FileText,
  MessageSquare,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { getSupabaseBrowser } from "@/lib/supabase";
import type { User } from "@supabase/supabase-js";

const AuthContext = createContext<{ user: User | null }>({ user: null });
export const useAdminAuth = () => useContext(AuthContext);

const NAV = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/produse", label: "Produse", icon: Package },
  { href: "/admin/categorii", label: "Categorii", icon: FolderTree },
  { href: "/admin/comenzi", label: "Comenzi", icon: ShoppingCart },
  { href: "/admin/mesteri", label: "Meșteri", icon: Users },
  { href: "/admin/recenzii", label: "Recenzii", icon: Star },
  { href: "/admin/continut", label: "Conținut", icon: FileText },
  { href: "/admin/mesaje", label: "Mesaje", icon: MessageSquare },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const sb = getSupabaseBrowser();
    sb.auth.getUser().then(({ data }) => {
      if (!data.user && pathname !== "/admin/login") {
        router.replace("/admin/login");
      } else {
        setUser(data.user);
      }
      setLoading(false);
    });
  }, [pathname, router]);

  const handleLogout = async () => {
    const sb = getSupabaseBrowser();
    await sb.auth.signOut();
    router.replace("/admin/login");
  };

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-earth-50">
        <div className="w-8 h-8 border-4 border-brand-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <AuthContext.Provider value={{ user }}>
      <div className="min-h-screen bg-earth-50 flex">
        {/* Sidebar overlay on mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/30 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside
          className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-earth-200 transform transition-transform lg:transform-none ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }`}
        >
          <div className="h-16 flex items-center justify-between px-6 border-b border-earth-100">
            <Link href="/admin" className="font-bold text-brand-700 text-lg">
              PappoCrafts
            </Link>
            <button className="lg:hidden text-earth-500" onClick={() => setSidebarOpen(false)}>
              <X size={20} />
            </button>
          </div>
          <nav className="p-4 space-y-1">
            {NAV.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    active
                      ? "bg-brand-50 text-brand-700"
                      : "text-earth-600 hover:bg-earth-50 hover:text-earth-800"
                  }`}
                >
                  <item.icon size={18} />
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-earth-100">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-earth-500 hover:text-red-600 hover:bg-red-50 transition-colors w-full"
            >
              <LogOut size={18} />
              Deconectare
            </button>
          </div>
        </aside>

        {/* Main */}
        <div className="flex-1 flex flex-col min-w-0">
          <header className="h-16 bg-white border-b border-earth-200 flex items-center px-4 lg:px-8 gap-4">
            <button className="lg:hidden text-earth-600" onClick={() => setSidebarOpen(true)}>
              <Menu size={22} />
            </button>
            <h1 className="text-lg font-semibold text-earth-800">
              {NAV.find((n) => n.href === pathname)?.label ?? "Admin"}
            </h1>
            <div className="ml-auto">
              <Link href="/" className="text-sm text-brand-600 hover:underline">
                Vezi site-ul &rarr;
              </Link>
            </div>
          </header>
          <main className="flex-1 p-4 lg:p-8 overflow-auto">{children}</main>
        </div>
      </div>
    </AuthContext.Provider>
  );
}
