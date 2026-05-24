import type { ReactElement } from "react";

interface ButtonProps{
     variant: "primary" | "secondary";
     text: string;
     startIcon: ReactElement;
     onClick?: ()=> void;
}

const variantClasses = {
    "primary": "bg-[var(--color-button-primary)] text-[var(--color-text-secondary)]",
    "secondary": "bg-[var(--color-button-secondary)] text-[var(--color-text-primary)]",
}

const defaultClasses = "px-4 py-2 rounded-md font-light flex items-center cursor-pointer"

export function Button({variant, text, startIcon, onClick}: ButtonProps){
    return(
        <button onClick={onClick} className={variantClasses[variant] + " " + defaultClasses}>
            <div className="pr-3">
                {startIcon}
            </div>
            {text}
        </button>
    )
} 