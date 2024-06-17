import { connectToDB } from "@/lib/mongoDB";
import Customer from '@/lib/models/Customer';
import Order from '@/lib/models/Order';
import { NextRequest, NextResponse } from "next/server";

// Helper function to parse dates
const parseDate = (dateString: string) => {
    // Append missing parts if necessary to match ISO format
    if (!dateString.includes(':')) {
        dateString += ':00:00';
    } else if (dateString.split(':').length === 2) {
        dateString += ':00';
    }
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? null : date;
};

// Handler function for POST method
export const POST = async (req: NextRequest) => {
    try {
        const { customerInfo, orderItems, shippingAddress, shippingRate, totalAmount } = await req.json();

        const customerInfo1 = {
            clerkId: customerInfo.clerkId,
            name: customerInfo.name,
            email: customerInfo.email,
            phone: customerInfo.phone,
        };

        console.log("This is customer info:", customerInfo1);

        const shippingAddress1 = {
            streetNumber: shippingAddress.streetNumber,
            streetName: shippingAddress.streetName,
            city: shippingAddress.city,
            state: shippingAddress.state,
            postalCode: shippingAddress.postalCode,
            country: shippingAddress.country,
        };

        console.log("This is shipping address:", shippingAddress1);

        const orderItems1 = orderItems?.map((item: any) => {
            const startDate = parseDate(item.startDate);
            const endDate = parseDate(item.endDate);

            if (!startDate || !endDate) {
                throw new Error(`Invalid date format in order items: ${item.startDate} or ${item.endDate}`);
            }

            return {
                product: item.product,
                colour: item.colour || "N/A",
                size: item.size || "N/A",
                quantity: parseInt(item.quantity, 10),
                startDate: startDate,
                endDate: endDate,
            };
        });

        console.log("This is order:", orderItems1);

        await connectToDB();

        const newOrder = new Order({
            customerClerkId: customerInfo1.clerkId,
            customerPhone: customerInfo1.phone,
            products: orderItems1,
            shippingAddress: shippingAddress1,
            shippingRate: shippingRate,
            totalAmount: totalAmount,
        });

        console.log("This is the new order:", newOrder);

        await newOrder.save();

        let customer = await Customer.findOne({ clerkId: customerInfo.clerkId });

        if (customer) {
            customer.orders.push(newOrder._id);
        } else {
            customer = new Customer({
                ...customerInfo1,
                orders: [newOrder._id],
            });
        }

        await customer.save();

        return new NextResponse("Order Created", { status: 200 });

    } catch (err) {
        console.log('[webhooks_POST]', err);
        return new NextResponse("Failed to create the order", { status: 500 });
    }
};

export const dynamic = "force-dynamic";
