/*
  Warnings:

  - You are about to drop the column `RoleId` on the `user` table. All the data in the column will be lost.
  - You are about to drop the `role` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `user` DROP FOREIGN KEY `User_RoleId_fkey`;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `RoleId`;

-- DropTable
DROP TABLE `role`;
