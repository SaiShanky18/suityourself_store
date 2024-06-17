/* eslint-disable react/jsx-key */
import { getOrders } from '@/lib/actions/actions'
import { auth } from '@clerk/nextjs'
import ProductInfo from '@/components/ProductInfo';
import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import { format } from 'date-fns';
import ReserveDates from '@/components/Calendar';

const Orders = async () => {
    const { userId } = auth()
    const orders = await getOrders(userId as string)


    return (
        <div className='px-10 py-5 max-sm:px-3'>
            <p className='text-heading3-bold my-10'>Your Orders</p>
            {!orders || orders.length === 0 && (
                <p className='text-body-bold my-5'>You have no orders yet.</p>
            )}

            <div className='flex flex-col gap-10'>

                {orders?.map((order: OrderType) => (
                    <>
                        <div className='flex flex-col gap-8 p-4 hover:bg-grey-1'>
                            <div className='flex gap-20 max-md:flex-col max-md:gap-3'>
                                <p className='text-base-bold'>Order ID: {order._id}</p>
                                <p className='text-base-bold'>Total Amount (US$): {order.totalAmount}</p>
                            </div>

                            <div className='flex flex-col gap-5'>
                                {order.products.map((orderItem: OrderItemType) => (

                                    <div className='flex gap-4'>
                                        {orderItem.product && (
                                            <Image src={orderItem.product.media?.[0]} alt={orderItem.product.title} width={100} height={100} className='w-32 h-32 object-cover rounded-lg' />
                                        )}

                                        <div className='flex flex-col justify-between'>
                                            {orderItem.product && (
                                                <p className='text-small-medium'>Title:{" "}<span className='text-small-bold'>{orderItem.product.title}</span></p>
                                            )}

                                            {orderItem.colour && (<p className='text-small-medium'>Colour:{" "}<span className='text-small-bold'>{orderItem.colour}</span></p>)}
                                            {orderItem.size && (<p className='text-small-medium'>Size:{" "}<span className='text-small-bold'>{orderItem.size}</span></p>)}
                                            {orderItem.product && (
                                                <p className='text-small-medium'>Unit Price:{" "}<span className='text-small-bold'>TT$ {orderItem.product.price}</span></p>
                                            )}
                                            {orderItem.startDate && orderItem.endDate && (
                                                <p className='text-small-medium'>Rental Period:{" "}<span className='text-small-bold'>{format(orderItem.startDate, 'dd-MM-yyyy')} TO {format(orderItem.endDate, 'dd-MM-yyyy')} </span></p>
                                            )}

                                            <p className='text-small-medium'>Quantity:{" "}<span className='text-small-bold'>{orderItem.quantity}</span></p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                ))}
            </div>

        </div>
    )
}

export default Orders

export const dynamic = "force-dynamic";