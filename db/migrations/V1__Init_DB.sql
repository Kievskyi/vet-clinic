-- MySQL dump 10.13  Distrib 8.0.29, for macos12 (x86_64)
--
-- Host: localhost    Database: vet-clinic
-- ------------------------------------------------------
-- Server version	8.0.29

/*!40101 SET @OLD_CHARACTER_SET_CLIENT = @@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS = @@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION = @@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE = @@TIME_ZONE */;
/*!40103 SET TIME_ZONE = '+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS = @@UNIQUE_CHECKS, UNIQUE_CHECKS = 0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS = @@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS = 0 */;
/*!40101 SET @OLD_SQL_MODE = @@SQL_MODE, SQL_MODE = 'NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES = @@SQL_NOTES, SQL_NOTES = 0 */;

--
-- Table structure for table `administrator_info`
--

DROP TABLE IF EXISTS `administrator_info`;
/*!40101 SET @saved_cs_client = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `administrator_info`
(
    `id`           int NOT NULL AUTO_INCREMENT,
    `user_id`      int          DEFAULT NULL,
    `first_name`   varchar(45)  DEFAULT NULL,
    `last_name`    varchar(45)  DEFAULT NULL,
    `phone_number` varchar(45)  DEFAULT NULL,
    `address`      varchar(100) DEFAULT NULL,
    PRIMARY KEY (`id`),
    KEY `administrator_info_users_id_fk` (`user_id`),
    CONSTRAINT `administrator_info_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB
  AUTO_INCREMENT = 3
  DEFAULT CHARSET = utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `administrator_info`
--

LOCK TABLES `administrator_info` WRITE;
/*!40000 ALTER TABLE `administrator_info`
    DISABLE KEYS */;
INSERT INTO `administrator_info`
VALUES (2, 44, 'Armen', 'Pashinian', '0505555555', 'Kyiv');
/*!40000 ALTER TABLE `administrator_info`
    ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `clinics`
--

DROP TABLE IF EXISTS `clinics`;
/*!40101 SET @saved_cs_client = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clinics`
(
    `id`           int          NOT NULL AUTO_INCREMENT,
    `name`         varchar(100) NOT NULL,
    `address`      varchar(100) NOT NULL,
    `phone_number` varchar(45) DEFAULT NULL,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB
  AUTO_INCREMENT = 3
  DEFAULT CHARSET = utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clinics`
--

LOCK TABLES `clinics` WRITE;
/*!40000 ALTER TABLE `clinics`
    DISABLE KEYS */;
INSERT INTO `clinics`
VALUES (1, 'VETCLINIC 1', 'Kyiv, st.Dmytrivska 1', '0445555555'),
       (2, 'VETCLINIC 2', 'Kyiv, st.Chornovola 30', '0449999999');
/*!40000 ALTER TABLE `clinics`
    ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customer_info`
--

DROP TABLE IF EXISTS `customer_info`;
/*!40101 SET @saved_cs_client = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customer_info`
(
    `id`           int NOT NULL AUTO_INCREMENT,
    `user_id`      int         DEFAULT NULL,
    `first_name`   varchar(45) DEFAULT NULL,
    `last_name`    varchar(45) DEFAULT NULL,
    `phone_number` varchar(45) DEFAULT NULL,
    `avatar`       blob,
    PRIMARY KEY (`id`),
    KEY `customer_info_users_id_fk` (`user_id`),
    CONSTRAINT `customer_info_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB
  AUTO_INCREMENT = 12
  DEFAULT CHARSET = utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer_info`
--

LOCK TABLES `customer_info` WRITE;
/*!40000 ALTER TABLE `customer_info`
    DISABLE KEYS */;
INSERT INTO `customer_info`
VALUES (8, 12, 'Denys', 'Dudnik', '0964340344', NULL);
/*!40000 ALTER TABLE `customer_info`
    ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customer_invoice`
--

DROP TABLE IF EXISTS `customer_invoice`;
/*!40101 SET @saved_cs_client = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customer_invoice`
(
    `id`                int NOT NULL AUTO_INCREMENT,
    `customer_visit_id` int   DEFAULT NULL,
    `total_amount`      float DEFAULT NULL,
    PRIMARY KEY (`id`),
    KEY `customer_invoice_customer_visits_id_fk` (`customer_visit_id`),
    CONSTRAINT `customer_invoice_customer_visits_id_fk` FOREIGN KEY (`customer_visit_id`) REFERENCES `customer_visits` (`id`)
) ENGINE = InnoDB
  AUTO_INCREMENT = 6
  DEFAULT CHARSET = utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer_invoice`
--

LOCK TABLES `customer_invoice` WRITE;
/*!40000 ALTER TABLE `customer_invoice`
    DISABLE KEYS */;
