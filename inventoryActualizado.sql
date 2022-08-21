CREATE DATABASE  IF NOT EXISTS `inventory` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `inventory`;
-- MySQL dump 10.13  Distrib 8.0.30, for Win64 (x86_64)
--
-- Host: localhost    Database: inventory
-- ------------------------------------------------------
-- Server version	8.0.30

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `consumition_history`
--

DROP TABLE IF EXISTS `consumition_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `consumition_history` (
  `ch_id` int NOT NULL AUTO_INCREMENT,
  `ch_restaurant_id` int NOT NULL,
  `ch_recipe_id` int NOT NULL,
  `ch_date` date NOT NULL,
  `ch_cantidad` double NOT NULL,
  PRIMARY KEY (`ch_id`),
  KEY `fk_consumition_history_restaurants1_idx` (`ch_restaurant_id`),
  KEY `fk_consumition_history_recipes1_idx` (`ch_recipe_id`),
  CONSTRAINT `fk_consumition_history_recipes1` FOREIGN KEY (`ch_recipe_id`) REFERENCES `recipes` (`rcp_id`) ON DELETE CASCADE,
  CONSTRAINT `fk_consumition_history_restaurants1` FOREIGN KEY (`ch_restaurant_id`) REFERENCES `restaurants` (`rst_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `consumition_history`
--

LOCK TABLES `consumition_history` WRITE;
/*!40000 ALTER TABLE `consumition_history` DISABLE KEYS */;
/*!40000 ALTER TABLE `consumition_history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `inventory`
--

DROP TABLE IF EXISTS `inventory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `inventory` (
  `inv_id` int NOT NULL AUTO_INCREMENT,
  `inv_restaurant_id` int NOT NULL,
  `inv_product_id` int NOT NULL,
  `inv_cantidad` double NOT NULL,
  PRIMARY KEY (`inv_id`),
  KEY `fk_restaurants_has_products_products1_idx` (`inv_product_id`),
  KEY `fk_restaurants_has_products_restaurants_idx` (`inv_restaurant_id`),
  CONSTRAINT `fk_inv_product_id` FOREIGN KEY (`inv_product_id`) REFERENCES `products` (`prd_id`) ON DELETE CASCADE,
  CONSTRAINT `fk_inv_restaurant_id` FOREIGN KEY (`inv_restaurant_id`) REFERENCES `restaurants` (`rst_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inventory`
--

LOCK TABLES `inventory` WRITE;
/*!40000 ALTER TABLE `inventory` DISABLE KEYS */;
/*!40000 ALTER TABLE `inventory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `prd_id` int NOT NULL,
  `prd_description` varchar(75) NOT NULL,
  `prd_price` double NOT NULL,
  `prd_sup_id` int NOT NULL,
  PRIMARY KEY (`prd_id`),
  KEY `fk_sup_id_idx` (`prd_sup_id`),
  CONSTRAINT `fk_sup_id` FOREIGN KEY (`prd_sup_id`) REFERENCES `suppliers` (`sup_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `recipe_products`
--

DROP TABLE IF EXISTS `recipe_products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `recipe_products` (
  `rxp_id` int NOT NULL AUTO_INCREMENT,
  `rxp_recipe_id` int NOT NULL,
  `rxp_product_id` int NOT NULL,
  `rxp_product_cantidad` double NOT NULL,
  PRIMARY KEY (`rxp_id`),
  KEY `fk_products_has_Recipes_Recipes1_idx` (`rxp_recipe_id`),
  KEY `fk_products_has_Recipes_products1_idx` (`rxp_product_id`),
  CONSTRAINT `fk_products_has_Recipes_products1` FOREIGN KEY (`rxp_product_id`) REFERENCES `products` (`prd_id`) ON DELETE CASCADE,
  CONSTRAINT `fk_products_has_Recipes_Recipes1` FOREIGN KEY (`rxp_recipe_id`) REFERENCES `recipes` (`rcp_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `recipe_products`
--

LOCK TABLES `recipe_products` WRITE;
/*!40000 ALTER TABLE `recipe_products` DISABLE KEYS */;
/*!40000 ALTER TABLE `recipe_products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `recipes`
--

DROP TABLE IF EXISTS `recipes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `recipes` (
  `rcp_id` int NOT NULL AUTO_INCREMENT,
  `rcp_name` varchar(60) NOT NULL,
  PRIMARY KEY (`rcp_id`),
  UNIQUE KEY `rcp_name_UNIQUE` (`rcp_name`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `recipes`
--

LOCK TABLES `recipes` WRITE;
/*!40000 ALTER TABLE `recipes` DISABLE KEYS */;
/*!40000 ALTER TABLE `recipes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `restaurants`
--

DROP TABLE IF EXISTS `restaurants`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `restaurants` (
  `rst_id` int NOT NULL AUTO_INCREMENT,
  `rst_name` varchar(45) NOT NULL,
  PRIMARY KEY (`rst_id`),
  UNIQUE KEY `rst_name_UNIQUE` (`rst_name`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `restaurants`
--

LOCK TABLES `restaurants` WRITE;
/*!40000 ALTER TABLE `restaurants` DISABLE KEYS */;
/*!40000 ALTER TABLE `restaurants` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `suppliers`
--

DROP TABLE IF EXISTS `suppliers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `suppliers` (
  `sup_id` int NOT NULL AUTO_INCREMENT,
  `sup_name` varchar(45) NOT NULL,
  `sup_surnames` varchar(45) NOT NULL,
  `sup_contact` varchar(45) NOT NULL,
  PRIMARY KEY (`sup_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `suppliers`
--

LOCK TABLES `suppliers` WRITE;
/*!40000 ALTER TABLE `suppliers` DISABLE KEYS */;
/*!40000 ALTER TABLE `suppliers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `usr_id` int NOT NULL AUTO_INCREMENT,
  `usr_username` varchar(45) NOT NULL,
  `usr_password` varchar(200) NOT NULL,
  `usr_name` varchar(45) NOT NULL,
  `usr_surnames` varchar(45) NOT NULL,
  `usr_role` varchar(45) NOT NULL,
  PRIMARY KEY (`usr_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'miki','$2a$10$AH/vg6LrDuZTtR9C96gVMe604quhiD5QJpM245TYmgblolRoZzBh2','Miguel','Exposito','admin');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-08-21 23:26:53
