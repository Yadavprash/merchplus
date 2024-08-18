// app/api/upload/route.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import { BlobServiceClient } from '@azure/storage-blob';
import { Readable } from 'stream';
import prisma from '@/db';
import { NextResponse } from 'next/server';


export async function POST(request: Request) {
  const formData = await request.formData();
  const name = formData.get('name') as string;
  const description = formData.get('description') as string;
  const price = formData.get('price') as string;
  const images = formData.getAll('images');

 
  if (!images || !name || !description || !price) {
    return NextResponse.json({ error: 'Missing required fields' });
  }


  const AZURE_STORAGE_CONNECTION_STRING = process.env.AZURE_STORAGE_CONNECTION_STRING;

  if (!AZURE_STORAGE_CONNECTION_STRING) {
    throw new Error("Azure Storage Connection string is not defined");
  }

  const blobServiceClient = BlobServiceClient.fromConnectionString  (AZURE_STORAGE_CONNECTION_STRING);


  const containerClient = blobServiceClient.getContainerClient('merchplusproducts'); 

  const imageUrls: string[] = [];

  for (const file of images) {
    const blobName = (file as File).name;
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    const fileBlob = file as Blob;
    const buffer = Buffer.from(await fileBlob.arrayBuffer());
    const readable = new Readable();
    readable._read = () => {}; // _read is a no-op
    readable.push(buffer);
    readable.push(null); // Signal the end of the stream
    await blockBlobClient.uploadStream(readable);
    imageUrls.push(blockBlobClient.url);
  }

  // Save the product in the database
  const product = await prisma.product.create({
    data: {
      name: name,
      description: description,
      price: parseFloat(price),
      Image: {
        create: imageUrls.map((url) => ({ url })),
      },
    },
    include: {
      Image: true,
    },
  });


  return NextResponse.json({
    msg: "File recieved"
  })
}
