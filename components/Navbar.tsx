"use client"

import useCart from '@/lib/hooks/useCart'
import { UserButton, useUser } from '@clerk/nextjs'
import { CircleUserRound, Menu, Search, ShoppingCart } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'

const Navbar = () => {
    const pathname = usePathname()
    const router = useRouter()
    const { user } = useUser();
    const cart = useCart()

    const [dropDownMenu, setDropDownMenu] = useState(false);
    const [query, setQuery] = useState("")
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setDropDownMenu(false);
            }
        };

        if (dropDownMenu) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dropDownMenu]);

    const handleSearch = () => {
        if (query !== "") {
            router.push(`/search/${query}`);
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className='sticky top-0 z-10 py-2 px-10 flex gap-2 justify-between items-center bg-white max-sm:px-2'>
            <Link href='/'>
                <Image src="/logo.png" alt='logo' width={130} height={50} />
            </Link>

            <div className='flex gap-4 text-base-bold max-lg:hidden'>
                <Link href='/' className={`hover:text-red-1 ${pathname === "/" && "text-red-1"}`}>Home</Link>
                <Link href={user ? "/wishlist" : "/sign-in"} className={`hover:text-red-1 ${pathname === "/wishlist" && "text-red-1"}`}>Wishlist</Link>
                <Link href={user ? "/orders" : "/sign-in"} className={`hover:text-red-1 ${pathname === "/orders" && "text-red-1"}`}>Orders</Link>
            </div>

            <div className='flex gap-3 border border-grey-2 px-3 py-1 items-center rounded-lg'>
                <input
                    className='outline-none max-sm:max-w-[120px]'
                    placeholder='Search...'
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <button disabled={query === ""} onClick={handleSearch}>
                    <Search className='cursor-pointer h-4 w-4 hover:text-red-1' />
                </button>
            </div>


            <div className='relative flex gap-3 items-center'>
                <Link href='/cart' className='flex items-center gap-3 border rounded-lg px-2 py-1 hover:bg-black hover:text-white max-md:hidden'><ShoppingCart />
                    <p className='text-base-bold'>Cart ({cart.cartItems.length})</p>
                </Link>

                <Menu className='cursor-pointer lg:hidden' onClick={() => setDropDownMenu(!dropDownMenu)} />

                {dropDownMenu && (
                    <div ref={dropdownRef} className='absolute top-12 right-5 flex flex-col gap-4 p-3 rounded-lg border bg-white text-base-bold lg:hidden' >
                        <Link onClick={() => setDropDownMenu(!dropDownMenu)} href='/' className='hover:text-red-1'>Home</Link>
                        <Link onClick={() => setDropDownMenu(!dropDownMenu)} href={user ? "/wishlist" : "/sign-in"} className='hover:text-red-1'>Wishlist</Link>
                        <Link onClick={() => setDropDownMenu(!dropDownMenu)} href={user ? "/orders" : "/sign-in"} className='hover:text-red-1'>Orders</Link>
                        <Link onClick={() => setDropDownMenu(!dropDownMenu)} href='/cart' className='flex items-center gap-3 border rounded-lg px-2 py-1 hover:bg-black hover:text-white'>
                            <ShoppingCart />
                            <p className='text-base-bold'>Cart ({cart.cartItems.length})</p>
                        </Link>
                    </div>
                )}

                {user ? (<UserButton />) : (<Link href='/sign-in'><CircleUserRound /></Link>)}
            </div>
        </div>
    )
}

export default Navbar