INSERT INTO `customer_invoice`
VALUES (1, 15, 1300),
       (2, 16, 1300),
       (3, 17, 1300),
       (5, 18, 6530);
/*!40000 ALTER TABLE `customer_invoice`
    ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customer_pets`
--

DROP TABLE IF EXISTS `customer_pets`;
/*!40101 SET @saved_cs_client = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customer_pets`
(
    `id`         int NOT NULL AUTO_INCREMENT,
    `user_id`    int         DEFAULT NULL,
    `name`       varchar(45) DEFAULT NULL,
    `type`       varchar(45) DEFAULT NULL,
    `breed`      varchar(45) DEFAULT NULL,
    `birth_date` date        DEFAULT NULL,
    PRIMARY KEY (`id`),
    KEY `customer_pets_users_id_fk` (`user_id`),
    CONSTRAINT `customer_pets_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB
  AUTO_INCREMENT = 14
  DEFAULT CHARSET = utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer_pets`
--

LOCK TABLES `customer_pets` WRITE;
/*!40000 ALTER TABLE `customer_pets`
    DISABLE KEYS */;
INSERT INTO `customer_pets`
VALUES (6, 12, 'Jessica', 'Cat', 'Regular', '2024-03-01'),
       (9, 12, 'Amour', 'Cat', 'Angora', '2013-11-14'),
       (10, 12, 'Asya', 'Dog', 'Pikines', '2000-05-10');
/*!40000 ALTER TABLE `customer_pets`
    ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customer_visits`
--

DROP TABLE IF EXISTS `customer_visits`;
/*!40101 SET @saved_cs_client = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customer_visits`
(
    `id`            int NOT NULL AUTO_INCREMENT,
    `user_id`       int                         DEFAULT NULL,
    `pet_id`        int                         DEFAULT NULL,
    `clinic_id`     int                         DEFAULT NULL,
    `visit_date`    datetime                    DEFAULT NULL,
    `status`        enum ('PLANNED','FINISHED') DEFAULT NULL,
    `doctor_report` text,
    PRIMARY KEY (`id`),
    KEY `customer_visits_clinics_id_fk` (`clinic_id`),
    KEY `customer_visits_user_id_fk` (`user_id`),
    KEY `customer_visits_customer_pets_id_fk` (`pet_id`),
    CONSTRAINT `customer_visits_clinics_id_fk` FOREIGN KEY (`clinic_id`) REFERENCES `clinics` (`id`),
    CONSTRAINT `customer_visits_customer_pets_id_fk` FOREIGN KEY (`pet_id`) REFERENCES `customer_pets` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT `customer_visits_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB
  AUTO_INCREMENT = 28
  DEFAULT CHARSET = utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer_visits`
--

LOCK TABLES `customer_visits` WRITE;
/*!40000 ALTER TABLE `customer_visits`
    DISABLE KEYS */;
INSERT INTO `customer_visits`
VALUES (3, 12, 6, 1, '2024-03-28 09:00:00', 'PLANNED', NULL),
       (4, 12, 6, 1, '2024-03-28 09:30:00', 'PLANNED', NULL),
       (5, 12, 6, 1, '2024-03-28 07:00:00', 'PLANNED', NULL),
       (6, 12, 6, 1, '2024-03-28 07:30:00', 'PLANNED', NULL),
       (13, 12, 9, 1, '2024-03-31 07:00:00', 'PLANNED', NULL),
       (14, 12, 9, 1, '2024-03-31 07:30:00', 'PLANNED', NULL),
       (15, 12, 6, 2, '2024-04-02 21:00:00', 'FINISHED', 'Be polite !'),
       (16, 12, 6, 2, '2024-04-02 21:30:00', 'FINISHED', 'Very good kitty !'),
       (17, 12, 9, 2, '2024-04-03 07:00:00', 'FINISHED', 'Great kitty !)'),
       (18, 12, 9, 2, '2024-04-03 13:00:00', 'FINISHED', 'Ooops'),
       (19, 12, 6, 2, '2024-04-03 19:00:00', 'PLANNED', NULL),
       (20, 12, 9, 2, '2024-04-11 10:30:00', 'PLANNED', NULL),
       (26, 12, 6, 2, '2024-04-13 07:00:00', 'PLANNED', NULL),
       (27, 12, 10, 2, '2024-04-06 17:30:00', 'PLANNED', NULL);
