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
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` bigint NOT NULL AUTO_INCREMENT,
  `account_enabled` bit(1) NOT NULL,
  `account_locked` bit(1) NOT NULL,
  `account_verified` bit(1) NOT NULL,
  `country` varchar(50) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `date_of_birth` date DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `first_name` varchar(30) NOT NULL,
  `gender` enum('FEMALE','MALE','OTHER') NOT NULL,
  `last_name` varchar(30) NOT NULL,
  `login_provider` enum('GOOGLE','LOCAL','MOBILE') NOT NULL,
  `mobile_number` varchar(255) NOT NULL,
  `password` varchar(100) NOT NULL,
  `preferred_currency` varchar(10) DEFAULT NULL,
  `preferred_language` varchar(30) DEFAULT NULL,
  `profile_image` varchar(500) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `role_id` bigint NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `UK6dotkott2kjsp8vw4d0m25fb7` (`email`),
  UNIQUE KEY `UKr7c96a004bv8w16jgdm8imich` (`mobile_number`),
  KEY `FKp56c1712k691lhsyewcssf40f` (`role_id`),
  CONSTRAINT `FKp56c1712k691lhsyewcssf40f` FOREIGN KEY (`role_id`) REFERENCES `roles` (`role_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,_binary '',_binary '\0',_binary '','India','2026-07-22 21:41:13.783389',NULL,'admin@travelplanner.com','System','MALE','Administrator','LOCAL','9999999999','$2a$10$fI6TtDul2ct8WA4IpTXQXuHQmykS3KgMLlFvYOrVuQGLd7FW0.Doq','INR','English',NULL,'2026-07-22 21:41:13.783389',1),(2,_binary '',_binary '\0',_binary '\0','India','2026-07-22 21:49:19.227937','1998-12-27','hemasri@gmail.com','Hema','FEMALE','Sri','LOCAL','9876543289','$2a$10$PuiWFnhRjml2P7BA8TsWc.s0P1YKZVk3a1Juv1tpR83C9HmK3K.Ry','USD','English',NULL,'2026-07-22 21:49:19.227937',2),(3,_binary '',_binary '\0',_binary '\0','India','2026-07-22 22:03:13.252241','2026-07-06','ushasri@gmail.com','Usha','FEMALE','sri','LOCAL','6886543289','$2a$10$fmJkQ0AXwRRBfaKt1ls6qua12TxgMHTLhCS17lYuEWc/BIHWF9U1a','USD','English',NULL,'2026-07-22 22:03:13.252241',2),(4,_binary '',_binary '\0',_binary '\0','India','2026-07-22 22:25:47.957580','1998-05-12','nidhi@gmail.com','Nidhi','FEMALE','Sharma','LOCAL','9976543210','$2a$10$93X2rvReHQ1HAyUWFwA8eegUOLwm6dRtVRZpOjeif.4Sur5l.phLe','INR','English',NULL,'2026-07-22 22:25:47.957580',2),(5,_binary '',_binary '\0',_binary '\0','India','2026-07-22 22:27:00.729418','1998-05-12','aravind@gmail.com','Aravind','MALE','G','LOCAL','9776543210','$2a$10$gXzKWMm1C2CgzBXXGrEGsOXU3xRWyLUgIO9hX5oo7vHTvlOl4bEUe','INR','English',NULL,'2026-07-22 22:27:00.729418',2),(6,_binary '',_binary '\0',_binary '\0','India','2026-07-23 10:45:35.886392','2026-07-06','pavan@gmail.com','Pavan','MALE','Kumar','LOCAL','7886543289','$2a$10$0o6DWRXCS3ls59MYMaetV.V.6S.oX/rESrxjIaqzdrYlGoseZMv1m','USD','English',NULL,'2026-07-23 10:45:35.886392',2);
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

-- Dump completed on 2026-07-23 11:23:57
