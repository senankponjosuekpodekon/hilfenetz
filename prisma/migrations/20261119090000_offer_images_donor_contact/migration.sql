-- AlterTable
ALTER TABLE "DonationOffer" ADD COLUMN     "donorPhotoUrl" TEXT;
ALTER TABLE "DonationOffer" ADD COLUMN     "donorEmail" TEXT;
ALTER TABLE "DonationOffer" ADD COLUMN     "donorPhone" TEXT;

-- CreateTable
CREATE TABLE "OfferImage" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "position" INTEGER NOT NULL DEFAULT 0,
    "offerId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "OfferImage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "OfferImage" ADD CONSTRAINT "OfferImage_offerId_fkey" FOREIGN KEY ("offerId") REFERENCES "DonationOffer"("id") ON DELETE CASCADE ON UPDATE CASCADE;
