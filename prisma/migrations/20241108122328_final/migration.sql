/*
  Warnings:

  - You are about to drop the column `updatedId` on the `UpdatePoint` table. All the data in the column will be lost.
  - Added the required column `updateId` to the `UpdatePoint` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "UpdatePoint" DROP CONSTRAINT "UpdatePoint_updatedId_fkey";

-- AlterTable
ALTER TABLE "UpdatePoint" DROP COLUMN "updatedId",
ADD COLUMN     "updateId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "UpdatePoint" ADD CONSTRAINT "UpdatePoint_updateId_fkey" FOREIGN KEY ("updateId") REFERENCES "Update"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
