-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'DONOR', 'REQUESTER');

-- CreateEnum
CREATE TYPE "OfferStatus" AS ENUM ('DRAFT', 'PENDING_REVIEW', 'PUBLISHED', 'SUSPENDED', 'CLOSED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "Category" AS ENUM ('SOCIAL', 'PROFESSIONAL', 'COMMUNITY');

-- CreateEnum
CREATE TYPE "RequestStatus" AS ENUM ('RECEIVED', 'UNDER_REVIEW', 'VALIDATED', 'PRESENTED', 'MATCHED', 'CLOSED', 'REJECTED');

-- CreateEnum
CREATE TYPE "ProposalStatus" AS ENUM ('NEW', 'UNDER_REVIEW', 'PROCESSED', 'REJECTED');

-- CreateEnum
CREATE TYPE "ReportStatus" AS ENUM ('NEW', 'UNDER_REVIEW', 'RESOLVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "ReportReason" AS ENUM ('MISLEADING_INFO', 'PAYMENT_REQUEST', 'SUSPICIOUS_BEHAVIOR', 'SUSPECTED_FRAUD', 'OTHER');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'ADMIN',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DonationOffer" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "donorMessage" TEXT,
    "amount" DECIMAL(12,2) NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'EUR',
    "category" "Category" NOT NULL,
    "criteria" TEXT,
    "status" "OfferStatus" NOT NULL DEFAULT 'PENDING_REVIEW',
    "publishedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DonationOffer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SupportRequest" (
    "id" TEXT NOT NULL,
    "reference" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "projectDescription" TEXT NOT NULL,
    "donorMessage" TEXT,
    "status" "RequestStatus" NOT NULL DEFAULT 'RECEIVED',
    "internalNote" TEXT,
    "offerId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SupportRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DonationProposal" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "organization" TEXT,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "amount" DECIMAL(12,2) NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'EUR',
    "supportType" TEXT NOT NULL,
    "criteria" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "status" "ProposalStatus" NOT NULL DEFAULT 'NEW',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DonationProposal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Report" (
    "id" TEXT NOT NULL,
    "offerName" TEXT NOT NULL,
    "offerUrl" TEXT NOT NULL,
    "offerId" TEXT,
    "reason" "ReportReason" NOT NULL,
    "description" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "status" "ReportStatus" NOT NULL DEFAULT 'NEW',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "resolvedAt" TIMESTAMP(3),

    CONSTRAINT "Report_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContactMessage" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ContactMessage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "SupportRequest_reference_key" ON "SupportRequest"("reference");

-- AddForeignKey
ALTER TABLE "SupportRequest" ADD CONSTRAINT "SupportRequest_offerId_fkey" FOREIGN KEY ("offerId") REFERENCES "DonationOffer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_offerId_fkey" FOREIGN KEY ("offerId") REFERENCES "DonationOffer"("id") ON DELETE SET NULL ON UPDATE CASCADE;
