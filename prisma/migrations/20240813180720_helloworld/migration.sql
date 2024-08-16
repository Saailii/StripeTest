/*
  Warnings:

  - You are about to drop the column `CommandProducts` on the `Command` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Command" DROP COLUMN "CommandProducts";

-- CreateTable
CREATE TABLE "CommandProduct" (
    "id" TEXT NOT NULL,
    "commandId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,

    CONSTRAINT "CommandProduct_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CommandProduct_commandId_productId_key" ON "CommandProduct"("commandId", "productId");

-- AddForeignKey
ALTER TABLE "CommandProduct" ADD CONSTRAINT "CommandProduct_commandId_fkey" FOREIGN KEY ("commandId") REFERENCES "Command"("CommandId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommandProduct" ADD CONSTRAINT "CommandProduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
