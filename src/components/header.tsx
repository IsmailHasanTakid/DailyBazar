import { connection } from "next/server";
import Image from "next/image";
import Link from "next/link";
import SignInSignUp from "./SignInSignUp";

const Header = async () => {
    // date prottek request e fresh dekhanor jonno
    await connection();

    const date = new Date().toLocaleDateString("bn-BD", {
        dateStyle: "full",
    });

    return (
        <div className="relative">
            <div className="max-w-7xl mx-auto px-3 sm:px-5 py-4 sm:py-6">
                <div className="flex items-center pr-40 sm:pr-48 md:pr-56">
                    {/* Logo and Website Info */}
                    <div className="flex items-center gap-2.5 sm:gap-4 min-w-0">
                        <Link
                            href="/"
                            className="flex items-center justify-center shrink-0 w-11 h-11 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-green-800 shadow-sm"
                        >
                            <Image
                                className="w-8 h-8 sm:w-11 sm:h-11 object-contain"
                                height={50}
                                width={50}
                                src="/Assets/logo-icon.png"
                                alt="bazar dor logo"
                            />
                        </Link>

                        <Link href="/" className="group min-w-0">
                            <h1 className="text-lg sm:text-xl font-black tracking-tight text-gray-950 md:text-2xl">
                                বাজার{" "}
                                <span className="bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent">
                                    দর
                                </span>
                            </h1>

                            <div className="mt-0.5 sm:mt-1 flex items-center gap-1.5 sm:gap-2">
                                <span className="h-px w-3 sm:w-5 bg-green-600 shrink-0" />
                                <p className="text-[10px] sm:text-[11px] font-medium tracking-wide text-gray-500 md:text-xs truncate">
                                    {date}
                                </p>
                            </div>
                        </Link>
                    </div>
                </div>

                <div className="mt-4 sm:mt-7 border-b border-gray-200"></div>
            </div>

            {/* Sign in / Sign up / Profile */}
            <div className="absolute top-4 sm:top-6 right-3 sm:right-5 md:right-10 h-11 sm:h-14 flex items-center">
                <SignInSignUp />
            </div>
        </div>
    );
};

export default Header;