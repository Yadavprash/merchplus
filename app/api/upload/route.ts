import { BlobServiceClient } from '@azure/storage-blob';
import { Readable } from 'stream';
import prisma from '@/db';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
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

  const uploadImages = async (files: File[]): Promise<string[]> => {
    const urls: string[] = [];
    await Promise.all(files.map(async (file) => {
      const blobName = name + file.name;
      const blockBlobClient = containerClient.getBlockBlobClient(blobName);
      const buffer = Buffer.from(await file.arrayBuffer());
      const readable = new Readable();
      readable._read = () => {}; // _read is a no-op
      readable.push(buffer);
      readable.push(null); // Signal the end of the stream
      await blockBlobClient.uploadStream(readable);
      urls.push(blockBlobClient.url);
    }));
    return urls;
  };

  try {
    const result = await prisma.$transaction(async (prisma) => {
      const product = await prisma.product.create({
        data: {
          name,
          description,
          size: JSON.parse(sizes),
        },
      });

      const styleImages: { [key: string]: File[] } = {};

      for (const file of images) {
        const styleName = file.name.split('_')[0];
        if (!styleImages[styleName]) {
          styleImages[styleName] = [];
        }
        styleImages[styleName].push(file);
      }

      const createdStyles = await Promise.all(
        styleData.map(async (styleString) => {
          const style = JSON.parse(styleString);
          const styleName = style.name.trim();
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

      return { product, createdStyles };
    },{
      timeout:60000
    });

    return NextResponse.json({
      message: 'Product uploaded successfully!',
      product: {
        ...result.product,
        styles: result.createdStyles,
      },
    });
  } catch (error) {
    console.error("Error in transaction:", error);
    return NextResponse.json({ error: 'Transaction failed' }, { status: 500 });
  }
}
