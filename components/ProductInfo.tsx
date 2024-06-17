"use client"

import React, { useEffect, useMemo, useState } from 'react';
import HeartFavourite from './HeartFavourite';
import { MinusCircle, PlusCircle } from 'lucide-react';
import useCart from '@/lib/hooks/useCart';
import ReserveDates from './Calendar';
import { DateRange } from 'react-day-picker';
import { addDays, differenceInCalendarDays, eachDayOfInterval } from 'date-fns';
import { getOrders } from '@/lib/actions/actions';
import { auth } from '@clerk/nextjs';
import { Checkbox } from "@/components/ui/checkbox"
import { CheckboxWithText } from './Checkbox';
import { useRouter } from 'next/navigation';


const ProductInfo = ({ productInfo, productOrders }: { productInfo: ProductType, productOrders: OrderType }) => {
    const [selectedColour, setSelectedColour] = useState<string>(productInfo.colours[0]);
    const [selectedSize, setSelectedSize] = useState<string>(productInfo.sizes[0]);
    const [quantity, setQuantity] = useState<number>(1);
    const [dates, setDates] = useState<DateRange | undefined>();
    const [totalPrice, setTotalPrice] = useState(productInfo.price);
    const [periods, setPeriods] = useState(0);
    const [isChecked, setIsChecked] = useState(false);
    const [error, setError] = useState('');

    const cart = useCart();
    const router = useRouter();

    useEffect(() => {
        if (dates && dates.from && dates.to) {
            const periodCount = Math.ceil((differenceInCalendarDays(
                dates.to,
                dates.from
            )) / 3);

            setPeriods(periodCount);

            if (periodCount && productInfo.price) {
                setTotalPrice(periodCount * productInfo.price);
            } else {
                setTotalPrice(productInfo.price);
            }
        }
    }, [dates, productInfo.price]);

    const disabledDates = useMemo(() => {
        let dates: Date[] = [];

        productOrders?.forEach((productOrder: OrderType) => {
            productOrder.products.forEach((productOrderItem: OrderItemType) => {
                const range = eachDayOfInterval({
                    start: new Date(productOrderItem.startDate),
                    end: new Date(productOrderItem.endDate)
                });
                dates = [...dates, ...range];
            });
        });

        return dates;
    }, [productOrders]);

    const handleAddToCart = () => {
        if (cart.cartItems.length >= 1) {
            <p style={{ color: 'red' }}>You can only add one item to the cart at a time. Please add it to your Wishlist if you wish to save another item for later.</p>
        } else {

            cart.addItem({
                item: productInfo,
                quantity,
                colour: selectedColour,
                size: selectedSize,
                startDate: dates?.from,
                endDate: dates?.to,
                totalPrice,
            });

            router.push('/cart'); // Navigate to cart page


        }
    };

    return (
        <div className='max-w-[400px] flex flex-col gap-4'>
            <div className='flex justify-between items-center'>
                <p className='text-heading3-bold'>{productInfo.title}</p>
                <HeartFavourite product={productInfo} />
            </div>

            <div className='flex gap-2'>
                <p className='text-base-medium text-grey-2'>Category</p>
                <p className='text-base-bold'>{productInfo.category}</p>
            </div>

            <div className='relative group hover:opacity-100'>
                <p className='text-heading3-bold'>TT${productInfo.price}*</p>
                <span className='absolute top-full left-0 w-full text-center text-base-medium opacity-0 transition-opacity duration-300 transform scale-0 group-hover:opacity-80 group-hover:scale-100 bg-black text-white py-3 px-4 rounded-lg my-2'>*per 3-day rental period (or any part thereof).</span>
            </div>

            <div className='flex flex-col gap-2'>
                <p className='text-base-medium text-grey-2'>Description</p>
                <p className='text-small-medium'>{productInfo.description}</p>
            </div>

            {productInfo.colours.length > 0 && (
                <div className='flex flex-col gap-2'>
                    <p className='text-base-medium text-grey-2'>Colours</p>
                    <div className='flex gap-2'>
                        {productInfo.colours.map((colour, index) => (
                            <p key={index} className={`border border-black px-2 py-1 rounded-lg cursor-pointer ${selectedColour === colour && "bg-black text-white"}`}
                                onClick={() => setSelectedColour(colour)}
                            >
                                {colour}
                            </p>
                        ))}
                    </div>
                </div>
            )}

            {productInfo.sizes.length > 0 && (
                <div className='flex flex-col gap-2'>
                    <p className='text-base-medium text-grey-2'>Sizes</p>
                    <p className='text-small-medium text-grey-2'>Please refer to our <a href="/sizing-chart.pdf" target="_blank" className="text-black-500 underline">Sizing Chart</a></p>
                    <div className='flex gap-2'>
                        {productInfo.sizes.map((size, index) => (
                            <p key={index} className={`border border-black px-2 py-1 rounded-lg cursor-pointer ${selectedSize === size && "bg-black text-white"}`}
                                onClick={() => setSelectedSize(size)}
                            >
                                {size}
                            </p>
                        ))}
                    </div>
                </div>
            )}

            {/*
            <div className='flex flex-col gap-2'>
                <p className='text-base-medium text-grey-2'>Quantity</p>
                <div className='flex gap-4 items-center'>
                    <MinusCircle className='hover:text-red-1 cursor-pointer' onClick={() => quantity > 1 && setQuantity(quantity - 1)} />
                    <p className='text-body-bold'>{quantity}</p>
                    <PlusCircle className='hover:text-red-1 cursor-pointer' onClick={() => setQuantity(quantity + 1)} />
                </div>
            </div>
            */}

            <div className='flex flex-col gap-2'>
                <p className='text-base-medium text-grey-2'>Rental Dates</p>
                <div className='flex gap-2'>
                    <ReserveDates date={dates} setDate={setDates} disabledDates={disabledDates} setError={setError} />
                </div>

                {error ? (
                    <div style={{ color: 'red' }}>{error}</div>
                ) : (
                    periods > 0 && (
                        <div>Total Price: <span>TT${totalPrice}</span> for <span>{periods} rental period/s.</span></div>
                    )
                )}

            </div>

            <div className='flex flex-col gap-2 py-5'>
                {/* Pass the checkbox state updater to the CheckboxWithText component */}
                <CheckboxWithText isChecked={isChecked} setIsChecked={setIsChecked} />
            </div>

            {dates?.to && dates?.from && isChecked && cart.cartItems.length == 0 ? (
                <button className='outline text-base-bold py-3 rounded-lg hover:bg-black hover:text-white' onClick={handleAddToCart}>
                    Add to Cart
                </button>
            ) : (
                cart.cartItems.length > 0 && (
                    <p style={{ color: 'red' }}>You can only add one item to the cart at a time. Please add it to your Wishlist if you wish to save another item for later.</p>  
                )
            )}



        </div>
    );
};

export default ProductInfo;
