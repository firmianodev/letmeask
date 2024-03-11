import { ButtonHTMLAttributes } from "react"

import './Button.scss'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    isOutLined?: boolean
}

export function Button({ isOutLined = false, ...props}: ButtonProps) {
    return (
        <button 
            className={`button ${isOutLined ? 'outlined': ''}`} 
            {...props} 
        />
    )
}