/*
  Warnings:

  - You are about to drop the column `Quote` on the `quote` table. All the data in the column will be lost.
  - Added the required column `quote` to the `Quote` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `quote` DROP COLUMN `Quote`,
    ADD COLUMN `quote` TEXT NOT NULL;
