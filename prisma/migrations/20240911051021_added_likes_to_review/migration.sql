/*
  Warnings:

  - Added the required column `likes` to the `Review` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Review" ADD COLUMN     "likes" INTEGER NOT NULL;
