"use client"
import { useEffect, useState } from "react";
import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css"
interface Product {
    id: string,
    categoryIcon: string;
    today: number,
    nameBn: string,
    unit: string,
    change: {
        dir: string,
        pct: number;
    };
}

const Marquie = () => {
    const unitBn: Record<string, string> = {
        kg: "কেজি",
        litre: "লিটার",
        piece: "টি",
        dozen: "ডজন",
    };
    const [marquie, setMarquie] = useState<Product[]>([]);
    useEffect(() => {
        const getMarquie = async () => {
            try {
                const res = await fetch("https://api.abcz.workers.dev/api/bazardor/products");
                const data = await res.json(); setMarquie(data);
            }
            catch (error) {
                console.error("Product fetch error:", error);

            }
        };
        getMarquie();
    }, []);
    return (
        <div className="w-full overflow-hidden bg-white border-b border-gray-200 py-2">
            <MarqueeText direction="right" duration={10}>
                <div className="flex items-center gap-8 pr-8">
                    {marquie.map((m) => (
                        <div key={m.id} className="flex items-center gap-2 whitespace-nowrap">
                            <span>{m.categoryIcon}</span>
                            <span className="font-medium">{m.nameBn}</span>
                            <span>{m.today} টাকা/{unitBn[m.unit] || m.unit}</span>
                            <span
                                className={
                                    m.change.dir === "up"
                                        ? "text-red-600"
                                        : m.change.dir === "down"
                                            ? "text-green-600"
                                            : "text-gray-500"
                                }
                            >
                                {m.change.dir === "up" ? "▲" : m.change.dir === "down" ? "▼" : ""}{" "}
                                {Math.abs(m.change.pct)}%
                            </span>
                        </div>
                    ))}
                </div>
            </MarqueeText>
        </div>
    );
};

export default Marquie;