import { Suspense } from "react";
import Hero from "@/components/hero";
import PriceIncrease from "@/components/PriceIncrease";
import PriceDecreased from "@/components/PriceDecrease";
import AllProducts from "@/components/AllProducts";
import ProductSkeleton from "@/components/ProductSkeleton";

const skeleton = (
  <section className="mx-auto max-w-7xl px-5 py-6">
    <ProductSkeleton count={6} />
  </section>
);

export default function Home() {
  return (
    <>
      <Suspense fallback={<div className="mx-auto h-64 max-w-7xl px-5 py-6" />}>
        <Hero />
      </Suspense>

      <Suspense fallback={skeleton}>
        <PriceIncrease />
      </Suspense>


      <Suspense fallback={skeleton}>
        <PriceDecreased />
      </Suspense>
      <AllProducts />
    </>
  );
}