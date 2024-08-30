import { z } from 'zod';

export const productSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    description: z.string().optional(),
    sizes: z.string(),
    categoryid: z.string().optional(),
    styles: z.array(z.object({
      name: z.string().min(1, 'Style name is required'),
      price: z.number().min(0, 'Price must be positive'),
      images: z.array(z.instanceof(File)).nonempty('At least one image is required'),
    })),
  });
  
 export type ProductFormData = z.infer<typeof productSchema>;
