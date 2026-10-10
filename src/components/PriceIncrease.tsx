import Link from "next/link";
import ChangeBadge from "./ChangedBadge";
import ToastError from "./ToastError";
import { unitBn } from "@/lib/utlis";

interface Product {
    id: number;
    nameBn: string;
    image: string;
    unit: string;
    today: number;
    change: {
        dir: string;
        pct: number;
    };
}

const PriceIncrease = async () => {
    let products: Product[] = [];
    let failed = false;

    try {
        const res = await fetch(
            "https://api.abcz.workers.dev/api/bazardor/products",
            { next: { revalidate: 3600 } }
        );
        if (!res.ok) throw new Error("Failed");
        const data = await res.json();
        products = Array.isArray(data) ? data : [];
    } catch {
        failed = true;
    }

    if (failed) {
        return (
            <ToastError
                message="পণ্যের তথ্য লোড করতে সমস্যা হয়েছে!"
                id="home-products-error"
            />
        );
    }

    const increasedProducts = products
        .filter((product) => product.change.dir === "up")
        .sort(
            (a, b) =>
                Math.abs(b.change.pct) - Math.abs(a.change.pct) || b.today - a.today
        )
        .slice(0, 6);

    if (increasedProducts.length === 0) return null;

    return (
        <section className="max-w-7xl mx-auto px-5 py-6">
            <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold text-gray-900">
                <span className="text-base text-red-600">▲</span>
                আজ দাম বেড়েছে
            </h2>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {increasedProducts.map((item) => (
                    <Link
                        href={`/product/${item.id}`}
                        key={item.id}
                        className="flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-4"
                    >
                        {/* top: icon + name + unit */}
                        <div className="flex items-center gap-3">
                            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 text-2xl">
                                {item.image}
                            </span>
                            <div className="flex flex-col">
                                <span className="font-semibold text-gray-900">
                                    {item.nameBn}
                                </span>
                                <span className="text-xs text-gray-500">
                                    প্রতি {unitBn[item.unit] || item.unit}
                                </span>
                            </div>
                        </div>

                        {/* bottom: price + change */}
                        <div>
                            <p className="text-xs text-gray-600">আজকের দাম</p>
                            <div className="mt-1 flex items-center justify-between">
                                <span className="text-lg font-bold text-gray-900">
                                    {item.today.toLocaleString("bn-BD")} টাকা
                                </span>
                                <ChangeBadge dir={item.change.dir} pct={item.change.pct} />
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
};

export default PriceIncrease;