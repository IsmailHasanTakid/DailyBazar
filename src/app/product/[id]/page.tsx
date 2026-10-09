import { notFound } from "next/navigation";
import SummaryCard from "@/components/SummaryCard";
import { toBn, unitBn, formatPrice } from "@/lib/utlis";
type Market = {
    market: string;
    division: string;
    min: number;
    max: number;
};
type ProductType = {
    id: number;
    slug: string;
    nameBn: string;
    categoryNameBn: string;
    unit: string;
    image: string;
    today: number;
    yesterday: number;
    change: { dir: "up" | "down" | "flat"; pct: number };
    markets: Market[];
};

export default async function ProductDetails({
    params,

}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const res = await fetch(`https://api.abcz.workers.dev/api/bazardor/products/${id}`, { cache: "no-store" });
    if (!res.ok) notFound();
    const data = await res.json();
    const product: ProductType = Array.isArray(data) ? data[0] : data;
    if (!product) notFound();

    const { nameBn, categoryNameBn, unit, image, today, yesterday, change, markets } = product;
    const unitText = unitBn[unit] ?? unit;
    const diff = Math.abs(today - yesterday);

    const rows = markets
        .map((m) => ({ ...m, avg: (m.min + m.max) / 2 }))
        .sort((a, b) => a.avg - b.avg)

    const lowest = Math.min(...markets.map((m) => m.min));
    const highest = Math.max(...markets.map((m) => m.max));

    const dirText =
        change.dir === "up" ? "বেড়েছে" : change.dir === "down" ? "কমেছে" : "অপরিবর্তিত";
    const dirColor =
        change.dir === "up"
            ? "text-red-600"
            : change.dir === "down"
                ? "text-green-600"
                : "text-gray-600";
    const arrow = change.dir === "up" ? "▲" : change.dir === "down" ? "▼" : "—";


    return (
        <main className="min-h-screen bg-[#f1f5f1] p-6">
            <div className="mx-auto max-w-5xl space-y-4">
                {/* Header card */}
                <div className="flex items-center justify-between gap-4 rounded-2xl border bg-white p-6">
                    <div className="flex items-center gap-4">
                        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gray-100 text-3xl">
                            {image}
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold">{nameBn}</h1>
                            <p className="text-xs text-gray-500">
                                প্রতি {unitText} · {categoryNameBn}
                            </p>
                            <p className="mt-1 text-sm text-gray-600">
                                গতকালের তুলনায় আজ দাম{" "}
                                <span className="font-bold text-gray-900">{dirText}</span>
                                {change.dir !== "flat" && <> · {toBn(diff)} টাকা</>}
                            </p>
                        </div>
                    </div>

                    <div className="shrink-0 rounded-xl bg-gray-50 px-5 py-3 text-center">
                        <p className="text-xs text-gray-500">আজকের দাম</p>
                        <p className="text-3xl font-bold">{toBn(today)}</p>
                        <p className="text-xs text-gray-500">টাকা / {unitText}</p>
                        <p className={`mt-1 text-xs font-medium ${dirColor}`}>
                            {arrow} {toBn(Math.abs(change.pct).toFixed(1))}%
                        </p>
                    </div>
                </div>

                {/* Summary + table */}
                <div className="space-y-6 rounded-2xl border bg-white p-6">
                    <section>
                        <h2 className="mb-3 font-bold">দামের সারসংক্ষেপ</h2>
                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                            <SummaryCard
                                label="সর্বনিম্ন দাম"
                                value={lowest}
                                color="text-green-600"
                                note="সবচেয়ে কম দামের বাজার"
                            />
                            <SummaryCard
                                label="সর্বাধিক দাম"
                                value={highest}
                                color="text-red-600"
                                note="সবচেয়ে বেশি দামের বাজার"
                            />
                            <SummaryCard
                                label="গড় দাম"
                                value={today}
                                color="text-green-700"
                                note={`প্রতি ${unitText}-এর হিসাবে`}
                            />
                        </div>
                    </section>

                    <section>
                        <h2 className="mb-3 font-bold">বাজারভিত্তিক আজকের দাম</h2>
                        <div className="overflow-x-auto rounded-xl border">
                            <table className="w-full min-w-[600px] text-sm">
                                <thead>
                                    <tr className="text-gray-500">
                                        <th className="p-3 text-left font-medium">বাজার</th>
                                        <th className="p-3 text-left font-medium">বিভাগ</th>
                                        <th className="p-3 text-right font-medium">সর্বনিম্ন</th>
                                        <th className="p-3 text-right font-medium">সর্বাধিক</th>
                                        <th className="p-3 text-right font-medium">গড়</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {rows.map((m, i) => (
                                        <tr
                                            key={m.market}
                                            className={`border-t ${i % 2 === 1 ? "bg-gray-50" : ""}`}
                                        >
                                            <td className="p-3">{m.market}</td>
                                            <td className="p-3">{m.division}</td>
                                            <td className="p-3 text-right">{formatPrice(m.min)} টাকা</td>
                                            <td className="p-3 text-right">{formatPrice(m.max)} টাকা</td>
                                            <td className="p-3 text-right font-bold">
                                                {formatPrice(m.avg)} টাকা
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>
                </div>
            </div>
        </main>

    )
}