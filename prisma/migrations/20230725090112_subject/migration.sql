/*
  Warnings:

  - You are about to drop the column `SubjectId` on the `learning_material` table. All the data in the column will be lost.
  - You are about to drop the column `SubjectId` on the `task` table. All the data in the column will be lost.
  - You are about to drop the column `SubjectId` on the `test` table. All the data in the column will be lost.
  - You are about to drop the `subject_teacher` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `learning_material` DROP FOREIGN KEY `Learning_Material_SubjectId_fkey`;

-- DropForeignKey
ALTER TABLE `subject_teacher` DROP FOREIGN KEY `Subject_Teacher_TeacherId_fkey`;

-- DropForeignKey
ALTER TABLE `subject_teacher` DROP FOREIGN KEY `Subject_Teacher_subjectId_fkey`;

-- DropForeignKey
ALTER TABLE `task` DROP FOREIGN KEY `Task_SubjectId_fkey`;

-- DropForeignKey
ALTER TABLE `test` DROP FOREIGN KEY `Test_SubjectId_fkey`;

-- AlterTable
ALTER TABLE `learning_material` DROP COLUMN `SubjectId`,
    ADD COLUMN `subject_DetailId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `task` DROP COLUMN `SubjectId`,
    ADD COLUMN `subject_DetailId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `test` DROP COLUMN `SubjectId`,
    ADD COLUMN `subject_DetailId` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `subject_teacher`;

-- CreateTable
CREATE TABLE `Subject_Detail` (
    `id` VARCHAR(191) NOT NULL,
    `TeacherId` VARCHAR(191) NULL,
    `subjectId` VARCHAR(191) NULL,
    `classId` VARCHAR(191) NULL,
    `gradeId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Subject_Detail` ADD CONSTRAINT `Subject_Detail_TeacherId_fkey` FOREIGN KEY (`TeacherId`) REFERENCES `Teacher`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Subject_Detail` ADD CONSTRAINT `Subject_Detail_subjectId_fkey` FOREIGN KEY (`subjectId`) REFERENCES `Subject`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Subject_Detail` ADD CONSTRAINT `Subject_Detail_classId_fkey` FOREIGN KEY (`classId`) REFERENCES `Class`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Subject_Detail` ADD CONSTRAINT `Subject_Detail_gradeId_fkey` FOREIGN KEY (`gradeId`) REFERENCES `Grade`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Learning_Material` ADD CONSTRAINT `Learning_Material_subject_DetailId_fkey` FOREIGN KEY (`subject_DetailId`) REFERENCES `Subject_Detail`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Task` ADD CONSTRAINT `Task_subject_DetailId_fkey` FOREIGN KEY (`subject_DetailId`) REFERENCES `Subject_Detail`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Test` ADD CONSTRAINT `Test_subject_DetailId_fkey` FOREIGN KEY (`subject_DetailId`) REFERENCES `Subject_Detail`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
