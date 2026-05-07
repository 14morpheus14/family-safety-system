-- CreateTable
CREATE TABLE "public"."FamilySync" (
    "id" TEXT NOT NULL,
    "familyId" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FamilySync_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."FamilyMember" (
    "id" TEXT NOT NULL,
    "memberId" TEXT NOT NULL,
    "memberName" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "familySyncId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FamilyMember_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."DeviceState" (
    "id" TEXT NOT NULL,
    "deviceId" TEXT NOT NULL,
    "deviceName" TEXT NOT NULL,
    "protectionEnabled" BOOLEAN NOT NULL,
    "lastSeen" TIMESTAMP(3) NOT NULL,
    "familyMemberId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DeviceState_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."FamilyMember" ADD CONSTRAINT "FamilyMember_familySyncId_fkey" FOREIGN KEY ("familySyncId") REFERENCES "public"."FamilySync"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."DeviceState" ADD CONSTRAINT "DeviceState_familyMemberId_fkey" FOREIGN KEY ("familyMemberId") REFERENCES "public"."FamilyMember"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
