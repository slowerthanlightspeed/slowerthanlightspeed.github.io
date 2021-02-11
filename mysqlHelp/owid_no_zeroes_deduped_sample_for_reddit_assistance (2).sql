-- phpMyAdmin SQL Dump
-- version 4.4.12
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Feb 11, 2021 at 06:29 PM
-- Server version: 5.6.25
-- PHP Version: 5.5.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `worst_case_covid_intl`
--

-- --------------------------------------------------------

--
-- Table structure for table `owid_no_zeroes_deduped_for_reddit`
--

CREATE TABLE IF NOT EXISTS `owid_no_zeroes_deduped_for_reddit` (
  `p_k` int(11) NOT NULL,
  `iso_3166` int(11) NOT NULL,
  `x` decimal(11,8) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=33901 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `owid_no_zeroes_deduped_for_reddit`
--

INSERT INTO `owid_no_zeroes_deduped_for_reddit` (`p_k`, `iso_3166`, `x`) VALUES
(63, 4, '0.49646000'),
(64, 4, '0.54145700'),
(65, 4, '0.55945500'),
(81, 4, '0.95692300'),
(82, 4, '1.01091900'),
(83, 4, '1.02291800'),
(126, 4, '1.98134100'),
(127, 4, '1.99334100'),
(128, 4, '2.01883800'),
(129, 4, '2.03383700'),
(228, 4, '2.95326400'),
(229, 4, '2.99226100'),
(230, 4, '3.01625900'),
(231, 4, '3.03725700');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `owid_no_zeroes_deduped_for_reddit`
--
ALTER TABLE `owid_no_zeroes_deduped_for_reddit`
  ADD PRIMARY KEY (`p_k`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `owid_no_zeroes_deduped_for_reddit`
--
ALTER TABLE `owid_no_zeroes_deduped_for_reddit`
  MODIFY `p_k` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=33901;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
