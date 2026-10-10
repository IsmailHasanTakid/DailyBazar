import { connection } from "next/server";
import Image from "next/image";
import Link from "next/link";
import SignInSignUp from "./SignInSignUp";

const Header = async () => {

    await connection();

    const date = new Date().toLocaleDateString("bn-BD", {
        dateStyle: "full",
    });

    return (
        <div className="max-w-7xl mx-auto px-3 sm:px-5 py-3 sm:py-4">
            <div className="flex items-center justify-between gap-3">

                <Link href="/" className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                    <span className="flex items-center justify-center shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-green-700 shadow-sm">
                        <Image
                            className="w-7 h-7 sm:w-9 sm:h-9 object-contain"
                            height={50}
                            width={50}
                            src="/Assets/logo-icon.png"
                            alt="বাজার দর লোগো"
                        />
                    </span>

                    <span className="min-w-0">
                        <p className="text-lg sm:text-xl md:text-2xl font-black tracking-tight text-gray-950 leading-tight">
                            বাজার দর
                        </p>
                        <p className="text-[10px] sm:text-xs font-medium text-gray-500 truncate">
                            {date}
                        </p>
                    </span>
                </Link>


                <div className="shrink-0">
                    <SignInSignUp />
                </div>
            </div>
        </div>
    );
};

export default Header;