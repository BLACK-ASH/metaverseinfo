import mongoose, { Schema } from "mongoose";

const orderStatuses = ["processing", "shipped", "delivered", "cancelled"];
const paymentStatuses = ["pending", "paid", "failed"];

const OrderSchema = new Schema({
    orderID: { type: String, required: true, unique: true }, // e.g. Razorpay order_id or custom UUID

    user: { type: Schema.Types.ObjectId, ref: "User", required: true }, // link to buyer

    items: [
        {
            product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
            quantity: { type: Number, required: true },
        }
    ],

    totalPrice: { type: Number, required: true },

    // Payment details
    paymentStatus: { type: String, enum: paymentStatuses, default: "pending" },
    paymentId: { type: String },   // Razorpay/Stripe ID
    receipt: { type: String },     // can be optional

    // Order status
    orderStatus: { type: String, enum: orderStatuses, default: "processing" },

    // Shipping details
    shippingAddress: {
        street: String,
        city: String,
        state: String,
        zip: String,
        country: String
    }
}, { timestamps: true });

const Order = mongoose.models.Order || mongoose.model("Order", OrderSchema);

export default Order;
