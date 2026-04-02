import Hero from "@/components/Hero";
import FragranceShowcase from "@/components/FragranceShowcase";
import WhyChooseUs from "@/components/WhyChooseUs";

export default function Home() {
  
  
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <Hero />

      <FragranceShowcase />

      <WhyChooseUs />

      <footer className="bg-[#F9F8F6] py-12 border-t border-gray-100 flex items-center justify-center">
        <p className="text-[10px] text-gray-400 tracking-widest uppercase">
          © 2024 Soar Fragrance Co. All Rights Reserved.
        </p>
      </footer>
    </div>
  );
}
