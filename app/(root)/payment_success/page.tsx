"use client"

import useCart from '@/lib/hooks/useCart'
import Link from 'next/link'
import React, { useEffect } from 'react'

const SuccessfulPayment = () => {
    const cart = useCart();

    useEffect(() => {
        cart.clearCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className='h-screen flex flex-col justify-center items-center gap-5'>
            <p className='text-heading1-bold text-red-1'>Payment Successful</p>
            <p>Thank you for your rental</p>
            <Link href="/" className='p-4 border text-base-bold hover:bg-black hover:text-white'>
                CONTINUE TO SHOPPING
            </Link>
        </div>
    )
}

export default SuccessfulPayment

export const dynamic = "force-dynamic";
