import { notFound } from "next/navigation";
import ProductList from "@/components/ProductList";
import { toBn } from "@/lib/utlis";

type Product = {
    id: number;
    slug: string;
    nameBn: string;
    category: string;
    categoryNameBn: string;
    categoryIcon: string;
    unit: string;
    image: string;
    today: number;
    yesterday: number;
    lastWeek: number;
    lastMonth: number;
    change: { dir: "up" | "down" | "flat"; pct: number };
};

export default async function CategoryPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;

    let products: Product[] = [];
    try {
        const res = await fetch(
            `https://api.abcz.workers.dev/api/bazardor/products?category=${encodeURIComponent(slug)}`,
            { cache: "no-store" }
        );
        if (!res.ok) throw new Error("Failed");
        const data = await res.json();
        products = Array.isArray(data) ? data : [];
    } catch {
        notFound();
    }

    if (!products.length) notFound();

    const { categoryNameBn, categoryIcon } = products[0];

    return (
        <main className="min-h-screen bg-[#f1f5f1] p-6">
            <div className="mx-auto max-w-6xl space-y-4">
                {/* Header */}
                <div className="flex items-center gap-3 rounded-2xl border bg-white p-5">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-3xl">
                        {categoryIcon}
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold">{categoryNameBn}</h1>
                        <p className="text-sm text-gray-500">
                            {toBn(products.length)}টি পণ্যের আজকের দাম ও পরিবর্তন
                        </p>
                    </div>
                </div>

                <ProductList products={products} />
            </div>
        </main>
    );
}