/*!40000 ALTER TABLE `customer_visits`
    ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customer_visits_services`
--

DROP TABLE IF EXISTS `customer_visits_services`;
/*!40101 SET @saved_cs_client = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customer_visits_services`
(
    `customer_visit_id` int NOT NULL,
    `service_id`        int NOT NULL,
    PRIMARY KEY (`customer_visit_id`, `service_id`),
    KEY `customer_service___fk` (`service_id`),
    CONSTRAINT `customer_service___fk` FOREIGN KEY (`service_id`) REFERENCES `services` (`id`),
    CONSTRAINT `customer_visit___fk` FOREIGN KEY (`customer_visit_id`) REFERENCES `customer_visits` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer_visits_services`
--

LOCK TABLES `customer_visits_services` WRITE;
/*!40000 ALTER TABLE `customer_visits_services`
    DISABLE KEYS */;
INSERT INTO `customer_visits_services`
VALUES (18, 1),
       (17, 3),
       (18, 3),
       (15, 4),
       (16, 4),
       (17, 5);
/*!40000 ALTER TABLE `customer_visits_services`
    ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `doctor_appointment`
--

DROP TABLE IF EXISTS `doctor_appointment`;
/*!40101 SET @saved_cs_client = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `doctor_appointment`
(
    `id`                int NOT NULL AUTO_INCREMENT,
    `doctor_id`         int                         DEFAULT NULL,
    `pet_id`            int                         DEFAULT NULL,
    `visit_date`        datetime                    DEFAULT NULL,
    `status`            enum ('PLANNED','FINISHED') DEFAULT NULL,
    `customer_visit_id` int                         DEFAULT NULL,
    PRIMARY KEY (`id`),
    KEY `doctor_appointment_customer_pets_id_fk` (`pet_id`),
    KEY `doctor_appointment_users_id_fk` (`doctor_id`),
    KEY `doctor_appointment_customer_visits_id_fk` (`customer_visit_id`),
    CONSTRAINT `doctor_appointment_customer_pets_id_fk` FOREIGN KEY (`pet_id`) REFERENCES `customer_pets` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT `doctor_appointment_customer_visits_id_fk` FOREIGN KEY (`customer_visit_id`) REFERENCES `customer_visits` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT `doctor_appointment_users_id_fk` FOREIGN KEY (`doctor_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB
  AUTO_INCREMENT = 24
  DEFAULT CHARSET = utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `doctor_appointment`
--

LOCK TABLES `doctor_appointment` WRITE;
/*!40000 ALTER TABLE `doctor_appointment`
    DISABLE KEYS */;
INSERT INTO `doctor_appointment`
VALUES (1, 33, 6, '2024-03-28 09:00:00', 'PLANNED', 3),
       (2, 33, 6, '2024-03-28 09:30:00', 'PLANNED', 4),
       (3, 33, 6, '2024-03-28 07:00:00', 'PLANNED', 5),
       (4, 33, 6, '2024-03-28 07:30:00', 'PLANNED', 6),
       (11, 33, 9, '2024-03-31 07:00:00', 'PLANNED', 13),
       (12, 33, 9, '2024-03-31 07:30:00', 'PLANNED', 14),
       (13, 48, 6, '2024-04-02 21:00:00', 'FINISHED', 15),
       (14, 48, 6, '2024-04-02 21:30:00', 'FINISHED', 16),
       (15, 48, 9, '2024-04-03 07:00:00', 'FINISHED', 17),
       (16, 48, 9, '2024-04-03 13:00:00', 'FINISHED', 18),
       (17, 48, 6, '2024-04-03 19:00:00', 'PLANNED', 19),
       (18, 48, 9, '2024-04-11 10:30:00', 'PLANNED', 20),
       (22, 48, 6, '2024-04-13 07:00:00', 'PLANNED', 26),
       (23, 48, 10, '2024-04-06 17:30:00', 'PLANNED', 27);
