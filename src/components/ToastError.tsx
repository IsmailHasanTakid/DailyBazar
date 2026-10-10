"use client";

import { useEffect } from "react";
import toast from "react-hot-toast";

export default function ToastError({ message, id }: { message: string; id: string }) {
    useEffect(() => {
        toast.error(message, { id });
    }, [message, id]);

    return null;
}