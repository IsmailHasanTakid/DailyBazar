export default function ProductSkeleton({ count = 6 }: { count?: number }) {
    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: count }).map((_, i) => (
                <div
                    key={i}
                    className="flex animate-pulse flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-4"
                >
                    <div className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded-xl bg-gray-200" />
                        <div className="flex flex-col gap-2">
                            <div className="h-4 w-24 rounded bg-gray-200" />
                            <div className="h-3 w-16 rounded bg-gray-200" />
                        </div>
                    </div>
                    <div>
                        <div className="h-3 w-16 rounded bg-gray-200" />
                        <div className="mt-2 flex items-center justify-between">
                            <div className="h-5 w-24 rounded bg-gray-200" />
                            <div className="h-6 w-14 rounded-full bg-gray-200" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}