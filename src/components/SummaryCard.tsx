import { toBn } from "@/lib/utlis";

type Props = {
    label: string;
    value: number;
    color: string;
    note: string;
};

export default function SummaryCard({ label, value, color, note }: Props) {
    return (
        <div className="rounded-xl border p-4">
            <p className="text-xs text-gray-500">{label}</p>
            <p className={`text-2xl font-bold ${color}`}>
                {toBn(value)} <span className="text-sm font-normal">টাকা</span>
            </p>
            <p className="text-xs text-gray-500">{note}</p>
        </div>
    );
}