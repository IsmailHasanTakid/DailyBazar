"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Market {
    market: string;
    division: string;
    min: number;
    max: number;
}

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

const unitBn: Record<string, string> = {
    kg: "কেজি",
    litre: "লিটার",
    piece: "পিস",
    dozen: "ডজন",
};

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

                if (!res.ok) {
                    throw new Error(`HTTP Error: ${res.status}`);
                }

                const data = await res.json();

                console.log("API response:", data);
                console.log("Is array:", Array.isArray(data));

                if (!Array.isArray(data)) {
                    throw new Error("API response is not an array");
                }

                setAll(data);
            } catch (err) {
                console.error("Products fetch error:", err);
                setError("ডেটা লোড করা যায়নি");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <section className="mx-auto max-w-7xl px-5 py-6">
                <p className="text-gray-500">লোড হচ্ছে...</p>
            </section>
        );
    }

    if (error) {
        return (
            <section className="mx-auto max-w-7xl px-5 py-6">
                <p className="text-red-600">{error}</p>
            </section>
        );
    }

    return (
        <section className="mx-auto max-w-7xl px-5 py-6">
            <h2 className="mb-4 text-xl font-bold text-gray-900">সব পণ্য</h2>
            <span className="pb-5">মোট {all.length.toLocaleString("bn-BD")}টি পণ্য দেখানো হচ্ছে</span>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {all.map((product) => (
                    <Link href={`/product/${product.id}`}
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
                                <span
                                    className={
                                        product.change.dir === "up"
                                            ? "text-red-600"
                                            : product.change.dir === "down"
                                                ? "text-green-600"
                                                : "text-gray-500"
                                    }
                                >
                                    {product.change.dir === "up"
                                        ? "▲"
                                        : product.change.dir === "down"
                                            ? "▼"
                                            : "-"}{" "}
                                    {Math.abs(product.change.pct).toLocaleString("bn-BD")}%
                                </span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
};

export default AllProducts;