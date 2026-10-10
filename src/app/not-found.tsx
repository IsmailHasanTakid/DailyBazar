import Link from "next/link";

export default function NotFound() {
    return (
        <main className="flex min-h-[60vh] flex-col items-center justify-center px-5 text-center">
            <p className="text-6xl font-black text-green-700">৪০৪</p>
            <h2 className="mt-3 text-xl font-bold text-gray-900">
                পেজটি পাওয়া যায়নি
            </h2>
            <p className="mt-1 text-sm text-gray-600">
                আপনি যে পেজটি খুঁজছেন সেটি নেই বা সরিয়ে ফেলা হয়েছে।
            </p>
            <Link
                href="/"
                className="mt-5 rounded-lg bg-green-700 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-green-800"
            >
                হোম পেজে ফিরে যান
            </Link>
        </main>
    );
}