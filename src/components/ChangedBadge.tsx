import { toBn } from "@/lib/utlis";

type Props = {
    dir: "up" | "down" | "flat" | string;
    pct: number;
};

export default function ChangeBadge({ dir, pct }: Props) {
    const value = toBn(Math.abs(pct).toFixed(1));

    if (dir === "up")
        return (
            <span className="rounded-full bg-red-50 px-2 py-1 text-xs text-red-600">
                ▲ {value}%
            </span>
        );

    if (dir === "down")
        return (
            <span className="rounded-full bg-green-50 px-2 py-1 text-xs text-green-600">
                ▼ {value}%
            </span>
        );

    return (
        <span className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-600">
            — {toBn("0.0")}%
        </span>
    );
}