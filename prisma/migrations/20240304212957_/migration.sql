-- AddForeignKey
ALTER TABLE `aliment` ADD CONSTRAINT `aliment_ibfk_1` FOREIGN KEY (`idBox`) REFERENCES `box`(`idBox`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `flavor` ADD CONSTRAINT `flavor_ibfk_1` FOREIGN KEY (`idBox`) REFERENCES `box`(`idBox`) ON DELETE NO ACTION ON UPDATE NO ACTION;