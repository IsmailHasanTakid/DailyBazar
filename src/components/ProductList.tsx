"use client";

import { useState } from "react";
import Link from "next/link";
import ChangeBadge from "@/components/ChangedBadge"

import { toBn } from "@/lib/utlis";
type Product = {
    id: number;
    slug: string;
    nameBn: string;
    unit: string;
    image: string;
    today: number;
    change: { dir: "up" | "down" | "flat"; pct: number };
};

const unitBn: Record<string, string> = {
    kg: "প্রতি কেজি",
    litre: "প্রতি লিটার",
    piece: "প্রতি পিস",
    dozen: "প্রতি ডজন",
    hali: "প্রতি হালি",
};

type SortKey = "default" | "priceAsc" | "priceDesc";

export default function ProductList({ products }: { products: Product[] }) {
    const [sort, setSort] = useState<SortKey>("default");

    const sorted = [...products];
    if (sort === "priceAsc") sorted.sort((a, b) => a.today - b.today);
    if (sort === "priceDesc") sorted.sort((a, b) => b.today - a.today);

    return (
        <>
            {/* Sort bar */}
            <div className="flex items-center justify-end gap-2 rounded-2xl border bg-white p-4">
                <span className="text-sm text-gray-500">সাজান</span>
                <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value as SortKey)}
                    className="rounded-lg border px-3 py-1 text-sm"
                >
                    <option value="default">ডিফল্ট</option>
                    <option value="priceAsc">দাম কম থেকে বেশি</option>
                    <option value="priceDesc">দাম বেশি থেকে কম</option>
                </select>
            </div>

            <p className="text-sm text-gray-500">
                মোট {toBn(sorted.length)}টি পণ্য দেখানো হচ্ছে
            </p>

            {/* Product grid */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {sorted.map((p) => (
                    <Link
                        key={p.id}
                        href={`/product/${p.id}`}
                        className="rounded-2xl border bg-white p-4 transition hover:shadow-md"
                    >
                        <div className="flex items-center gap-3">
                            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-gray-100 text-2xl">
                                {p.image}
                            </div>
                            <div>
                                <h3 className="font-semibold">{p.nameBn}</h3>
                                <p className="text-xs text-gray-500">
                                    {unitBn[p.unit] ?? p.unit}
                                </p>
                            </div>
                        </div>

                        <p className="mt-4 text-xs text-gray-500">আজকের দাম</p>
                        <div className="flex items-center justify-between">
                            <p className="text-xl font-bold">
                                {toBn(p.today)}{" "}
                                <span className="text-sm font-normal">টাকা</span>
                            </p>
                            <ChangeBadge dir={p.change.dir} pct={p.change.pct} />
                        </div>
                    </Link>
                ))}
            </div>
        </>
    );
}