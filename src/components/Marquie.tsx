"use client";

import { useEffect, useState } from "react";
import MarqueeText from "react-marquee-text";
import toast from "react-hot-toast";
import "react-marquee-text/dist/styles.css";

interface Product {
    id: string;
    categoryIcon: string;
    today: number;
    nameBn: string;
    unit: string;
    change: {
        dir: "up" | "down" | "flat" | string;
        pct: number;
    };
}

const unitBn: Record<string, string> = {
    kg: "কেজি",
    litre: "লিটার",
    piece: "পিস",
    dozen: "ডজন",
    hali: "হালি",
};


const toBn = (n: number) =>
    Number(n).toLocaleString("bn-BD", { maximumFractionDigits: 1 });

const Marquie = () => {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        const getProducts = async () => {
            try {
                const res = await fetch(
                    "https://api.abcz.workers.dev/api/bazardor/products"
                );
                if (!res.ok) throw new Error("Failed");
                const data = await res.json();
                setProducts(Array.isArray(data) ? data : []);
            } catch {
                toast.error("প্রোডাক্ট লোড করতে সমস্যা হয়েছে!", {
                    toastId: "products-error",
                });
            }
        };
        getProducts();
    }, []);


    if (products.length === 0) return null;

    return (
        <div className="w-full overflow-hidden border-b border-gray-200 bg-white py-2">
            <MarqueeText
                direction="right"
                duration={20}
                pauseOnHover
            >
                <div className="flex items-center gap-5 sm:gap-8 pr-5 sm:pr-8">
                    {products.map((m) => {
                        const dir = m.change?.dir;
                        const pct = Math.abs(m.change?.pct ?? 0);

                        return (
                            <div
                                key={m.id}
                                className="flex items-center gap-1.5 sm:gap-2 whitespace-nowrap text-xs sm:text-sm"
                            >
                                <span>{m.categoryIcon}</span>
                                <span className="font-medium text-gray-900">
                                    {m.nameBn}
                                </span>
                                <span className="text-gray-600">
                                    {toBn(m.today)} টাকা/{unitBn[m.unit] || m.unit}
                                </span>
                                <span
                                    className={`font-semibold ${dir === "up"
                                        ? "text-red-600"
                                        : dir === "down"
                                            ? "text-green-600"
                                            : "text-gray-500"
                                        }`}
                                >
                                    {dir === "up" ? "▲" : dir === "down" ? "▼" : "–"}{" "}
                                    {toBn(pct)}%
                                </span>
                            </div>
                        );
                    })}
                </div>
            </MarqueeText>
        </div>
    );
};

export default Marquie;