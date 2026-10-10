"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ChangeBadge from "./ChangedBadge";
import { unitBn } from "@/lib/utlis";

interface Product {
    id: number;
    slug: string;
    nameBn: string;
    category: string;
    unit: string;
    image: string;
    today: number;
    change: {
        dir: "up" | "down" | "flat";
        pct: number;
    };
}

const AllProducts = () => {
    const [all, setAll] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(
                    "https://api.abcz.workers.dev/api/bazardor/products"
                );

                if (!res.ok) throw new Error("Failed");

                const data = await res.json();

                if (!Array.isArray(data)) throw new Error("Invalid data");

                setAll(data);
            } catch {
                setError("ডেটা লোড করা যায়নি");
                toast.error("পণ্যের তালিকা লোড করতে সমস্যা হয়েছে!", {
                    toastId: "all-products-error",
                });
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <section id="সব-পণ্য" className="mx-auto max-w-7xl scroll-mt-24 px-5 py-6">
            <h2 className="mb-4 text-xl font-bold text-gray-900">সব পণ্য</h2>

            {loading && <p className="text-gray-500">লোড হচ্ছে...</p>}

            {error && <p className="text-red-600">{error}</p>}

            {!loading && !error && (
                <>
                    <p className="mb-5 text-sm text-gray-600">
                        মোট {all.length.toLocaleString("bn-BD")}টি পণ্য দেখানো হচ্ছে
                    </p>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {all.map((product) => (
                            <Link
                                href={`/product/${product.id}`}
                                key={product.id}
                                className="flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-4"
                            >
                                {/* top: icon + name + unit */}
                                <div className="flex items-center gap-3">
                                    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 text-2xl">
                                        {product.image}
                                    </span>
                                    <div className="flex flex-col">
                                        <span className="font-semibold text-gray-900">
                                            {product.nameBn}
                                        </span>
                                        <span className="text-xs text-gray-500">
                                            প্রতি {unitBn[product.unit] || product.unit}
                                        </span>
                                    </div>
                                </div>

                                {/* bottom: price + change */}
                                <div>
                                    <p className="text-xs text-gray-600">আজকের দাম</p>
                                    <div className="mt-1 flex items-center justify-between">
                                        <span className="text-lg font-bold text-gray-900">
                                            {product.today.toLocaleString("bn-BD")} টাকা
                                        </span>
                                        <ChangeBadge
                                            dir={product.change.dir}
                                            pct={product.change.pct}
                                        />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </>
            )}
        </section>
    );
};

export default AllProducts;