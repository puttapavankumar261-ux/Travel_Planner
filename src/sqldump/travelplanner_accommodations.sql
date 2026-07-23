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
-- Table structure for table `accommodations`
--

DROP TABLE IF EXISTS `accommodations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `accommodations` (
  `accommodation_id` bigint NOT NULL AUTO_INCREMENT,
  `accommodation_type` enum('APARTMENT','GUEST_HOUSE','HOMESTAY','HOSTEL','HOTEL','OTHER','RESORT','VILLA') NOT NULL,
  `booking_amount` double NOT NULL,
  `booking_reference` varchar(255) NOT NULL,
  `booking_status` enum('BOOKED','CANCELLED','CHECKED_IN','CHECKED_OUT') NOT NULL,
  `check_in_date` date NOT NULL,
  `check_out_date` date NOT NULL,
  `city` varchar(255) NOT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `hotel_address` varchar(255) NOT NULL,
  `hotel_name` varchar(255) NOT NULL,
  `notes` varchar(1000) DEFAULT NULL,
  `room_type` varchar(255) NOT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `trip_id` bigint NOT NULL,
  PRIMARY KEY (`accommodation_id`),
  UNIQUE KEY `UKghn4cj45vlca61hkam77ksxf` (`booking_reference`),
  KEY `FK9yaf2iweu98903pak2uros67a` (`trip_id`),
  CONSTRAINT `FK9yaf2iweu98903pak2uros67a` FOREIGN KEY (`trip_id`) REFERENCES `trips` (`trip_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accommodations`
--

LOCK TABLES `accommodations` WRITE;
/*!40000 ALTER TABLE `accommodations` DISABLE KEYS */;
INSERT INTO `accommodations` VALUES (1,'HOTEL',12000,'ACC-B4A925C1','BOOKED','2026-09-10','2026-09-14','Ooty','2026-07-22 23:24:38.306219','Charing Cross, Ooty, Tamil Nadu','Fortune Resort Sullivan Court','Mountain view room.','Premium Room','2026-07-22 23:24:38.306219',1),(2,'VILLA',28000,'ACC-963F085B','BOOKED','2026-12-18','2026-12-25','Manali','2026-07-22 23:25:30.766421','Prini Village, Manali, Himachal Pradesh','StayVista at The Kathguni House','Luxury private villa with stunning Himalayan mountain views, fireplace, garden, and complimentary breakfast.','3 Bedroom Luxury Villa','2026-07-22 23:25:30.766421',2),(3,'HOMESTAY',12000,'ACC-989547B5','BOOKED','2026-09-18','2026-09-22','Wayanad','2026-07-22 23:26:07.603639','Nenmeni, Wayanad, Kerala','Wayanad Silver Woods Homestay','Peaceful homestay surrounded by nature with complimentary Kerala breakfast and guided plantation walk.','Deluxe Family Room','2026-07-22 23:26:07.604680',3),(4,'HOTEL',18500,'ACC-8732B9D9','BOOKED','2026-10-05','2026-10-08','Hyderabad','2026-07-22 23:35:48.856314','Road No. 1, Banjara Hills, Hyderabad, Telangana','Taj Krishna Hyderabad','Luxury stay with complimentary breakfast and airport pickup.','Deluxe King Room','2026-07-22 23:35:48.856314',4);
/*!40000 ALTER TABLE `accommodations` ENABLE KEYS */;
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
