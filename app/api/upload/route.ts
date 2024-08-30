// app/api/upload/route.ts  ChatGPT code
import { BlobServiceClient } from '@azure/storage-blob';
import { Readable } from 'stream';
import prisma from '@/db';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  console.log("hi");
  const formData = await request.formData();
  const name = formData.get('name') as string;
  const description = formData.get('description') as string;
  const sizes = formData.get('sizes') as string;
  const categoryid = formData.get('categoryid') as string;
  const styleData = formData.getAll('styles') as string[];
  const images = formData.getAll('images') as File[];

  if (!name || !sizes || !styleData.length || !images.length) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const AZURE_STORAGE_CONNECTION_STRING = process.env.AZURE_STORAGE_CONNECTION_STRING;

  if (!AZURE_STORAGE_CONNECTION_STRING) {
    throw new Error('Azure Storage Connection string is not defined');
  }

  const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);
  const containerClient = blobServiceClient.getContainerClient('merchplusproducts');

  // Helper function to upload images and get their URLs
  const uploadImages = async (files: File[]): Promise<string[]> => {
    const urls: string[] = [];
    for (const file of files) {
      const blobName = name + file.name;
      const blockBlobClient = containerClient.getBlockBlobClient(blobName);
      const buffer = Buffer.from(await file.arrayBuffer());
      const readable = new Readable();
      readable._read = () => {}; // _read is a no-op
      readable.push(buffer);
      readable.push(null); // Signal the end of the stream
      await blockBlobClient.uploadStream(readable);
      urls.push(blockBlobClient.url);
    }
    return urls;
  };

  // Create the product first
  const product = await prisma.product.create({
    data: {
      name,
      description,
      size: JSON.parse(sizes),
    },
  });

  // Process styles and images
  const styleImages: { [key: string]: File[] } = {};

  // Map images to styles
  for (const file of images) {
    const styleName = file.name.split('_')[0]; // Example: Use prefix to identify style
    if (!styleImages[styleName]) {
      styleImages[styleName] = [];
    }
    styleImages[styleName].push(file);
  }

  // Create styles with their images
  const createdStyles = await Promise.all(
    styleData.map(async (styleString) => {
      const style = JSON.parse(styleString);
      const styleName = style.name;
      const stylePrice = parseFloat(style.price);

      const styleImageFiles = styleImages[styleName] || [];
      const styleImageUrls = await uploadImages(styleImageFiles);

      return prisma.style.create({
        data: {
          name: styleName,
          price: stylePrice,
          productId: product.id,
          images: {
            create: styleImageUrls.map((url) => ({
              url,
            })),
          },
        },
      });
    })
  );

  return NextResponse.json({
    message: 'Product uploaded successfully!',
    product: {
      ...product,
      styles: createdStyles,
    },
  });
}
