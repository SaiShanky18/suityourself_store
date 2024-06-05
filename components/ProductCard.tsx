"use client"

import { useUser } from '@clerk/nextjs';
import { Heart } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import HeartFavourite from './HeartFavourite';

interface ProductCardProps {
    product: ProductType;
    updateSignedInUser?: (updatedUser: UserType) => void
}

const ProductCard = ({ product, updateSignedInUser }: ProductCardProps) => {
    const router = useRouter();

    return (
        <Link href={`/products/${product._id}`} className='lrg:w-[220px] flex flex-col gap-2 sml:w-[40%]'>
            <Image src={product.media[0]} alt='product' width={250} height={300} className='lrg:h-[250px] rounded-lg object-cover' />
            <div>
                <p className='text-base-bold'>{product.title}</p>
                <p className='text-small-medium text-grey-2'>{product.category}</p>
            </div>
            <div className='flex justify-between items-center'>
                <p className='text-body-bold'>TT${product.price}</p>

                <HeartFavourite product={product} updateSignedInUser={updateSignedInUser}/>

            </div>
        </Link>
    )
}

export default ProductCard
