/*
  Warnings:

  - You are about to drop the column `classId` on the `subject_detail` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `subject_detail` DROP FOREIGN KEY `Subject_Detail_classId_fkey`;

-- AlterTable
ALTER TABLE `subject_detail` DROP COLUMN `classId`;

-- CreateTable
CREATE TABLE `Subject_Classes` (
    `id` VARCHAR(191) NOT NULL,
    `subject_DetailId` VARCHAR(191) NOT NULL,
    `classId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Subject_Classes` ADD CONSTRAINT `Subject_Classes_subject_DetailId_fkey` FOREIGN KEY (`subject_DetailId`) REFERENCES `Subject_Detail`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Subject_Classes` ADD CONSTRAINT `Subject_Classes_classId_fkey` FOREIGN KEY (`classId`) REFERENCES `Class`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
