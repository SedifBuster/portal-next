'use client'

import Link from "next/link"
import clsx from "clsx"

interface MobileItemProps {
    href: string
    icon: any
    active?: boolean
    onClick?: () => void
}

export default function MobileItem({
    href,
    icon: Icon,
    active,
    onClick
}: MobileItemProps) {
    const handleClick = () => {
        if (onClick) {
            return onClick()
        }
    }
    return (
        <Link 
            href={href}
            onClick={onClick}
            className={clsx(`
                group
                flex
                gap-x-3
                text-sm
                leading-6
                font-semibold
                w-full
                justify-center
                p-4
                text-emerald-700
                hover:text-black
                hover:bg-gray-100
            `,
                active && 'bg-gray-100 text-black'
            )}
        >
            <Icon className="h-6 w-6"/>
        </Link>
    )
}