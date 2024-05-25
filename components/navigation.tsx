"use client"

import React, { useState } from 'react'
import NavButton from './nav-button'
import { usePathname, useRouter } from 'next/navigation'
import { useMedia } from 'react-use'

const routes = [
    {
        href: "/",
        label: "Overview"
    },
    {
        href: "/transactions",
        label: "Transactions"
    },
    {
        href: "/accounts",
        label: "Accounts"
    },
    {
        href: "/categories",
        label: "Categories"
    },
    {
        href: "/settings",
        label: "Settings"
    }
]

const Navigation = () => {
    const [isOpen, setIsOpen] = useState(false);

    const router = useRouter()
    const pathname = usePathname();
    const isMobile = useMedia("(max-width:1024)", false)

  return (
    <nav className='hidden lg:flex items-center gap-x-2 overflow-x-auto'>
        {routes.map((route) => (
            <NavButton
            key={route.href}
            href={route.href}
            label={route.label}
            isActive={pathname === route.href}

                />
        ))}
    </nav>
  )
}

export default Navigation