/*!40000 ALTER TABLE `doctor_appointment`
    ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `doctor_info`
--

DROP TABLE IF EXISTS `doctor_info`;
/*!40101 SET @saved_cs_client = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `doctor_info`
(
    `id`           int NOT NULL AUTO_INCREMENT,
    `user_id`      int         DEFAULT NULL,
    `name`         varchar(45) DEFAULT NULL,
    `surname`      varchar(45) DEFAULT NULL,
    `phone_number` varchar(45) DEFAULT NULL,
    `address`      varchar(45) DEFAULT NULL,
    `birth_date`   date        DEFAULT NULL,
    `clinic_id`    int         DEFAULT NULL,
    `speciality`   int         DEFAULT NULL,
    PRIMARY KEY (`id`),
    KEY `doctor_info_clinics_id_fk` (`clinic_id`),
    KEY `doctor_info_users_id_fk` (`user_id`),
    KEY `doctor_info_doctor_specialties_id_fk` (`speciality`),
    CONSTRAINT `doctor_info_doctor_specialties_id_fk` FOREIGN KEY (`speciality`) REFERENCES `doctor_specialties` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT `doctor_info_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB
  AUTO_INCREMENT = 28
  DEFAULT CHARSET = utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `doctor_info`
--

LOCK TABLES `doctor_info` WRITE;
/*!40000 ALTER TABLE `doctor_info`
    DISABLE KEYS */;
INSERT INTO `doctor_info`
VALUES (4, 18, 'Anatoliy', 'Serov', '+380635888888', 'Kyiv, Volosheva 5, fl.98', NULL, 1, 2),
       (5, 19, 'Vitaliy', 'Gryn', '+380635888888', 'Kyiv, Volosheva 5, fl.98', NULL, 1, 2),
       (6, 20, 'Ivan', 'Petrov', '+380931234567', 'Kyiv, Saksaganskogo 12, fl.45', NULL, 1, 2),
       (7, 21, 'Olga', 'Sergeeva', '+380932345678', 'Lviv, Shevchenka 34, fl.92', NULL, 1, 2),
       (8, 22, 'Mykola', 'Kovalenko', '+380933456789', 'Odesa, Derebasivska 5, fl.11', NULL, 1, 2),
       (9, 24, 'Kyle', 'Gutierrez', '+380637747056', 'Kyiv, Villanueva Forks 89902, fl.1', NULL, 1, 3),
       (10, 25, 'David', 'Zimmerman', '+380635384975', 'Kyiv, Brandon Forges 065, fl.38', NULL, 1, 3),
       (11, 26, 'Benjamin', 'Long', '+380934758838', 'Kyiv, Christina Tunnel 499, fl.64', NULL, 1, 3),
       (12, 28, 'Jessica', 'Patterson', '+380636992192', 'Kyiv, Barbara Forges 7061, fl.62', NULL, 1, 4),
       (13, 29, 'Alyssa', 'Austin', '+380635169519', 'Kyiv, John Prairie 213, fl.88', NULL, 1, 4),
       (14, 30, 'Steve', 'Hill', '+380932238084', 'Kyiv, Williams Mountain 7474, fl.36', NULL, 1, 4),
       (15, 31, 'Kevin', 'Bass', '+380932920158', 'Lviv, Kim Meadow 50719, fl.83', NULL, 1, 4),
       (16, 33, 'Denys', 'Dudnik', '+380964340345', 'Kyiv, Chornovola 30, fl.96', NULL, 1, 5),
       (17, 34, 'Oleksiy', 'Shevchenko', '+380684455889', 'Kyiv, Sichovykh Striltsiv 23, fl.19', NULL, 1, 5),
       (18, 36, 'Jessica', 'Brown', '+380963513741', 'Kyiv, Tonya Greens 6303, fl.64', NULL, 1, 6),
       (19, 37, 'William', 'Sullivan', '+380682409113', 'Kyiv, Harper Via 522, fl.6', NULL, 1, 6),
       (20, 39, 'Victoriya', 'Nulland', '+380963513741', 'Kyiv, Tonya Greens 98, fl.614', NULL, 1, 1),
       (24, 47, 'Ami', 'Wash', '+380635572288', 'Lviv', '2024-03-15', 2, 3),
       (25, 48, 'Ivan', 'Zhelezniak', '+380964440344', 'Kyiv, str.Vihovskogo, b.8, fl.75', '1993-03-02', 2, 1),
       (26, 49, 'Denys', 'Bark', '+380998788899', 'Kyiv', '2001-02-06', 1, 2),
       (27, 50, 'Gregor', 'Few', '+380635786530', 'Lviv', '2024-04-04', 2, 4);
