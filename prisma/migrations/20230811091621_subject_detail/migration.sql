/*
  Warnings:

  - Added the required column `name` to the `Subject_Detail` table without a default value. This is not possible if the table is not empty.
  - Made the column `subjectId` on table `subject_detail` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `subject_detail` DROP FOREIGN KEY `Subject_Detail_subjectId_fkey`;

-- AlterTable
ALTER TABLE `subject_detail` ADD COLUMN `name` VARCHAR(191) NOT NULL,
    MODIFY `subjectId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Subject_Detail` ADD CONSTRAINT `Subject_Detail_subjectId_fkey` FOREIGN KEY (`subjectId`) REFERENCES `Subject`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
