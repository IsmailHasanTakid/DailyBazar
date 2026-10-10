import ProductSkeleton from "@/components/ProductSkeleton";

export default function Loading() {
    return (
        <main className="min-h-screen bg-[#f1f5f1] p-6">
            <div className="mx-auto max-w-6xl space-y-4">
                <div className="h-20 animate-pulse rounded-2xl border bg-white" />
                <ProductSkeleton count={9} />
            </div>
        </main>
    );
}