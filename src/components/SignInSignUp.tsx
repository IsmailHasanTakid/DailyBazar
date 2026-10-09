"use client";

import React from "react";
import { User } from "lucide-react";
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

    if (isPending) {
        return (
            <div className="h-8 w-24 sm:h-10 sm:w-40 animate-pulse rounded-full bg-gray-200" />
        );
    }

    return (
        <div>
            {session ? (
                <div className="flex items-center gap-1 sm:gap-2 rounded-full border border-gray-200 bg-white py-0.5 sm:py-1 pl-0.5 sm:pl-1 pr-1 sm:pr-1.5 shadow-sm">
                    <Link
                        href="/profile"
                        title="My Profile"
                        className="block shrink-0 rounded-full transition hover:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500"
                    >
                        {user?.image ? (

                            <img
                                src={user.image}
                                alt={user.name || "User"}
                                referrerPolicy="no-referrer"
                                className="h-8 w-8 sm:h-10 sm:w-10 rounded-full object-cover ring-2 ring-green-100"
                            />
                        ) : (
                            <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-green-700 text-sm sm:text-base font-semibold text-white ring-2 ring-green-100">
                                {(user?.name || user?.email || "U")
                                    .trim()
                                    .charAt(0)
                                    .toUpperCase()}
                            </div>
                        )}
                    </Link>

                    <Link
                        href="/profile"
                        className="flex items-center gap-2 rounded-full border border-gray-200 px-2.5 sm:px-4 py-1.5 sm:py-2 text-sm font-semibold text-gray-700 transition-all duration-200 hover:border-green-300 hover:bg-green-50 hover:text-green-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
                    >
                        <User className="h-4 w-4" />
                        <span className="hidden sm:inline">{user?.name?.split(" ").pop()}</span>
                    </Link>

                    <button
                        type="button"
                        onClick={handleLogOut}
                        className="flex cursor-pointer items-center gap-2 rounded-full bg-green-700 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold text-white shadow-sm shadow-green-200 transition-all duration-200 hover:bg-green-800 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 active:scale-95"
                    >
                        Sign Out
                    </button>
                </div>
            ) : (
                <div className="flex items-center gap-1.5 sm:gap-3">
                    <Link
                        href="/signin"
                        className="rounded-full border border-gray-300 bg-white px-3 sm:px-5 py-1.5 sm:py-2.5 text-xs sm:text-sm font-semibold text-gray-700 transition-all duration-200 hover:border-green-300 hover:bg-green-50 hover:text-green-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
                    >
                        Sign in
                    </Link>

                    <Link
                        href="/signup"
                        className="rounded-full bg-gradient-to-r from-green-600 to-green-700 px-3 sm:px-5 py-1.5 sm:py-2.5 text-xs sm:text-sm font-semibold text-white shadow-md shadow-green-200 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-green-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 active:translate-y-0"
                    >
                        Sign up
                    </Link>
                </div>
            )}
        </div>
    );
};

export default SignInSignUp;