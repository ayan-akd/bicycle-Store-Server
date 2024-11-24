import { Bicycle } from '../bicycleStore/bicycle.model';
import { TOrder } from './order.interface';
import { OrderModel } from './order.model';

const createOrderIntoDb = async (orderData: TOrder) => {
  const bicycle = await Bicycle.findOne({ _id: orderData.product });
  if (!bicycle) {
    throw new Error('Bicycle not found');
  }
  const remainingQuantity = bicycle.quantity - orderData.quantity;
  if (remainingQuantity < 0) {
    throw new Error('Not enough quantity available');
  }
  await Bicycle.findOneAndUpdate(
    { _id: orderData.product },
    {
      quantity: remainingQuantity > 0 ? remainingQuantity : 0,
      inStock: remainingQuantity > 0 ? true : false,
    },
    { new: true },
  );
  const result = await OrderModel.create(orderData);
  return result;
};

const calculateTotalRevenue = async () => {
  const result = await OrderModel.aggregate([
    //pipe 1
    {
      $addFields: {
        product: {
          $toObjectId: '$product',
        },
      },
    },
    //pipe 2
    {
      $lookup: {
        from: 'bicycles',
        localField: 'product',
        foreignField: '_id',
        as: 'bicycleDetails',
      },
    },
    //pipe 3
    {
      $unwind: {
        path: '$bicycleDetails',
      },
    },
    //pipe 4
    {
      $addFields: {
        totalPrice: {
          $multiply: ['$bicycleDetails.price', '$quantity'],
        },
      },
    },
    //pipe 5
    {
      $group: {
        _id: null,
        totalRevenue: {
          $sum: '$totalPrice',
        },
      },
    },
    {
      $project: {
        _id: 0,
        totalRevenue: 1,
      },
    },
  ]);

  if (result.length > 0) {
    return result[0];
  } else {
    return 0;
  }
};

export const OrderServices = {
  createOrderIntoDb,
  calculateTotalRevenue,
};