/*!40000 ALTER TABLE `doctor_info`
    ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `doctor_specialties`
--

DROP TABLE IF EXISTS `doctor_specialties`;
/*!40101 SET @saved_cs_client = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `doctor_specialties`
(
    `id`          int         NOT NULL AUTO_INCREMENT,
    `description` varchar(45) NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB
  AUTO_INCREMENT = 7
  DEFAULT CHARSET = utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `doctor_specialties`
--

LOCK TABLES `doctor_specialties` WRITE;
/*!40000 ALTER TABLE `doctor_specialties`
    DISABLE KEYS */;
INSERT INTO `doctor_specialties`
VALUES (1, 'Groomer'),
       (2, 'Pulmonologist'),
       (3, 'Gastroenterologist'),
       (4, 'Cardiologist'),
       (5, 'Surgeon'),
       (6, 'Oncologist');
/*!40000 ALTER TABLE `doctor_specialties`
    ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles`
(
    `id`          int         NOT NULL AUTO_INCREMENT,
    `description` varchar(45) NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB
  AUTO_INCREMENT = 4
  DEFAULT CHARSET = utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles`
    DISABLE KEYS */;
INSERT INTO `roles`
VALUES (1, 'CUSTOMER'),
       (2, 'DOCTOR'),
       (3, 'ADMINISTRATOR');
/*!40000 ALTER TABLE `roles`
    ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `service_prices`
--

DROP TABLE IF EXISTS `service_prices`;
/*!40101 SET @saved_cs_client = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `service_prices`
(
    `id`          int NOT NULL AUTO_INCREMENT,
    `description` varchar(100) DEFAULT NULL,
    `price`       float        DEFAULT NULL,
    `service_id`  int          DEFAULT NULL,
    PRIMARY KEY (`id`),
    KEY `service_prices_services_id_fk` (`service_id`),
    CONSTRAINT `service_prices_services_id_fk` FOREIGN KEY (`service_id`) REFERENCES `services` (`id`) ON DELETE SET NULL ON UPDATE SET NULL
) ENGINE = InnoDB
  AUTO_INCREMENT = 10
  DEFAULT CHARSET = utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `service_prices`
--

LOCK TABLES `service_prices` WRITE;
/*!40000 ALTER TABLE `service_prices`
    DISABLE KEYS */;
INSERT INTO `service_prices`
VALUES (1, 'Blood test', 490.59, 4),
       (2, 'Castration(m)', 2430, 1),
       (3, 'Castration(f)', 3500, 1),
       (4, 'Visit', 600, 3),
       (5, 'Clinic blood test', 638.4, 4),
       (6, 'Grooming(cat)', 700, 5),
       (7, 'Grooming(dog)', 1000, 5),
       (8, 'Total anesthesia', 2339, 1),
       (9, 'Local anesthesia', 500, 1);
/*!40000 ALTER TABLE `service_prices`
    ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `services`
--

DROP TABLE IF EXISTS `services`;
/*!40101 SET @saved_cs_client = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `services`
(
    `id`          int         NOT NULL AUTO_INCREMENT,
    `description` varchar(45) NOT NULL,
    `tag_color`   varchar(20) DEFAULT NULL,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB
  AUTO_INCREMENT = 6
  DEFAULT CHARSET = utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `services`
--

LOCK TABLES `services` WRITE;
/*!40000 ALTER TABLE `services`
    DISABLE KEYS */;
INSERT INTO `services`
VALUES (1, 'Operation', 'red'),
       (2, 'Vaccination', 'blue'),
       (3, 'Visit', 'green'),
       (4, 'Tests', 'pink'),
       (5, 'Grooming', 'yellow');
/*!40000 ALTER TABLE `services`
    ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users`
(
    `id`       int          NOT NULL AUTO_INCREMENT,
    `email`    varchar(100) NOT NULL,
    `password` varchar(100) NOT NULL,
    `role_id`  int DEFAULT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `login_UNIQUE` (`email`),
    KEY `users_roles_id_fk` (`role_id`),
    CONSTRAINT `users_roles_id_fk` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE = InnoDB
  AUTO_INCREMENT = 51
  DEFAULT CHARSET = utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users`
    DISABLE KEYS */;
