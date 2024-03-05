/*
  Warnings:

  - You are about to drop the column `nom` on the `aliment` table. All the data in the column will be lost.
  - You are about to drop the column `nom` on the `box` table. All the data in the column will be lost.
  - You are about to drop the column `nom` on the `flavor` table. All the data in the column will be lost.
  - You are about to drop the `boxr` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `reservation` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `name` to the `aliment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `box` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `flavor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `aliment` DROP COLUMN `nom`,
    ADD COLUMN `name` VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE `box` DROP COLUMN `nom`,
    ADD COLUMN `name` VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE `flavor` DROP COLUMN `nom`,
    ADD COLUMN `name` VARCHAR(255) NOT NULL;

-- DropTable
DROP TABLE `boxr`;

-- DropTable
DROP TABLE `reservation`;

-- AddForeignKey
ALTER TABLE `aliment` ADD CONSTRAINT `aliment_ibfk_1` FOREIGN KEY (`idBox`) REFERENCES `box`(`idBox`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `flavor` ADD CONSTRAINT `flavor_ibfk_1` FOREIGN KEY (`idBox`) REFERENCES `box`(`idBox`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- RenameIndex
ALTER TABLE `aliment` RENAME INDEX `idx_idBox` TO `idBox`;
