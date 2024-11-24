import { Schema, model } from 'mongoose';
import { TOrder } from './order.interface';


const orderSchema = new Schema<TOrder>(
  {
    email: {
      type: String,
      required: [true, 'email is required'],
    },
    product: {
      type: String,
      required: [true, 'product is required'],
    },
    quantity: {
      type: Number,
      required: [true, 'quantity is required'],
    },
    totalPrice: {
      type: Number,
      required: [true, 'totalPrice is required'],
    },
  },
  {
    timestamps: true,
  },
);

export const OrderModel = model<TOrder>('Order', orderSchema);
