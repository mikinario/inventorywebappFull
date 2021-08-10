CREATE DATABASE  IF NOT EXISTS `inventory` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `inventory`;
-- MySQL dump 10.13  Distrib 8.0.22, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: inventory
-- ------------------------------------------------------
-- Server version	8.0.22

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
  CONSTRAINT `fk_inv_product_id` FOREIGN KEY (`inv_product_id`) REFERENCES `products` (`prd_id`),
  CONSTRAINT `fk_inv_restaurant_id` FOREIGN KEY (`inv_restaurant_id`) REFERENCES `restaurants` (`rst_id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inventory`
--

LOCK TABLES `inventory` WRITE;
/*!40000 ALTER TABLE `inventory` DISABLE KEYS */;
INSERT INTO `inventory` VALUES (1,2,3,5),(2,3,5,12),(3,1,4,10),(4,3,4,10),(5,1,5,6),(6,2,2,4),(7,3,1,23),(8,2,1,8),(9,1,2,3),(11,3,10,5),(13,4,15,6),(14,4,2,5),(15,3,2,3),(16,4,28,5),(17,1,1,3),(20,1,15,3),(21,2,25,2);
/*!40000 ALTER TABLE `inventory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `prd_id` int NOT NULL AUTO_INCREMENT,
  `prd_description` varchar(45) NOT NULL,
  `prd_price` double NOT NULL,
  PRIMARY KEY (`prd_id`)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Harina 1Kg',5.95),(2,'Ternera 200Gr',8.95),(3,'Entrecot 200Gr',7.95),(4,'Arroz 1Kg',3.95),(5,'Barra de Pan',2.95),(6,'Barra de chocolate',3),(7,'Jamon 100g',9.9),(8,'Salsa de Tomate 500Ml',4.95),(9,'Esteve A la brasa',1),(10,'Hola',12),(11,'Bacalao',14.79),(12,'Sal',3),(13,'Pimienta',3),(14,'Nata Liquida 1L',4.95),(15,'Prueba 2',5),(16,'kikos',5),(19,'Ketchup 500Ml',4.95),(20,'Solomillo 500Gr',14.95),(21,'Pollo entero',4.95),(22,'Puerros ',3.68),(23,'Cebollas 1Kg',6.89),(24,'Zanahorias 1Kg',4.95),(25,'Huevos 12 ud.',6.59),(26,'Platanos 500Gr',4.95),(28,'Lechuga ',1.99),(29,'Tomates 1Kg',6.98),(30,'Aceite 100Ml',8.99);
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
  CONSTRAINT `fk_products_has_Recipes_products1` FOREIGN KEY (`rxp_product_id`) REFERENCES `products` (`prd_id`),
  CONSTRAINT `fk_products_has_Recipes_Recipes1` FOREIGN KEY (`rxp_recipe_id`) REFERENCES `recipes` (`rcp_id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `recipe_products`
--

LOCK TABLES `recipe_products` WRITE;
/*!40000 ALTER TABLE `recipe_products` DISABLE KEYS */;
INSERT INTO `recipe_products` VALUES (4,1,4,0.5),(7,2,11,1),(9,5,4,1),(10,5,2,0.2),(11,8,10,5),(12,2,12,0.01),(13,6,3,1),(14,6,12,0.02),(15,6,14,0.8),(16,6,13,0.05),(18,3,2,1),(19,3,5,0.5),(20,3,19,0.2),(21,9,12,0.01),(22,9,20,0.5),(23,14,21,0.5),(24,14,23,0.1),(25,14,24,0.2),(26,14,22,1),(27,1,8,0.5),(28,1,25,0.1),(29,1,26,0.2),(33,19,28,0.2),(34,19,29,0.2);
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
  `rcp_name` varchar(45) NOT NULL,
  PRIMARY KEY (`rcp_id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `recipes`
--

LOCK TABLES `recipes` WRITE;
/*!40000 ALTER TABLE `recipes` DISABLE KEYS */;
INSERT INTO `recipes` VALUES (1,'Arroz a la Cubana'),(2,'Bacalao a la Plancha'),(3,'Hamburguesa con queso'),(4,'Paletilla lechal'),(5,'Paella mixta'),(6,'Entrecot a la pimienta'),(7,'Amor '),(8,'Receta de Prueba'),(9,'Solomillo a la plancha'),(10,'Humus'),(14,'Sopa de la abuela'),(19,'Ensalada 2');
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
  PRIMARY KEY (`rst_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `restaurants`
--

LOCK TABLES `restaurants` WRITE;
/*!40000 ALTER TABLE `restaurants` DISABLE KEYS */;
INSERT INTO `restaurants` VALUES (1,'Restaurante Paquito'),(2,'Restaurante Manolito'),(3,'Pruebas'),(4,'Restaurante de prueba');
/*!40000 ALTER TABLE `restaurants` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-02-25 12:28:22