INSERT INTO `users`
VALUES (12, 'amour@gmail.com', '$2a$10$QMrsEXyT9UCuxjHaOTdRZu3jrNDxMTYiS4la91gRtjenpa1tDyeQa', 1),
       (18, 'serovsky@gmail.com', '$2a$10$.KqzMXNJXqDrdVD1QQRr2OtwaiDnivVyFA/EE/Uc7fw38da0mcgOy', 2),
       (19, 'vitaliy@gmail.com', '$2a$10$ss3c/T5ET3Sff0O7QLnosuh/ze8ST7WL7ldffBRpJ9R7h09fSbt3K', 2),
       (20, 'ivan.petrov@example.com', '$2a$10$DTcxmqDPhkAyCi5Rh3NlFOt74lpQ1IdcUqYs1MdI47zH10ZFkx8QC', 2),
       (21, 'olga.sergeeva@example.com', '$2a$10$Vhw5T2029WPQQKcUAFrf2u9pofiVgk0Cdzz2D9c0b0vyrNyWUFtDW', 2),
       (22, 'mykola.kovalenko@example.com', '$2a$10$AqNI7tYCqfMdPJtZusCzUe2.IqUKEv8z8ANpH5V3baeLlM08FCg8i', 2),
       (24, 'shannon25@salas-morgan.info', '$2a$10$ahv7JHY1wtq40JeP7L5EHuLy6OETW9mjALqRmjKCcR8PniLcdfbFq', 2),
       (25, 'mroberts@roberts-riley.com', '$2a$10$LnYXQFT8peYAA8lbWC6kWeQjxv2xej7/axq60zyW.IrZpwVwyhlxW', 2),
       (26, 'alexanderphillips@williams.com', '$2a$10$8cJzbzCfzliL4TNsKAgCjuJRpakr.g0lEVRzDcIZ9nX.ihBFKrIum', 2),
       (28, 'donald72@mahoney.com', '$2a$10$gqi1d3zqz8yyv9xbWc1II.2RA.KgAT/0uAipfp/bps44X776z51m6', 2),
       (29, 'vmarquez@potter.info', '$2a$10$uVIYsLlAjTb6zNC/p4CFseXTLWz2GZ42eHuuZ8Wm8ZCS3YnCGGiEa', 2),
       (30, 'ellen39@gregory-price.com', '$2a$10$MmElrGrRHeNmmhwXDkC1P./RcCr.zYmOQV.ZrszTFOBbFC1BVVQtS', 2),
       (31, 'staffordpam@gmail.com', '$2a$10$8ZMA5r7z5/8vA4Qi4jxNsuczQfoy73Y2.8s9lHNZva1R.VvMbwab.', 2),
       (33, 'denisfors5@gmail.com', '$2a$10$l8LD23ygQ4RmU4e63rdG2.4XmX4ahwvRPHMsztueU5C7oAwRBknZq', 2),
       (34, 'a.shevchenko@health.ua', '$2a$10$.tr1Zs8cLdpAIqBtnvM6Y.erfCfELe55POkdDQAmaKBZW0eZFsM6e', 2),
       (36, 'charles80@gmail.com', '$2a$10$0pVf9tU2LkvqXW8KTyXONuwbV2O3rDXPJW4xw8zZsRK6lgN6S751u', 2),
       (37, 'qwatson@anderson.com', '$2a$10$D29H6xo7vRDDVf/D0tQGH.NuFyyupsn.ifeZGt.FJ5CZoN4KIv/P2', 2),
       (39, 'victoriya5@gmail.com', '$2a$10$zS5/iWrKIS82vBTXbXCRruU4JBEmhfaoLmf9mYey3IBHHzGnskmN.', 2),
       (44, 'admin@gmail.com', '$2a$10$MOIJHFo8t8dEtjrdrll4EukMZBaXufI0UKfMS2rdROyvtsT1a5lgC', 3),
       (47, 'wash@gmail.com', '$2a$10$KtJ12/bBE7rljN5sfVilYup4TGSdB8Xdt3Hy5AlqEZK2Rh.3hWgRa', 2),
       (48, 'doctor@gmail.com', '$2a$10$r34zw2nidsJfuQT4p3PCtOlyh0xHOvR/CqfbAYG0Pf8q0dFbe.0SC', 2),
       (49, 'bark@gmail.com', '$2a$10$ysNsK2lU9DBK3OrvmUzmF.7KfLIuXb1wLNttu8reHO1et.A62UH26', 2),
       (50, 'greg88@gmail.com', '$2a$10$yor7HQ7j.bctr3w/qSQd2.fvHHvbvOiDr5eo.OCqMKNi1BGDxIkMC', 2);
/*!40000 ALTER TABLE `users`
    ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE = @OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE = @OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS = @OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS = @OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT = @OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS = @OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION = @OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES = @OLD_SQL_NOTES */;

-- Dump completed on 2024-04-06 19:55:19
