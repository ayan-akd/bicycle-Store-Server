import { Schema, model } from 'mongoose';
import { TBicycle } from './bicycle.interface';

const bicycleSchema = new Schema<TBicycle>(
  {
    name: {
      type: String,
      required: [true, 'name is required'],
    },
    brand: {
      type: String,
      required: [true, 'brand is required'],
    },
    price: {
      type: Number,
      required: [true, 'price is required'],
    },
    type: {
      type: String,
      enum: ['Mountain', 'Road', 'Hybrid', 'BMX', 'Electric'],
      required: [true, 'type is required'],
    },
    description: {
      type: String,
      required: [true, 'description is required'],
    },
    quantity: {
      type: Number,
      required: [true, 'quantity is required'],
    },
    inStock: {
      type: Boolean,
      required: [true, 'inStock is required'],
    },
  },
  {
    timestamps: true,
  },
);

export const Bicycle = model<TBicycle>('Bicycle', bicycleSchema);
