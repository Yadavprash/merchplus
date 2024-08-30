/*
  Warnings:

  - You are about to drop the column `price` on the `CartItem` table. All the data in the column will be lost.
  - Added the required column `StyleId` to the `CartItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CartItem" DROP COLUMN "price",
ADD COLUMN     "StyleId" TEXT NOT NULL;
