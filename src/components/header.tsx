import { connection } from "next/server";
import Image from "next/image";

const Header = async () => {
    await connection();

    const date = new Date().toLocaleDateString("bn-BD", {
        dateStyle: "full",
    });

    return (
        <main className="max-w-[900px] mx-auto p-4">
            <div className="flex items-center justify-between gap-10">

                <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-green-800">
                        <Image
                            src="/Assets/logo-icon.png"
                            alt="bazar dor logo"
                            width={50}
                            height={50}
                        />
                    </div>

                    <div>
                        <h1>বাজার দর</h1>
                        <span>{date}</span>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <p className="rounded-xl py-2 px-3">
                        Sign in
                    </p>

                    <p className="rounded-xl py-2 px-3 bg-green-600">
                        Sign up
                    </p>
                </div>

            </div>
        </main>
    );
};

export default Header;
