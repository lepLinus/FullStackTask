--
-- Database: `sample`
--

-- --------------------------------------------------------

--
-- Table structure for table `Books`
--
CREATE DATABASE IF NOT EXISTS sample;
USE sample;

CREATE TABLE IF NOT EXISTS `Books` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Title` varchar(255) DEFAULT NULL,
  `Author` varchar(50) DEFAULT NULL,
  `Description` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=10001 ;

--
-- Dumping data for table `user_details`
--

INSERT INTO `Books` (`Id`, `Title`, `Author`, `Description`) VALUES
(1, 'Lord Of the Rings', 'JRR Tolkien', 'Good book'),
(2, 'Ein Mann will nach Oben', 'Hans Fallada', 'American success story'),
(3, 'Letters to Millena', 'Franz Kaffka', 'Sad')
