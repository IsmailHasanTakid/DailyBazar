export const toBn = (n: number | string) =>
    String(n).replace(/\d/g, (d) => "০১২৩৪৫৬৭৮৯"[Number(d)]);

export const unitBn: Record<string, string> = {
    kg: "কেজি",
    litre: "লিটার",
    piece: "পিস",
    dozen: "ডজন",
    hali: "হালি",
};

// 62 -> "৬২", 63.5 -> "৬৩.৫০"
export const formatPrice = (n: number) =>
    toBn(Number.isInteger(n) ? n : n.toFixed(2));