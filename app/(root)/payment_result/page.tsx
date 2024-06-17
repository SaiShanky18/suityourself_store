/* eslint-disable react/no-unescaped-entities */

"use client";

import useCart from '@/lib/hooks/useCart';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState, useRef } from 'react';

const PaymentResult = () => {
    const cart = useCart();
    const router = useRouter();
    const [status, setStatus] = useState<string | null>(null);
    const [showPaymentResult, setShowPaymentResult] = useState<boolean>(false);
    const hasRunOnce = useRef(false); // useRef to ensure it runs only once

    const handleOrderCreation = async (orderData: any) => {
        try {
            const response = await fetch('/api/createOrder', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderData),
            });

            if (!response.ok) {
                throw new Error('Failed to create order');
            }

            console.log('Order created successfully');
            cart.clearCart();

        } catch (err) {
            console.error('Error creating order:', err);
        }
    };

    useEffect(() => {
        if (hasRunOnce.current) return; // Prevent the effect from running more than once
        hasRunOnce.current = true;

        const urlParams = new URLSearchParams(window.location.search);
        const paymentStatus = urlParams.get('status') || '';
        const customerAddress = urlParams.get('customer_address') || '';
        const addressComponents = customerAddress.split(', ');
        const customerEmail = urlParams.get('customer_email') || '';
        const customerPhone = urlParams.get('customer_phone') || '';
        const customerName = urlParams.get('customer_name') || '';
        const dataParam = urlParams.get('data') || '';
        const data = decodeURIComponent(dataParam.replace(/\\%22/g, '\"').replace(/\\%3A/g, ':').replace(/\\%2C/g, ','));
        const embeddedData = data.split('~');

        const embeddedProductID = embeddedData[0].split(':')[1];
        const embeddedQuantity = embeddedData[1].split(':')[1];
        const embeddedColour = embeddedData[2].split(':')[1];
        const embeddedSize = embeddedData[3].split(':')[1];
        const embeddedStartDate = embeddedData[4].split(':')[1];
        const embeddedEndDate = embeddedData[5].split(':')[1];
        const embeddedClerkID = embeddedData[6].split(':')[1];

        const customerInfo = {
            clerkId: embeddedClerkID,
            name: customerName,
            email: customerEmail,
            phone: customerPhone
        };

        const shippingAddress = {
            streetNumber: 'N/A',
            streetName: `${addressComponents[0]}, ${addressComponents[1]}`,
            city: addressComponents[2],
            state: 'N/A',
            postalCode: addressComponents[3],
            country: addressComponents[4],
        };

        const orderItems = [
            {
                product: embeddedProductID,
                colour: embeddedColour,
                size: embeddedSize,
                quantity: embeddedQuantity,
                startDate: embeddedStartDate,
                endDate: embeddedEndDate,
            }
        ];

        const shippingRate = 0; // Adjust if needed
        const totalAmount = parseFloat(urlParams.get('total') || '0');

        if (paymentStatus === 'success') {
            setStatus(paymentStatus);
            handleOrderCreation({
                customerInfo,
                orderItems,
                shippingAddress,
                shippingRate,
                totalAmount
            });
            router.replace("/payment_success");

        } else {
            setStatus('failed');
            router.replace("/payment_failed")
        }

        //setShowPaymentResult(true); // Show payment result after processing

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // Empty dependency array ensures this runs only once on mount

    // Set a timeout to show payment result after 500 milliseconds
    useEffect(() => {
        const timeout = setTimeout(() => {
            setShowPaymentResult(true);
        }, 500);

        return () => clearTimeout(timeout); // Clear the timeout on unmount
    }, []);

    return null; // Render nothing as the component will redirect
};

export default PaymentResult;

export const dynamic = "force-dynamic";
