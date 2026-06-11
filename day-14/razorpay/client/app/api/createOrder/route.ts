import Razorpay from "razorpay";
import dotenv from "dotenv";

// dotenv configuration
dotenv.config();

// create the Razorpay instance
const razorpay = new Razorpay({
    key_id: process.env.KEY_ID || "",
    key_secret: process.env.KEY_SECRET || ""
});

export async function POST() {
    try {
        const order = await razorpay.orders.create({
            amount: 500 * 100,
            currency: "INR"
        });

        console.log("orders: ",order);

        return Response.json({
            status: "success",
            order
        });

    } catch (err: any) {
        return Response.json({
            success: "fail",
            message: err.message
        })
    }

}