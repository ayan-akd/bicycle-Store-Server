/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { OrderServices } from './order.service';
import { orderValidationSchema } from './order.validation';

const createOrder = async (req: Request, res: Response) => {
  try {
    const { order: orderData } = req.body;
    const zodParseData = orderValidationSchema.parse(orderData);
    const result = await OrderServices.createOrderIntoDb(zodParseData);
    res.status(200).json({
      message: 'Order created successfully',
      success: true,
      data: result,
    });
  } catch (err: any) {
    const errorResponse: any = {
      success: false,
      message: err.message || 'Something went wrong',
      error: {
        issues: err.issues || [],
        name: err.name || 'Error',
      },
    };
    if (err.stack) {
      errorResponse.stack = err.stack;
    }
    res.status(500).json(errorResponse);
  }
};

const orderRevenue = async (req: Request, res: Response) => {
  try {
    const result = await OrderServices.calculateTotalRevenue();
    res.status(200).json({
      message: 'Revenue calculated successfully',
      success: true,
      data: result,
    });
  } catch (err: any) {
    const errorResponse: any = {
      success: false,
      message: err.message || 'Something went wrong',
      error: {
        issues: err.issues || [],
        name: err.name || 'Error',
      },
    };
    if (err.stack) {
      errorResponse.stack = err.stack;
    }
    res.status(500).json(errorResponse);
  }
};

export const OrderController = {
  createOrder,
  orderRevenue,
};