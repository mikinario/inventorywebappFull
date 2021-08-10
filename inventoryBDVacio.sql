-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema inventory
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema inventory
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `inventory` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `inventory` ;

-- -----------------------------------------------------
-- Table `inventory`.`products`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `inventory`.`products` (
  `prd_id` INT NOT NULL AUTO_INCREMENT,
  `prd_description` VARCHAR(45) NOT NULL,
  `prd_price` DOUBLE NOT NULL,
  PRIMARY KEY (`prd_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 0
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `inventory`.`restaurants`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `inventory`.`restaurants` (
  `rst_id` INT NOT NULL AUTO_INCREMENT,
  `rst_name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`rst_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 0
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `inventory`.`inventory`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `inventory`.`inventory` (
  `inv_id` INT NOT NULL AUTO_INCREMENT,
  `inv_restaurant_id` INT NOT NULL,
  `inv_product_id` INT NOT NULL,
  `inv_cantidad` DOUBLE NOT NULL,
  PRIMARY KEY (`inv_id`),
  INDEX `fk_restaurants_has_products_products1_idx` (`inv_product_id` ASC) VISIBLE,
  INDEX `fk_restaurants_has_products_restaurants_idx` (`inv_restaurant_id` ASC) VISIBLE,
  CONSTRAINT `fk_inv_product_id`
    FOREIGN KEY (`inv_product_id`)
    REFERENCES `inventory`.`products` (`prd_id`),
  CONSTRAINT `fk_inv_restaurant_id`
    FOREIGN KEY (`inv_restaurant_id`)
    REFERENCES `inventory`.`restaurants` (`rst_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 0
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `inventory`.`Recipes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `inventory`.`Recipes` (
  `rcp_id` INT NOT NULL AUTO_INCREMENT,
  `rcp_name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`rcp_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `inventory`.`recipe_products`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `inventory`.`recipe_products` (
  `rxp_id` INT NOT NULL AUTO_INCREMENT,
  `rxp_rcp_id` INT NOT NULL,
  `rxp_prd_id` INT NOT NULL,
  `rxp_product_cantidad` DOUBLE NOT NULL,
  INDEX `fk_products_has_Recipes_Recipes1_idx` (`rxp_rcp_id` ASC) VISIBLE,
  INDEX `fk_products_has_Recipes_products1_idx` (`rxp_prd_id` ASC) VISIBLE,
  PRIMARY KEY (`rxp_id`),
  CONSTRAINT `fk_products_has_Recipes_products1`
    FOREIGN KEY (`rxp_prd_id`)
    REFERENCES `inventory`.`products` (`prd_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_products_has_Recipes_Recipes1`
    FOREIGN KEY (`rxp_rcp_id`)
    REFERENCES `inventory`.`Recipes` (`rcp_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
