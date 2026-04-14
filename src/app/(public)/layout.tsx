import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Fixed full-page video background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <video
          src="/videos/bg.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Overlay: keeps all content readable */}
        <div className="absolute inset-0 bg-white/70 backdrop-blur-[1px]" />
      </div>

      <Navigation />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  );
}
