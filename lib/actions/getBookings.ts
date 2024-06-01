import Order from "../models/Order";
import { connectToDB } from "../mongoDB"
import mongoose from 'mongoose';

export const getBookings = async (productId: string) => {
    console.log('Product ID:', productId);

    try {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);

        await connectToDB();

        const objectId = new mongoose.Types.ObjectId(productId);

        const bookings = await Order.find({
            "products": {
                $elemMatch: {
                    "product": objectId, // Correctly access the product ID
                    "endDate": {
                        $gt: yesterday,
                    }
                }
            }
        });
        
        if (bookings.length > 0) {
            console.log("Bookings:", bookings);
            return bookings;
        } else {
            console.log("No bookings found");
            return [];
        }

    } catch (error: any) {
        console.error(error);
        throw new Error(error.message);
    }
}
