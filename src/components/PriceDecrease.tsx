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

const unitBn: Record<string, string> = {
    kg: "কেজি",
    litre: "লিটার",
    piece: "পিস",
    dozen: "ডজন",
};

const PriceDecreased = async () => {
    let products: Product[] = [];

    try {
        const res = await fetch(
            "https://api.abcz.workers.dev/api/bazardor/products",
            { next: { revalidate: 3600 } }
        );
        if (res.ok) {
            products = await res.json();
        }
    } catch (error) {
        console.error("Product fetch error:", error);
    }

    const decreasedProducts = products
        .filter((product) => product.change.dir === "down")
        .sort((a, b) => b.change.pct - a.change.pct || b.today - a.today)
        .slice(0, 6);

    if (decreasedProducts.length === 0) return null;

    return (
        <section className="max-w-7xl mx-auto px-5 py-6">
            <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold text-gray-900">
                <span className="text-base text-green-700">▼</span>
                আজ দাম কমেছে
            </h2>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {decreasedProducts.map((item) => (
                    <div
                        key={item.id}
                        className="flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-4"
                    >

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

                        <div>
                            <p className="text-xs text-gray-600">আজকের দাম</p>
                            <div className="mt-1 flex items-center justify-between">
                                <span className="text-lg font-bold text-gray-900">
                                    {item.today.toLocaleString("bn-BD")} টাকা
                                </span>
                                <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-green-700">
                                    ▼ {Math.abs(item.change.pct).toLocaleString("bn-BD")}%
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default PriceDecreased;