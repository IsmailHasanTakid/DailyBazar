"use client"
import { useEffect, useState } from 'react';
interface Category {
    id: string,
    icon: string,
    nameBn: string;
}

const NavLinks = () => {
    const [categoryData, setCategoryData] = useState<Category[]>([]);
    useEffect(() => {
        const getCategories = async () => {
            try {
                const res = await fetch("https://api.abcz.workers.dev/api/bazardor/categories");
                const data = await res.json();
                setCategoryData(data);
            } catch (error) {
                console.error("Category fetch error:", error);

            }
        };
        getCategories();
    }, []);
    return (
        <div className="border-y border-gray-200 bg-white">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex items-center justify-center gap-2 overflow-x-auto py-3 scrollbar-hide">
                    {categoryData.map((item) => (
                        <div key={item.id}
                            className="flex shrink-0 items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-gray-700 transition-all duration-200 hover:border-green-500 hover:bg-green-50 hover:text-green-700 cursor-pointer" >
                            <span className="text-lg"> {item.icon} </span>
                            <span className="whitespace-nowrap text-sm font-medium">
                                {item.nameBn} </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default NavLinks;