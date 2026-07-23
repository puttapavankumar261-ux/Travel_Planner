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
-- Table structure for table `transportations`
--

DROP TABLE IF EXISTS `transportations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transportations` (
  `transportation_id` bigint NOT NULL AUTO_INCREMENT,
  `arrival_date` date NOT NULL,
  `arrival_time` time NOT NULL,
  `booking_reference` varchar(255) NOT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `departure_date` date NOT NULL,
  `departure_time` time NOT NULL,
  `destination` varchar(255) NOT NULL,
  `fare` double NOT NULL,
  `notes` varchar(1000) DEFAULT NULL,
  `provider_name` varchar(255) NOT NULL,
  `seat_number` varchar(255) DEFAULT NULL,
  `source` varchar(255) NOT NULL,
  `ticket_number` varchar(255) DEFAULT NULL,
  `transport_status` enum('BOOKED','CANCELLED','COMPLETED','CONFIRMED') NOT NULL,
  `transport_type` enum('BUS','CAR','FERRY','FLIGHT','METRO','OTHER','TAXI','TRAIN') NOT NULL,
  `travel_class` enum('AC','BUSINESS','ECONOMY','FIRST_CLASS','NON_AC','OTHER','PREMIUM_ECONOMY','SLEEPER') NOT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `trip_id` bigint NOT NULL,
  PRIMARY KEY (`transportation_id`),
  UNIQUE KEY `UKpipt2r713f0vxi593ya337gru` (`booking_reference`),
  KEY `FK92b3v7fchh7jy6j9n33tyras2` (`trip_id`),
  CONSTRAINT `FK92b3v7fchh7jy6j9n33tyras2` FOREIGN KEY (`trip_id`) REFERENCES `trips` (`trip_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transportations`
--

LOCK TABLES `transportations` WRITE;
/*!40000 ALTER TABLE `transportations` DISABLE KEYS */;
INSERT INTO `transportations` VALUES (1,'2026-09-11','06:00:00','TRN-41C15A9B','2026-07-22 23:42:29.283526','2026-09-10','22:30:00','Ooty',1450,'Overnight sleeper bus from Bangalore to Ooty.','KSRTC Airavat','L15','Bangalore','KSRTC987654','CONFIRMED','BUS','SLEEPER','2026-07-22 23:42:29.283526',1),(2,'2026-09-18','10:45:00','TRN-8EB7908C','2026-07-22 23:45:21.194298','2026-09-18','08:15:00','Wayanad',2800,'Private AC cab from Kozhikode Railway Station to Wayanad resort.','Kerala Travels','NA','Kozhikode Railway Station','CAR778899','CONFIRMED','CAR','OTHER','2026-07-22 23:45:21.194298',3),(3,'2026-10-05','09:35:00','TRN-340B181E','2026-07-22 23:46:04.733668','2026-10-05','08:20:00','Hyderabad',5200,'Direct flight from Chennai to Hyderabad.','IndiGo','14A','Chennai','6E456789','CONFIRMED','FLIGHT','ECONOMY','2026-07-22 23:46:04.733668',4),(4,'2026-12-19','09:00:00','TRN-77ADD1B7','2026-07-22 23:48:14.615351','2026-12-18','21:00:00','Manali',1950,'Overnight sleeper bus from Delhi to Manali.','Himachal Road Transport Corporation','U12','Delhi','HRTC20261218001','BOOKED','BUS','SLEEPER','2026-07-22 23:48:14.615351',2);
/*!40000 ALTER TABLE `transportations` ENABLE KEYS */;
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
