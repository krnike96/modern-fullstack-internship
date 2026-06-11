import crypto from "crypto";
import dotenv from "dotenv";

dotenv.config();

export async function POST(req: Request) {
    const body = await req.json();
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = body;

    const generatedSignature = crypto.createHmac("sha256", process.env.KEY_SECRET!)
        .update(razorpay_order_id + "|" + razorpay_payment_id)
        .digest("hex");

    const isValid = razorpay_signature === generatedSignature;

    if (!isValid) {
        return Response.json({
            success: false
        });
    }
    console.log("rz_pay payment: ",razorpay_payment_id);
    console.log("rz_pay order_id: ",razorpay_order_id);
    console.log("rz_pay signature: ",razorpay_signature);

    return Response.json({
        success: true
    });
}

// get payment_id, order_id, signature from request objext
// generate a signature
// match the signatire with the returned razorpay signature
// if (match) -> return Response as success otherwise fail