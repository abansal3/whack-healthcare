-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Oct 02, 2016 at 05:23 PM
-- Server version: 5.6.17
-- PHP Version: 5.5.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `medrelay`
--

-- --------------------------------------------------------

--
-- Table structure for table `doctor`
--

CREATE TABLE IF NOT EXISTS `doctor` (
  `Doctor_id` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(11) DEFAULT NULL,
  `Phone` bigint(10) DEFAULT NULL,
  PRIMARY KEY (`Doctor_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=6 ;

--
-- Dumping data for table `doctor`
--

INSERT INTO `doctor` (`Doctor_id`, `Name`, `Phone`) VALUES
(1, 'Dr. Dorothy', 6175156728),
(2, 'Dr. Arpit', 6173566919),
(3, 'Dr. Dereck', 5084146564),
(4, 'Dr. Jay', 2566988556),
(5, 'Dr. Emma', 7812348973);

-- --------------------------------------------------------

--
-- Table structure for table `medicine`
--

CREATE TABLE IF NOT EXISTS `medicine` (
  `SKU` varchar(4) NOT NULL DEFAULT '',
  `Name` varchar(74) DEFAULT NULL,
  `Category` varchar(33) DEFAULT NULL,
  PRIMARY KEY (`SKU`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `medicine`
--

INSERT INTO `medicine` (`SKU`, `Name`, `Category`) VALUES
('DD95', 'Anti-haemorrhoid ointment, 30g tube', 'Drugs_Dermatology'),
('EC62', 'Slide, Microscope, Glass, 26mm x 76mm x 1mm', 'Lab_General_Supplies'),
('EJ07', 'Atropine sulphate, Eye drops, 1%, 10mL bottle', 'Drugs_Ophthalmic'),
('GU65', 'Ampicillin, Powder for injection, 1g vial', 'Drugs_Antibiotic'),
('HT61', 'Nystatin, 100,000 international units, vaginal insert', 'Drugs_Antifungal'),
('HT89', 'Amlodipine besylate, 5mg tablet', 'Drugs_Cardiovascular'),
('JU31', 'Beclomethasone, 50mcg/dose, 200 dose inhaler', 'Drugs_Respiratory_&_Antihistamine'),
('KA10', 'Atropine sulphate, 1mg/mL, 1mL ampoule', 'Drugs_Autonomic_Nervous_System'),
('MB37', 'Drainage Unit, Single chamber, Self-sealing sample ports, Sterile, 2500mL', 'MedEquip&Supplies_Wound_Drains'),
('NP66', 'Atenolol, 50mg tablet', 'Drugs_Autonomic_Nervous_System'),
('PY42', 'Amitriptyline hydrochloride, 25mg coated tablet', 'Drugs_Psychiatric_&_Antiepileptic'),
('RB70', 'Pad, Alcohol prep', 'MedEquip&Supplies_Skin_Prep'),
('SU61', 'Amoxicillin, Powder for suspension, 25mg/mL, 100mL bottle', 'Drugs_Antibiotic'),
('UH08', 'Amphotericin B, Powder for injection, 50mg vial', 'Drugs_Antifungal'),
('XT64', 'Amoxicillin, 50mg/mL (250mg/5mL), Powder for oral suspension, 100mL bottle', 'Drugs_Antibiotic'),
('YK34', 'Microscope coverslips 22x22mm glass', 'Lab_General_Supplies'),
('YN83', 'Mask, Surgical', 'MedEquip&Supplies_Surgical'),
('YP81', 'Metoclopramide hydrochloride, 5mg/mL, 2mL ampoule', 'Drugs_Gastrointestinal'),
('YY11', 'Bisacodyl, 5mg, enteric coated tablet', 'Drugs_Gastrointestinal'),
('ZF67', 'Amoxicillin, 500mg tablet', 'Drugs_Antibiotic');

-- --------------------------------------------------------

--
-- Table structure for table `medicine_vendor`
--

CREATE TABLE IF NOT EXISTS `medicine_vendor` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `SKU` varchar(4) DEFAULT NULL,
  `Vendor_id` int(1) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `SKU` (`SKU`),
  KEY `Vendor_id` (`Vendor_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=21 ;

--
-- Dumping data for table `medicine_vendor`
--

INSERT INTO `medicine_vendor` (`ID`, `SKU`, `Vendor_id`) VALUES
(1, 'PY42', 1),
(2, 'HT89', 1),
(3, 'SU61', 1),
(4, 'XT64', 1),
(5, 'ZF67', 1),
(6, 'UH08', 1),
(7, 'GU65', 1),
(8, 'DD95', 1),
(9, 'NP66', 1),
(10, 'KA10', 1),
(11, 'EJ07', 1),
(12, 'JU31', 1),
(13, 'YY11', 1),
(14, 'YN83', 2),
(15, 'RB70', 2),
(16, 'MB37', 2),
(17, 'YP81', 3),
(18, 'YK34', 3),
(19, 'EC62', 3),
(20, 'HT61', 3);

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE IF NOT EXISTS `orders` (
  `order_id` int(11) NOT NULL AUTO_INCREMENT,
  `doctor_id` int(1) DEFAULT NULL,
  `SKU` varchar(4) DEFAULT NULL,
  `quantity` int(2) DEFAULT NULL,
  `date` varchar(13) DEFAULT NULL,
  `order_status` varchar(9) DEFAULT NULL,
  `message_id` varchar(100) NOT NULL,
  PRIMARY KEY (`order_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=84 ;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`order_id`, `doctor_id`, `SKU`, `quantity`, `date`, `order_status`, `message_id`) VALUES
(1, 1, 'PY42', 3, 'Sep. 20. 2016', 'Completed', ''),
(2, 1, 'XT64', 5, 'Sep. 20. 2016', 'Completed', ''),
(3, 2, 'YP81', 10, 'Sep. 26. 2016', 'Completed', ''),
(4, 2, 'RB70', 24, 'Sep. 26. 2016', 'Completed', ''),
(5, 3, 'NP66', 4, 'Sep. 30. 2016', 'Pending', ''),
(6, 4, 'PY42', 29, 'Sep. 30. 2016', 'Pending', ''),
(7, 4, 'GU65', 38, 'Sep. 30. 2016', 'Pending', ''),
(8, 5, 'HT61', 24, 'Oct. 1. 2016', 'Pending', ''),
(73, 2, 'YN83', 4, 'Sun, 02 Oct 2', 'Pending', 'SM7936846f638d0969b35da3a7164596b5'),
(74, 2, 'HT61', 3, 'Sun, 02 Oct 2', 'Pending', 'SM7936846f638d0969b35da3a7164596b5'),
(75, 2, '', 0, 'Sun, 02 Oct 2', 'Pending', 'SM7936846f638d0969b35da3a7164596b5'),
(76, 2, 'PY42', 5, 'Sat, 01 Oct 2', 'Pending', 'SMe470dc45b74620524eb5c1a5f903dc70'),
(77, 2, 'JSH5', 3, 'Sat, 01 Oct 2', 'Pending', 'SMe470dc45b74620524eb5c1a5f903dc70'),
(78, 2, 'PY42', 0, 'Sat, 01 Oct 2', 'Pending', 'SM19b9455f3c370037b0da4d9f3db38d13'),
(79, 2, 'JSH5', 0, 'Sat, 01 Oct 2', 'Pending', 'SM19b9455f3c370037b0da4d9f3db38d13'),
(80, 4, '', 0, 'Sun, 02 Oct 2', 'Pending', 'SM2606d9f0b139112d7647e32a4e5a52a3'),
(81, 4, 'RB70', 30, 'Sun, 02 Oct 2', 'Pending', 'SMd400567a7c79a957f7521329a43997a6'),
(82, 3, 'EJ07', 15, 'Sun, 02 Oct 2', 'Pending', 'SM5cf6ae2df859fb3a0a0261c30397d38d'),
(83, 3, 'UH08', 50, 'Sun, 02 Oct 2', 'Pending', 'SM5cf6ae2df859fb3a0a0261c30397d38d');

-- --------------------------------------------------------

--
-- Table structure for table `vendor`
--

CREATE TABLE IF NOT EXISTS `vendor` (
  `Vendor_id` int(1) NOT NULL DEFAULT '0',
  `Vendor` varchar(16) DEFAULT NULL,
  `Password` varchar(100) NOT NULL,
  PRIMARY KEY (`Vendor_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `vendor`
--

INSERT INTO `vendor` (`Vendor_id`, `Vendor`, `Password`) VALUES
(1, 'Imres', 'password1'),
(2, 'McKesson Medical', 'password2'),
(3, 'IDA', 'password3');

--
-- Constraints for dumped tables
--

--
-- Constraints for table `medicine_vendor`
--
ALTER TABLE `medicine_vendor`
  ADD CONSTRAINT `medicine_vendor_ibfk_2` FOREIGN KEY (`Vendor_id`) REFERENCES `vendor` (`Vendor_id`),
  ADD CONSTRAINT `medicine_vendor_ibfk_1` FOREIGN KEY (`SKU`) REFERENCES `medicine` (`SKU`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
