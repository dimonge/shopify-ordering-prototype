/*
  Warnings:

  - You are about to drop the `pickupAddresses` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "pickupAddresses" DROP CONSTRAINT "pickupAddresses_company_id_fkey";

-- DropTable
DROP TABLE "pickupAddresses";

-- CreateTable
CREATE TABLE "pickup_addresses" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "postal_code" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "is_approved" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "modified_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),
    "created_by" INTEGER NOT NULL,
    "modified_by" INTEGER NOT NULL,
    "deleted_by" INTEGER,
    "company_id" TEXT NOT NULL,

    CONSTRAINT "pickup_addresses_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "pickup_addresses_id_address_key" ON "pickup_addresses"("id", "address");

-- AddForeignKey
ALTER TABLE "pickup_addresses" ADD CONSTRAINT "pickup_addresses_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
