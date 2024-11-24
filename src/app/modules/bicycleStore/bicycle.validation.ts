import { z } from 'zod';

const bicycleValidationSchema = z.object({
  name: z.string().min(1, { message: 'name is required' }),
  brand: z.string().min(1, { message: 'brand is required' }),
  price: z.number().positive({ message: 'price must be a positive number' }),
  type: z.enum(['Mountain', 'Road', 'Hybrid', 'BMX', 'Electric'], {
    errorMap: () => ({
      message: 'type must be one of Mountain, Road, Hybrid, BMX, or Electric',
    }),
  }),
  description: z.string().min(1, { message: 'description is required' }),
  quantity: z
    .number()
    .int({ message: 'quantity must be an integer' })
    .positive({ message: 'quantity must be greater than 0' }),
  inStock: z.boolean().refine((val) => typeof val === 'boolean', {
    message: 'inStock must be true of false',
  }),
});

export { bicycleValidationSchema };
