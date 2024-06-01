"use client"

import useCart from '@/lib/hooks/useCart'
import { useUser } from '@clerk/nextjs';
import { MinusCircle, PlusCircle, Trash } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react'


const Cart = () => {
  const router = useRouter();
  const { user } = useUser();
  const cart = useCart();

  const total = cart.cartItems.reduce((acc, cartItem) => acc + cartItem.totalPrice! * cartItem.quantity, 0)
  const totalRounded = parseFloat(total.toFixed(2))

  const isCheckoutDisabled = true;  // Change to false when ready to enable checkout
  const noop = () => { }; // No-operation function

  //api route for payment --------- currently using stripe -------------------------

  const customer = {
    clerkId: user?.id,
    email: user?.emailAddresses[0].emailAddress,
    name: user?.fullName,
  }

  const handleCheckout = async () => {
    try {

      if (!user) {
        router.push("sign-in")
      } else {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/checkout`, {
          method: "POST",
          body: JSON.stringify({ cartItems: cart.cartItems, customer }),
        })
        const data = await res.json();
        window.location.href = data.url;
        console.log(data);
      }
    } catch (err) {
      console.log("[checkout_POST", err)
    }
  }
  //api route for payment --------- currently using stripe -------------------------

  return (
    <div className='flex gap-20 py-16 px-10 max-lg:flex-col'>
      <div className='w-2/3 max-lg:w-full'>
        <p className='text-heading3-bold'>Rental Cart</p>
        <hr className='my-6' />

        {cart.cartItems.length === 0 ? (
          <p className='text-body-bold'>No item in cart</p>
        ) : (
          <div>
            {cart.cartItems.map((cartItem) => (
              // eslint-disable-next-line react/jsx-key
              <div className='w-full flex max-sm:flex-col max-sm:gap-3 hover:bg-grey-1 px-6 py-5 justify-between items-center'>
                <div className='flex items-center'>
                  <Image src={cartItem.item.media[0]} width={100} height={100} className="rounded-lg w-32 h-32 object-cover" alt='product' />
                  <div className='flex flex-col gap-3 ml-4'>
                    <p className='text-body-bold'>{cartItem.item.title}</p>
                    {cartItem.colour && (
                      <p className='text-small-medium'>{cartItem.colour}</p>
                    )}
                    {cartItem.size && (
                      <p className='text-small-medium'>{cartItem.size}</p>
                    )}
                    {cartItem.startDate && (
                      <p className='text-small-medium'>From: {new Date(cartItem.startDate).toLocaleDateString()}</p>
                    )}
                    {cartItem.endDate && (
                      <p className='text-small-medium'>To: {new Date(cartItem.endDate).toLocaleDateString()}</p>
                    )}
                    <p className='text-small-medium'>TT$ {cartItem.totalPrice}</p>
                  </div>
                </div>

                <div className='flex gap-4 items-center'>
                  <MinusCircle className='hover:text-red-1 cursor-pointer' onClick={() => cart.decreaseQuantity(cartItem.item._id)} />
                  <p className='text-body-bold'>{cartItem.quantity}</p>
                  <PlusCircle className='hover:text-red-1 cursor-pointer' onClick={() => cart.increaseQuantity(cartItem.item._id)} />
                </div>

                <Trash className="hover:text-red-1 cursor-pointer" onClick={() => cart.removeItem(cartItem.item._id)} />
              </div>
            ))}
          </div>
        )}
      </div>

      <div className='w-1/3 max-lg:w-full flex flex-col gap-8 bg-grey-1 rounded-lg px-4 py-5'>
        <p className='text-heading4-bold pb-4'>
          Summary <span>{`(${cart.cartItems.length} ${cart.cartItems.length > 1 ? "items" : "item"})`}</span>
        </p>
        <div className='flex justify-between text-body-semibold'>
          <span>Total Amount</span>
          <span>TT$ {totalRounded}</span>
        </div>
        <button
          className={`border rounded-lg text-body-bold bg-white py-3 w-full ${isCheckoutDisabled ? '' : 'hover:bg-black hover:text-white'
            }`}
          onClick={isCheckoutDisabled ? noop : handleCheckout}
          disabled={isCheckoutDisabled}
        >
          Proceed to Checkout
        </button>
        {isCheckoutDisabled && (
          <p className="text-red-500 mt-0.5">Checkout is temporarily disabled. Please visit our Instagram page for updates.</p>
        )}
      </div>
    </div>
  )
}

export default Cart

export const dynamic = "force-dynamic";
