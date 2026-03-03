"use client";

import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";

export function SubmitButton({
    children,
    className = "",
    ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
    const { pending } = useFormStatus();

    return (
        <button
            type="submit"
            disabled={pending || props.disabled}
            className={`flex items-center justify-center ${className} disabled:opacity-50`}
            {...props}
        >
            {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {children}
        </button>
    );
}
