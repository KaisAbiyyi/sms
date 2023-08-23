-- DropForeignKey
ALTER TABLE `choice` DROP FOREIGN KEY `Choice_QuestionId_fkey`;

-- DropForeignKey
ALTER TABLE `class` DROP FOREIGN KEY `Class_GradeId_fkey`;

-- DropForeignKey
ALTER TABLE `class` DROP FOREIGN KEY `Class_departmentId_fkey`;

-- DropForeignKey
ALTER TABLE `learning_material` DROP FOREIGN KEY `Learning_Material_subject_DetailId_fkey`;

-- DropForeignKey
ALTER TABLE `result` DROP FOREIGN KEY `Result_StudentId_fkey`;

-- DropForeignKey
ALTER TABLE `result` DROP FOREIGN KEY `Result_TestId_fkey`;

-- DropForeignKey
ALTER TABLE `result_detail` DROP FOREIGN KEY `Result_Detail_ChoiceId_fkey`;

-- DropForeignKey
ALTER TABLE `result_detail` DROP FOREIGN KEY `Result_Detail_QuestionId_fkey`;

-- DropForeignKey
ALTER TABLE `result_detail` DROP FOREIGN KEY `Result_Detail_ResultId_fkey`;

-- DropForeignKey
ALTER TABLE `student` DROP FOREIGN KEY `Student_ClassId_fkey`;

-- DropForeignKey
ALTER TABLE `student` DROP FOREIGN KEY `Student_DepartmentId_fkey`;

-- DropForeignKey
ALTER TABLE `student` DROP FOREIGN KEY `Student_GradeId_fkey`;

-- DropForeignKey
ALTER TABLE `student` DROP FOREIGN KEY `Student_UserId_fkey`;

-- DropForeignKey
ALTER TABLE `subject_classes` DROP FOREIGN KEY `Subject_Classes_classId_fkey`;

-- DropForeignKey
ALTER TABLE `subject_classes` DROP FOREIGN KEY `Subject_Classes_subject_DetailId_fkey`;

-- DropForeignKey
ALTER TABLE `subject_detail` DROP FOREIGN KEY `Subject_Detail_TeacherId_fkey`;

-- DropForeignKey
ALTER TABLE `subject_detail` DROP FOREIGN KEY `Subject_Detail_gradeId_fkey`;

-- DropForeignKey
ALTER TABLE `subject_detail` DROP FOREIGN KEY `Subject_Detail_subjectId_fkey`;

-- DropForeignKey
ALTER TABLE `task` DROP FOREIGN KEY `Task_subject_DetailId_fkey`;

-- DropForeignKey
ALTER TABLE `task_report` DROP FOREIGN KEY `Task_Report_TaskId_fkey`;

-- DropForeignKey
ALTER TABLE `teacher` DROP FOREIGN KEY `Teacher_UserId_fkey`;

-- DropForeignKey
ALTER TABLE `test` DROP FOREIGN KEY `Test_subject_DetailId_fkey`;

-- DropForeignKey
ALTER TABLE `user_token` DROP FOREIGN KEY `User_Token_UserId_fkey`;

-- AddForeignKey
ALTER TABLE `User_Token` ADD CONSTRAINT `User_Token_UserId_fkey` FOREIGN KEY (`UserId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Class` ADD CONSTRAINT `Class_GradeId_fkey` FOREIGN KEY (`GradeId`) REFERENCES `Grade`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Class` ADD CONSTRAINT `Class_departmentId_fkey` FOREIGN KEY (`departmentId`) REFERENCES `Department`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Student` ADD CONSTRAINT `Student_UserId_fkey` FOREIGN KEY (`UserId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Student` ADD CONSTRAINT `Student_GradeId_fkey` FOREIGN KEY (`GradeId`) REFERENCES `Grade`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Student` ADD CONSTRAINT `Student_DepartmentId_fkey` FOREIGN KEY (`DepartmentId`) REFERENCES `Department`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Student` ADD CONSTRAINT `Student_ClassId_fkey` FOREIGN KEY (`ClassId`) REFERENCES `Class`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Teacher` ADD CONSTRAINT `Teacher_UserId_fkey` FOREIGN KEY (`UserId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Subject_Detail` ADD CONSTRAINT `Subject_Detail_TeacherId_fkey` FOREIGN KEY (`TeacherId`) REFERENCES `Teacher`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Subject_Detail` ADD CONSTRAINT `Subject_Detail_subjectId_fkey` FOREIGN KEY (`subjectId`) REFERENCES `Subject`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Subject_Detail` ADD CONSTRAINT `Subject_Detail_gradeId_fkey` FOREIGN KEY (`gradeId`) REFERENCES `Grade`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Subject_Classes` ADD CONSTRAINT `Subject_Classes_subject_DetailId_fkey` FOREIGN KEY (`subject_DetailId`) REFERENCES `Subject_Detail`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Subject_Classes` ADD CONSTRAINT `Subject_Classes_classId_fkey` FOREIGN KEY (`classId`) REFERENCES `Class`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Learning_Material` ADD CONSTRAINT `Learning_Material_subject_DetailId_fkey` FOREIGN KEY (`subject_DetailId`) REFERENCES `Subject_Detail`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Task` ADD CONSTRAINT `Task_subject_DetailId_fkey` FOREIGN KEY (`subject_DetailId`) REFERENCES `Subject_Detail`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Task_Report` ADD CONSTRAINT `Task_Report_TaskId_fkey` FOREIGN KEY (`TaskId`) REFERENCES `Task`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Test` ADD CONSTRAINT `Test_subject_DetailId_fkey` FOREIGN KEY (`subject_DetailId`) REFERENCES `Subject_Detail`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Choice` ADD CONSTRAINT `Choice_QuestionId_fkey` FOREIGN KEY (`QuestionId`) REFERENCES `Question`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Result` ADD CONSTRAINT `Result_TestId_fkey` FOREIGN KEY (`TestId`) REFERENCES `Test`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Result` ADD CONSTRAINT `Result_StudentId_fkey` FOREIGN KEY (`StudentId`) REFERENCES `Student`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Result_Detail` ADD CONSTRAINT `Result_Detail_ResultId_fkey` FOREIGN KEY (`ResultId`) REFERENCES `Result`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Result_Detail` ADD CONSTRAINT `Result_Detail_QuestionId_fkey` FOREIGN KEY (`QuestionId`) REFERENCES `Question`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Result_Detail` ADD CONSTRAINT `Result_Detail_ChoiceId_fkey` FOREIGN KEY (`ChoiceId`) REFERENCES `Choice`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
