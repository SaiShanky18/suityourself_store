/* eslint-disable react/no-unescaped-entities */
"use client";

import Link from 'next/link';
import React from 'react';

const PaymentSuccess = () => {
    return (
        <div className='h-screen flex flex-col justify-center items-center gap-5'>
            <p className='lrg:text-heading1-bold sml:text-heading2-bold' style={{ color: 'green' }}>Payment Successful</p>
            <p style={{ fontWeight: 'bold' }}>Thank you for renting with SuitYourselfTT!</p>
            <p className='px-4'>Please check your email or the "Orders" tab for your order information.</p>

            <Link href="/" className='p-4 border text-base-bold hover:bg-black hover:text-white'>
                CONTINUE TO SHOPPING
            </Link>
        </div>
    );
};

export default PaymentSuccess;

export const dynamic = "force-dynamic";
