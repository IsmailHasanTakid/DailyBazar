"use client"
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaGithub } from "react-icons/fa";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";

const inputClass =
    "w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-500 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-600/20";

const labelClass = "mb-1.5 block text-sm font-medium text-gray-900";

const socialClass =
    "flex flex-1 items-center justify-center gap-1.5 whitespace-nowrap rounded-lg border border-gray-200 bg-white px-2 py-2.5 text-[13px] font-semibold text-gray-900 transition hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600/40";

const SignInPage = () => {

    const router = useRouter();
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false);


    const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const { error } = await authClient.signIn.email({ email, password });

            if (error) {
                const msg = error.message ?? "সাইন ইন করা যায়নি, আবার চেষ্টা করুন।";
                setError(msg);
                toast.error(msg);
                return;
            }

            toast.success("সফলভাবে সাইন ইন হয়েছে!");
            router.push("/");
            router.refresh();
        } catch {
            toast.error("সাইন ইন করা যায়নি, আবার চেষ্টা করুন।");
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            await authClient.signIn.social({
                provider: "google",
                callbackURL: "/",
            });
        } catch {
            toast.error("Google দিয়ে সাইন ইন করা যায়নি!");
        }
    };

    const handleGithubSignIn = async () => {
        try {
            await authClient.signIn.social({
                provider: "github",
                callbackURL: "/",
            });
        } catch {
            toast.error("GitHub দিয়ে সাইন ইন করা যায়নি!");
        }
    };
    return (
        <main className="flex min-h-screen flex-col items-center bg-[#f1f5f0] px-4 py-10">
            <div className="w-full max-w-[380px]">
                {/* heading */}
                <div className="mb-6 text-center">
                    <h1 className="text-2xl font-bold text-gray-900">সাইন ইন</h1>
                    <span className="mt-1 block text-sm text-gray-600">
                        বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
                    </span>
                </div>

                {/* card */}
                <div className="rounded-2xl border border-gray-200 bg-[#fafcf9] p-5">
                    <form
                        onSubmit={handleSignIn}
                        className="flex flex-col gap-4">
                        <div>
                            <label htmlFor="email" className={labelClass}>
                                ইমেইল
                            </label>
                            <input
                                id="email"
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@example.com"
                                className={inputClass}
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className={labelClass}>
                                পাসওয়ার্ড
                            </label>
                            <input
                                id="password"
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}

                                placeholder="কমপক্ষে ৮ অক্ষর"
                                className={inputClass}
                            />
                        </div>
                        {error && <p className="text-sm text-red-600">{error}</p>}

                        <button

                            type="submit"
                            disabled={loading}
                            className="mt-1 w-full rounded-lg bg-green-700 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-green-700/30 transition hover:bg-green-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600/50"
                        >
                            {loading ? "অপেক্ষা করুন..." : "সাইন ইন"}
                        </button>
                    </form>

                    {/* divider */}
                    <div className="my-4 flex items-center gap-3">
                        <span className="h-px flex-1 bg-gray-200" />
                        <p className="text-xs text-gray-600">অথবা</p>
                        <span className="h-px flex-1 bg-gray-200" />
                    </div>

                    {/* social buttons */}
                    <div className="flex gap-3">
                        <button
                            type="button"
                            onClick={handleGoogleSignIn}
                            className={socialClass}>
                            <FcGoogle size={18} aria-hidden="true" />
                            Google দিয়ে চালিয়ে যান
                        </button>

                        <button
                            type="button"
                            onClick={handleGithubSignIn}

                            className={socialClass}>
                            <FaGithub size={18} aria-hidden="true" />
                            GitHub দিয়ে চালিয়ে যান
                        </button>
                    </div>

                    {/* sign up link */}
                    <p className="mt-4 text-center text-sm text-gray-900">
                        অ্যাকাউন্ট নেই?{" "}
                        <Link
                            href="/signup"
                            className="font-medium text-green-700 hover:underline"
                        >
                            সাইন আপ করুন
                        </Link>
                    </p>
                </div>

                {/* back home */}
                <p className="mt-6 text-center text-sm text-gray-500">
                    ←{" "}
                    <Link href="/" className="hover:text-gray-700 hover:underline">
                        হোম পেজে ফিরে যান
                    </Link>
                </p>
            </div>
        </main>
    );
};

export default SignInPage;