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
-- Table structure for table `trips`
--

DROP TABLE IF EXISTS `trips`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `trips` (
  `trip_id` bigint NOT NULL AUTO_INCREMENT,
  `budget` double NOT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `description` varchar(1000) DEFAULT NULL,
  `destination` varchar(255) NOT NULL,
  `end_date` date NOT NULL,
  `source` varchar(255) NOT NULL,
  `start_date` date NOT NULL,
  `title` varchar(255) NOT NULL,
  `trip_status` enum('CANCELLED','COMPLETED','ONGOING','PLANNED','UPCOMING') NOT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`trip_id`),
  KEY `FK8wb14dx6ed0bpp3planbay88u` (`user_id`),
  CONSTRAINT `FK8wb14dx6ed0bpp3planbay88u` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trips`
--

LOCK TABLES `trips` WRITE;
/*!40000 ALTER TABLE `trips` DISABLE KEYS */;
INSERT INTO `trips` VALUES (1,25000,'2026-07-22 22:27:58.538674','Family vacation to Ooty covering Botanical Garden, Doddabetta Peak, and Ooty Lake.','Ooty','2026-09-14','Bangalore','2026-09-10','Ooty Hill Station Tour','PLANNED','2026-07-22 22:27:58.538674',2),(2,55000,'2026-07-22 22:28:22.780236','Adventure trip including Solang Valley, Rohtang Pass, river rafting, and paragliding.','Manali','2026-12-25','Delhi','2026-12-18','Manali Adventure Trip','UPCOMING','2026-07-22 22:28:22.780236',3),(3,30000,'2026-07-22 22:28:52.167985','Experience the scenic beauty of Wayanad with visits to Edakkal Caves, Banasura Sagar Dam, Soochipara Waterfalls, Pookode Lake, and Chembra Peak.','Wayanad','2026-09-22','Bangalore','2026-09-18','Wayanad Nature Escape','PLANNED','2026-07-22 22:28:52.167985',4),(4,22000,'2026-07-22 22:29:19.684707','Visit Charminar, Golconda Fort, Salar Jung Museum, and Ramoji Film City.','Hyderabad','2026-10-08','Chennai','2026-10-05','Hyderabad City Tour','PLANNED','2026-07-22 22:29:19.684707',5);
/*!40000 ALTER TABLE `trips` ENABLE KEYS */;
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
