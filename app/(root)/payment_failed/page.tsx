"use client";

import Link from 'next/link';
import React from 'react';

const PaymentFailed = () => {
    return (
        <div className='h-screen flex flex-col justify-center items-center gap-5'>
            <p className='lrg:text-heading1-bold sml:text-heading2-bold' style={{ color: 'red' }}>Payment Failed</p>
            <p className='px-4' style={{ fontWeight: 'bold' }}>Unfortunately, your payment could not be processed.</p>
            <p className='px-4'>Please try again later or contact us for assistance.</p>

            <Link href="/cart" className='p-4 border text-base-bold hover:bg-black hover:text-white'>
                CONTINUE TO CART
            </Link>
        </div>
    );
};

export default PaymentFailed;

export const dynamic = "force-dynamic";
