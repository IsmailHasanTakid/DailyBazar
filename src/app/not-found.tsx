import Link from "next/link";

export default function NotFound() {
    return (
        <main className="flex min-h-[70vh] items-center justify-center px-5 py-10">
            <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-green-100 bg-green-50/60 px-6 py-10 text-center shadow-sm">

                <span className="pointer-events-none absolute -left-10 -top-10 h-32 w-32 rounded-full bg-green-100/70" />
                <span className="pointer-events-none absolute -bottom-12 -right-12 h-40 w-40 rounded-full bg-green-100/70" />

                <div className="relative">
                    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-white text-5xl shadow-sm ring-1 ring-green-100">
                        🛒
                    </div>

                    <p className="mt-5 bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-7xl font-black leading-none text-transparent">
                        ৪০৪
                    </p>

                    <h2 className="mt-4 text-xl font-bold text-gray-900">
                        পেজটি খুঁজে পাওয়া যায়নি
                    </h2>

                    <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-gray-600">
                        আপনি যে পেজটি খুঁজছেন সেটি নেই, ঠিকানাটি ভুল।
                    </p>

                    <Link
                        href="/"
                        className="mt-6 inline-flex items-center gap-2 rounded-lg bg-green-700 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-green-700/30 transition hover:-translate-y-0.5 hover:bg-green-800"
                    >
                        <span aria-hidden="true">←</span>
                        হোম পেজে ফিরে যান
                    </Link>
                </div>
            </div>
        </main>
    );
}