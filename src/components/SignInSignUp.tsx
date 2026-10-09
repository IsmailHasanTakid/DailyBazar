"use client";

import React from "react";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

const SignInSignUp = () => {
    const router = useRouter();
    const { data: session, isPending } = authClient.useSession();

    const handleLogOut = async () => {
        await authClient.signOut();
        router.push("/");
        router.refresh();
    };

    const user = session?.user;
    const displayName = user?.name || user?.email || "ব্যবহারকারী";

    if (isPending) {
        return (
            <div className="h-9 w-28 sm:h-10 sm:w-44 animate-pulse rounded-full bg-gray-200" />
        );
    }

    // লগইন করা থাকলে: প্রোফাইল + সাইন আউট
    if (session) {
        return (
            <div className="flex items-center gap-2 sm:gap-3">
                <Link
                    href="/profile"
                    title="আমার প্রোফাইল"
                    className="flex items-center gap-2 rounded-full transition hover:opacity-80"
                >
                    {user?.image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                            src={user.image}
                            alt={displayName}
                            referrerPolicy="no-referrer"
                            className="h-8 w-8 sm:h-10 sm:w-10 rounded-full object-cover ring-2 ring-green-100"
                        />
                    ) : (
                        <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-green-700 text-sm font-bold text-white">
                            {displayName.trim().charAt(0).toUpperCase()}
                        </div>
                    )}
                    <span className="hidden sm:inline max-w-[120px] truncate text-sm font-semibold text-gray-800">
                        {user?.name?.split(" ")[0] || displayName}
                    </span>
                </Link>

                <button
                    type="button"
                    onClick={handleLogOut}
                    aria-label="সাইন আউট"
                    className="flex cursor-pointer items-center gap-1.5 rounded-full bg-red-600 px-2.5 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold text-white shadow-sm transition hover:bg-red-700"
                >
                    <LogOut className="h-4 w-4 sm:hidden" />
                    <span className="hidden sm:inline">সাইন আউট</span>
                </button>
            </div>
        );
    }

    // লগইন না থাকলে: সাইন ইন + সাইন আপ
    return (
        <div className="flex items-center gap-1.5 sm:gap-3">
            <Link
                href="/signin"
                className="rounded-full border border-gray-300 bg-white px-3 sm:px-5 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
            >
                সাইন ইন
            </Link>

            <Link
                href="/signup"
                className="rounded-full bg-gradient-to-r from-green-600 to-green-700 px-3 sm:px-5 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold text-white shadow-md shadow-green-200 transition hover:-translate-y-0.5 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
            >
                সাইন আপ
            </Link>
        </div>
    );
};

export default SignInSignUp;