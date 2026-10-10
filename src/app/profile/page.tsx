"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";

const ProfilePage = () => {
    const router = useRouter();
    const { data: session } = authClient.useSession();
    const [name, setName] = useState("");

    const user = session?.user;

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!name.trim()) {
            toast.error("নাম লিখুন।");
            return;
        }

        const { error } = await authClient.updateUser({ name: name.trim() });

        if (error) {
            toast.error(error.message ?? "আপডেট করা যায়নি, আবার চেষ্টা করুন।");
            return;
        }

        toast.success("নাম আপডেট সফল হয়েছে।");
        setName("");
    };

    const handleSignOut = async () => {
        await authClient.signOut();
        toast.success("সাইন আউট সফল হয়েছে।");
        router.push("/");
    };

    if (!user) return null;

    return (
        <main className="min-h-screen bg-[#f1f5f0] px-4 py-10">
            <div className="mx-auto max-w-[590px]">
                <h1 className="text-2xl font-bold text-gray-900">আমার প্রোফাইল</h1>
                <p className="mb-5 text-sm text-gray-600">
                    আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
                </p>

                {/* user card */}
                <div className="flex items-center justify-between rounded-2xl border border-gray-200 bg-[#fafcf9] p-5">
                    <div className="flex items-center gap-3">
                        <img
                            src={user.image || "/avatar.png"}
                            alt={user.name}
                            referrerPolicy="no-referrer"
                            className="h-14 w-16 rounded-xl object-cover"
                        />
                        <div>
                            <p className="font-medium text-gray-900">{user.name}</p>
                            <p className="text-sm text-gray-600">{user.email}</p>
                        </div>
                    </div>

                    <button
                        onClick={handleSignOut}
                        className="flex items-center gap-1.5 rounded-lg border border-red-500 px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50"
                    >
                        <LogOut className="h-3.5 w-3.5" />
                        সাইন আউট
                    </button>
                </div>

                {/* info card */}
                <div className="mt-4 rounded-2xl border border-gray-200 bg-[#fafcf9] p-4 pb-8">
                    <h2 className="font-semibold text-gray-900">তথ্য</h2>

                    <form onSubmit={handleUpdate} className="mt-5 flex flex-col gap-3 px-3">
                        <label htmlFor="name" className="text-sm font-medium text-gray-900">
                            নাম
                        </label>
                        <input
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder={user.name}
                            className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-green-600"
                        />
                        <button
                            type="submit"
                            className="w-full rounded-lg bg-green-700 py-2.5 text-sm font-semibold text-white hover:bg-green-800"
                        >
                            আপডেট
                        </button>
                    </form>
                </div>
            </div>
        </main>
    );
};

export default ProfilePage;