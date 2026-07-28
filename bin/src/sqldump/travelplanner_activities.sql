-- MySQL dump 10.13  Distrib 8.0.46, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: travelplanner
-- ------------------------------------------------------
-- Server version	8.0.46

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
-- Table structure for table `activities`
--

DROP TABLE IF EXISTS `activities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `activities` (
  `activity_id` bigint NOT NULL AUTO_INCREMENT,
  `activity_category` enum('ADVENTURE','CULTURAL','FOOD','NIGHTLIFE','OTHER','RELAXATION','SHOPPING','SIGHTSEEING') NOT NULL,
  `activity_date` date NOT NULL,
  `activity_name` varchar(255) NOT NULL,
  `activity_status` enum('BOOKED','CANCELLED','COMPLETED','PLANNED') NOT NULL,
  `booking_reference` varchar(255) DEFAULT NULL,
  `booking_required` bit(1) NOT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `end_time` time NOT NULL,
  `estimated_cost` double NOT NULL,
  `location` varchar(255) NOT NULL,
  `notes` varchar(1000) DEFAULT NULL,
  `start_time` time NOT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `trip_id` bigint NOT NULL,
  PRIMARY KEY (`activity_id`),
  UNIQUE KEY `UKb9enj9r1d3fwcr9dxsd545gm5` (`booking_reference`),
  KEY `FKkx78ofjocchsrmnsf02creh65` (`trip_id`),
  CONSTRAINT `FKkx78ofjocchsrmnsf02creh65` FOREIGN KEY (`trip_id`) REFERENCES `trips` (`trip_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `activities`
--

LOCK TABLES `activities` WRITE;
/*!40000 ALTER TABLE `activities` DISABLE KEYS */;
/*!40000 ALTER TABLE `activities` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-07-23 11:23:57
