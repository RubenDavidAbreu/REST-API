-- CreateTable
CREATE TABLE `aliment` (
    `idAliment` INTEGER NOT NULL,
    `idBox` INTEGER NOT NULL,
    `nom` VARCHAR(255) NOT NULL,
    `quantity` INTEGER NOT NULL,

    INDEX `idx_idBox`(`idBox`),
    PRIMARY KEY (`idAliment`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `box` (
    `idBox` INTEGER NOT NULL,
    `nom` VARCHAR(255) NOT NULL,
    `pieces` INTEGER NOT NULL,
    `price` FLOAT NOT NULL,
    `image` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`idBox`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `boxr` (
    `idBoxR` INTEGER NOT NULL,
    `idCommand` INTEGER NOT NULL,
    `idBox` INTEGER NOT NULL,
    `quantity` INTEGER NOT NULL,

    INDEX `idBox`(`idBox`),
    INDEX `idCommand`(`idCommand`),
    PRIMARY KEY (`idBoxR`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `flavor` (
    `idFlavor` INTEGER NOT NULL,
    `idBox` INTEGER NOT NULL,
    `nom` VARCHAR(255) NOT NULL,

    INDEX `idBox`(`idBox`),
    PRIMARY KEY (`idFlavor`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `reservation` (
    `idReservation` INTEGER NOT NULL,
    `status` VARCHAR(255) NOT NULL,
    `totalPrice` FLOAT NOT NULL,

    PRIMARY KEY (`idReservation`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `aliment` ADD CONSTRAINT `aliment_ibfk_1` FOREIGN KEY (`idBox`) REFERENCES `box`(`idBox`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `boxr` ADD CONSTRAINT `boxr_ibfk_1` FOREIGN KEY (`idBox`) REFERENCES `box`(`idBox`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `boxr` ADD CONSTRAINT `boxr_ibfk_2` FOREIGN KEY (`idCommand`) REFERENCES `reservation`(`idReservation`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `flavor` ADD CONSTRAINT `flavor_ibfk_1` FOREIGN KEY (`idBox`) REFERENCES `box`(`idBox`) ON DELETE NO ACTION ON UPDATE NO ACTION;
