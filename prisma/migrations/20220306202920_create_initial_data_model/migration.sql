/*
  Warnings:

  - You are about to drop the `Company` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Company";

-- CreateTable
CREATE TABLE "companies" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "postal_code" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "latitude" DECIMAL(4,2),
    "longitude" DECIMAL(4,2),
    "type" TEXT NOT NULL,
    "business_domain" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "modified_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),
    "created_by" INTEGER NOT NULL,
    "modified_by" INTEGER NOT NULL,
    "deleted_by" INTEGER,

    CONSTRAINT "companies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "customers" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "full_name" TEXT NOT NULL,
    "apartment_no" TEXT,
    "phone_number" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "postal_code" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "latitude" DECIMAL(4,2),
    "longitude" DECIMAL(4,2),
    "created_at" TIMESTAMP(3) NOT NULL,
    "modified_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),
    "created_by" INTEGER NOT NULL,
    "modified_by" INTEGER NOT NULL,
    "deleted_by" INTEGER,
    "company_id" TEXT NOT NULL,

    CONSTRAINT "customers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tasks" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "tracking_code" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "currency" TEXT,
    "amount" DECIMAL(10,2) NOT NULL,
    "email" TEXT,
    "vat_in_percent" DECIMAL(2,2) NOT NULL,
    "distance_in_meter" DECIMAL(7,2) NOT NULL,
    "pickup_location" TEXT NOT NULL,
    "dropoff_location" TEXT NOT NULL,
    "custom_dropoff_location" TEXT,
    "pickup_time" TIMESTAMP(3) NOT NULL,
    "actual_pickup_time" TIMESTAMP(3),
    "returned_at" TIMESTAMP(3),
    "drop_off_time" TIMESTAMP(3) NOT NULL,
    "actual_dropoff_time" TIMESTAMP(3),
    "customer_signature_type" TEXT,
    "pickup_comments_for_courier" TEXT,
    "dropoff_comments_for_courier" TEXT,
    "courier_id" INTEGER,
    "order_id" INTEGER,
    "fleet_id" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL,
    "modified_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),
    "created_by" INTEGER NOT NULL,
    "modified_by" INTEGER NOT NULL,
    "deleted_by" INTEGER,
    "company_id" TEXT,
    "customer_id" TEXT,

    CONSTRAINT "tasks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pickupAddresses" (
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

    CONSTRAINT "pickupAddresses_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "companies_id_phone_number_address_key" ON "companies"("id", "phone_number", "address");

-- CreateIndex
CREATE UNIQUE INDEX "customers_id_email_key" ON "customers"("id", "email");

-- CreateIndex
CREATE INDEX "tasks_status_company_id_customer_id_fleet_id_idx" ON "tasks"("status", "company_id", "customer_id", "fleet_id");

-- CreateIndex
CREATE UNIQUE INDEX "tasks_id_key" ON "tasks"("id");

-- CreateIndex
CREATE UNIQUE INDEX "pickupAddresses_id_address_key" ON "pickupAddresses"("id", "address");

-- AddForeignKey
ALTER TABLE "customers" ADD CONSTRAINT "customers_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pickupAddresses" ADD CONSTRAINT "pickupAddresses_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
