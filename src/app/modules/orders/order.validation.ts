import { z } from 'zod';

const orderValidationSchema = z.object({
  email: z
    .string()
    .email({ message: 'Invalid email format' })
    .min(1, { message: 'Email is required' }),
  
  product: z
    .string()
    .min(1, { message: 'Product is required' }),
  
  quantity: z
    .number()
    .min(1, { message: 'Quantity must be at least 1' })
    .int({ message: 'Quantity must be an integer' })
    .positive({ message: 'Quantity must be a positive number' }),
  
  totalPrice: z
    .number()
    .min(0, { message: 'Total price must be a positive number or zero' })
    .positive({ message: 'Total price must be a positive number' })
});

export { orderValidationSchema };
