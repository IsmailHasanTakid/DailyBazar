"use client";

import { useEffect } from "react";
import { toast } from "react-toastify";

export default function ToastError({ message, id }: { message: string; id: string }) {
    useEffect(() => {
        toast.error(message, { toastId: id });
    }, [message, id]);

    return null;
}