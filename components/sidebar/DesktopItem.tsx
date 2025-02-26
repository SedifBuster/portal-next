'use client'

import clsx from "clsx"
import Link from "next/link"

interface DesktopItemProps {
    label: string
    icon: any
    href: string
    onClick?: () => void
    active?: boolean
}

export default function DesktopItem({
    label,
    icon: Icon,
    href,
    onClick,
    active
}: DesktopItemProps) {
    const handleClick = () => {
        if(onClick) {
            return onClick()
        }
    }
    return (
        <li onClick={handleClick}>
            <Link
                href={href}
                className={clsx(`
                    group
                    flex
                    gap-x-3
                    rounded-md
                    p-3
                    text-sm
                    leading-6
                    font-semibold
                    lg:w-60
                    text-emerald-700
                    hover:text-black
                    hover:bg-gray-100
                `,
                    active && ''
                )}
             >
                <Icon className="h-6 w-6 shrink-0" />
                <span>{label}</span>
            </Link>
        </li>
    )
}