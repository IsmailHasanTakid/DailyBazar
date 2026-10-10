"use client";

import { useState } from "react";
import Link from "next/link";
import ChangeBadge from "@/components/ChangedBadge";
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
                <label htmlFor="sort" className="text-sm text-gray-500">
                    সাজান:
                </label>
                <select
                    id="sort"
                    value={sort}
                    onChange={(e) => setSort(e.target.value as SortKey)}
                    className="rounded-lg border px-3 py-1 text-sm"
                >
                    <option value="default">ডিফল্ট</option>
                    <option value="priceAsc">দাম: কম থেকে বেশি</option>
                    <option value="priceDesc">দাম: বেশি থেকে কম</option>
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
                        className="flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-4"
                    >
                        <div className="flex items-center gap-3">
                            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 text-2xl">
                                {p.image}
                            </span>
                            <div className="flex flex-col">
                                <span className="font-semibold text-gray-900">
                                    {p.nameBn}
                                </span>
                                <span className="text-xs text-gray-500">
                                    {unitBn[p.unit] ?? p.unit}
                                </span>
                            </div>
                        </div>

                        <div>
                            <p className="text-xs text-gray-600">আজকের দাম</p>
                            <div className="mt-1 flex items-center justify-between">
                                <span className="text-lg font-bold text-gray-900">
                                    {p.today.toLocaleString("bn-BD")} টাকা
                                </span>
                                <ChangeBadge dir={p.change.dir} pct={p.change.pct} />
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </>
    );
}