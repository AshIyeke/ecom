import Hero from "@/components/Hero";
import FragranceShowcase from "@/components/FragranceShowcase";
import WhyChooseUs from "@/components/WhyChooseUs";
import LatestProducts from "@/components/LatestProducts";

export default function Home() {
  
  
  return (
    <div className="min-h-screen bg-background">
      <Hero />

      <LatestProducts />

      <FragranceShowcase />

      <WhyChooseUs />
    </div>
  );
}
