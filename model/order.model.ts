import mongoose from "mongoose";
import { IOrder } from "../interface/IOrder";

const orderSchema = new mongoose.Schema<IOrder>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "products",
        },
        quantity: {
          type: Number,
        },
      },
    ],
    totalAmount: {
      type: Number,
    },
    isDelete: {
      type: Boolean,
      default: false,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export default mongoose.model('orders', orderSchema);
