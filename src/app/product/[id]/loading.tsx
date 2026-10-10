export default function Loading() {
    return (
        <main className="min-h-screen bg-[#f1f5f1] p-6">
            <div className="mx-auto max-w-5xl space-y-4">
                <div className="h-10 w-48 animate-pulse rounded-full bg-gray-200" />
                <div className="h-32 animate-pulse rounded-2xl border bg-white" />
                <div className="h-72 animate-pulse rounded-2xl border bg-white" />
            </div>
        </main>
    );
}