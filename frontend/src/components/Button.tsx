import type { ReactElement } from "react";

interface buttonProps {
    variant: "primary" | "secondary",
    text: string,
    startIcon?: ReactElement,
    onClick?: ()=>void 
}

const variantClasses = {
    "primary": "bg-purple-700 text-white",
    "secondary": "bg-purple-200 text-purple-800"
}

const defaultStyles = " px-4 py-2 flex rounded-md cursor-pointer items-center justify-center"

export function Button({variant, text, startIcon, onClick}: buttonProps){
    return <button onClick={onClick} className={variantClasses[variant] + defaultStyles}>
        <span className="pr-2">{startIcon}</span>
        {text}
    </button>
}