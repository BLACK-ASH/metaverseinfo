import mongoose, { Schema } from "mongoose";

const orderStatuses = ["processing", "shipped", "delivered", "cancelled"];
const paymentStatuses = ["pending", "paid", "failed"];

const OrderSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  addressState: { type: String, required: true },
  addressCity: { type: String, required: true },
  addresszip: { type: String, required: true },
  fullAddress: { type: String, required: true },
  
  items: [
    {
      name: { type: String, required: true },
      product: { type: Schema.Types.ObjectId, ref: "Products", required: true },
      quantity: { type: Number, required: true },
    },
  ],
  totalPrice: { type: Number, required: true },
  
  paymentOrderId: { type: String, required: true, unique: true },
  paymentStatus: { type: String, enum: paymentStatuses, default: "pending" },
  paymentId: { type: String },
  receipt: { type: String },
  orderStatus: { type: String, enum: orderStatuses, default: "processing" },

}, { timestamps: true });

// Use singular "Order" consistently
const Order = mongoose.models.Order || mongoose.model("Order", OrderSchema);

export default Order;
