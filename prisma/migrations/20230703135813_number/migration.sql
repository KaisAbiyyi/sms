/*
  Warnings:

  - A unique constraint covering the columns `[studentNumber]` on the table `students` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[teacherNumber]` on the table `teachers` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `studentNumber` to the `students` table without a default value. This is not possible if the table is not empty.
  - Added the required column `teacherNumber` to the `teachers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `students` ADD COLUMN `studentNumber` BIGINT NOT NULL;

-- AlterTable
ALTER TABLE `teachers` ADD COLUMN `teacherNumber` BIGINT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `students_studentNumber_key` ON `students`(`studentNumber`);

-- CreateIndex
CREATE UNIQUE INDEX `teachers_teacherNumber_key` ON `teachers`(`teacherNumber`);
