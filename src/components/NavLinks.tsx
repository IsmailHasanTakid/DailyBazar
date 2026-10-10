"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface Category {
    id: string;
    icon: string;
    slug: string;
    nameBn: string;
}

const NavLinks = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const pathname = usePathname();

    useEffect(() => {
        const getCategories = async () => {
            try {
                const res = await fetch(
                    "https://api.abcz.workers.dev/api/bazardor/categories"
                );
                if (!res.ok) throw new Error("Failed");
                const data = await res.json();
                setCategories(Array.isArray(data) ? data : []);
            } catch {
                toast.error("ক্যাটাগরি লোড করতে সমস্যা হয়েছে!", {
                    id: "categories-error",
                });
            } finally {
                setLoading(false);
            }
        };
        getCategories();
    }, []);

    return (
        <nav className="border-y border-gray-200 bg-white/80">
            <div className="max-w-7xl mx-auto px-3 sm:px-5">

                <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto py-2 scrollbar-hide md:justify-center">
                    {loading
                        ? Array.from({ length: 8 }).map((_, i) => (
                            <div
                                key={i}
                                className="h-8 w-20 shrink-0 animate-pulse rounded-full bg-gray-200"
                            />
                        ))
                        : categories.map((item) => {
                            const href = `/category/${item.slug}`;
                            const isActive = pathname === href;

                            return (
                                <Link
                                    key={item.id}
                                    href={href}
                                    aria-current={isActive ? "page" : undefined}
                                    className={`flex shrink-0 items-center gap-1.5 rounded-full px-3 sm:px-4 py-1.5 text-sm transition-all duration-200 ${isActive
                                        ? "bg-green-100 text-green-800 font-bold ring-1 ring-green-300"
                                        : "text-gray-700 font-medium hover:bg-green-50 hover:text-green-700"
                                        }`}
                                >
                                    <span className="text-base">{item.icon}</span>
                                    <span className="whitespace-nowrap">{item.nameBn}</span>
                                </Link>
                            );
                        })}
                </div>
            </div>
        </nav>
    );
};

export default NavLinks;