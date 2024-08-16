-- CreateTable
CREATE TABLE "Command" (
    "CommandId" TEXT NOT NULL,
    "CommandProducts" TEXT[],
    "userId" TEXT NOT NULL,

    CONSTRAINT "Command_pkey" PRIMARY KEY ("CommandId")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "productName" TEXT NOT NULL,
    "productPrice" DOUBLE PRECISION NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Command" ADD CONSTRAINT "Command_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
