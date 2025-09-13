import mongoose, { Schema } from "mongoose";

const orderStatuses = ["processing", "shipped", "delivered", "cancelled"];
const paymentStatuses = ["pending", "paid", "failed"];

const OrderSchema = new Schema({
  orderID: { type: String, required: true, unique: true },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  items: [
    {
      product: { type: Schema.Types.ObjectId, ref: "Products", required: true },
      quantity: { type: Number, required: true },
    },
  ],
  totalPrice: { type: Number, required: true },
  paymentStatus: { type: String, enum: paymentStatuses, default: "pending" },
  paymentId: { type: String },
  receipt: { type: String },
  orderStatus: { type: String, enum: orderStatuses, default: "processing" },
  shippingAddress: {
    street: String,
    city: String,
    state: String,
    zip: String,
    country: String,
  },
}, { timestamps: true });

// Use singular "Order" consistently
const Order = mongoose.models.Order || mongoose.model("Order", OrderSchema);

export default Order;
