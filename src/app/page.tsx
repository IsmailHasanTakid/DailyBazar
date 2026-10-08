import { Suspense } from "react";
import Hero from "@/components/hero";
import PriceIncrease from "@/components/PriceIncrease";
import PriceDecreased from "@/components/PriceDecrease";

export default function Home() {
  return (
    <>
      <Suspense fallback={<div className="mx-auto h-64 max-w-7xl px-5 py-6" />}>
        <Hero />
      </Suspense>

      <Suspense fallback={<div className="mx-auto h-96 max-w-7xl px-5 py-6" />}>
        <PriceIncrease />
      </Suspense>


      <PriceDecreased />
    </>
  );
}