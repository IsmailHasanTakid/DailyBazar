import Image from "next/image";
import { connection } from "next/server";

const Hero = async () => {
    await connection();

    const date = new Date().toLocaleDateString("bn-BD", {
        dateStyle: "full",
    });

    return (
        <section className="max-w-[1400px] mx-auto pt-7">
            <div className="flex items-center gap-6 rounded-3xl border border-green-100 bg-green-50/60 px-8 py-8 md:px-10">

                {/* Text */}
                <div className="flex w-full flex-col items-start gap-4 md:w-[65%]">
                    <span className="rounded-full bg-green-100 px-4 py-1.5 text-sm font-medium text-green-800">
                        {date}
                    </span>

                    <h1 className="text-3xl font-bold leading-tight text-gray-900 md:text-4xl">
                        আজকের বাজারের দাম এক নজরে
                    </h1>

                    <p className="max-w-xl text-sm leading-relaxed text-gray-600 md:text-base">
                        চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
                        বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
                    </p>

                    <a
                        href="#সব-পণ্য"
                        className="mt-2 rounded-lg bg-green-700 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-green-800"
                    >
                        সব পণ্য দেখুন
                    </a>
                </div>

                {/* Image */}
                <div className="hidden w-[32%] shrink-0 items-center justify-center md:flex">
                    <Image
                        src="/Assets/bazar-hero.png"
                        alt="বাজারের ঝুড়ি"
                        width={320}
                        height={270}
                        priority
                        className="h-auto w-full max-w-[300px]"
                    />
                </div>

            </div>
        </section>
    );
};

export default Hero;