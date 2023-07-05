-- AlterTable
ALTER TABLE `user` ADD COLUMN `role` ENUM('superuser', 'admin', 'teacher', 'student') NOT NULL DEFAULT 'student';
