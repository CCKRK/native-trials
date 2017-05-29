#pip install flask-mysql
USE `workout`;
DROP procedure IF EXISTS `spCreateUser`;
DELIMITER $$
USE `workout`$$
CREATE PROCEDURE `spCreateUser` (
IN p_Username varchar(55),
IN p_Password varchar(55)
)
BEGIN
if ( select exists (select 1 from users where email = p_username) ) THEN
    select 'Username Exists !!';
ELSE
insert into users
(
    email,
    password
)
values
(
    p_Username,
    p_Password
);
END IF;
END$$
DELIMITER ;
USE `workout`;
DROP procedure IF EXISTS `sp_AuthenticateUser`;
DELIMITER $$
USE `workout`$$
CREATE PROCEDURE `sp_AuthenticateUser` (
IN p_username VARCHAR(55)
)
BEGIN
     select * from users where email = p_username;
END$$
DELIMITER ;

CREATE TABLE `workout`.`exercises` (
  `exerciseID` INT NOT NULL AUTO_INCREMENT,
  `userID` VARCHAR(55) NOT NULL,
  `exerciseName` VARCHAR(55) NOT NULL,
  PRIMARY KEY (`exerciseID`));

#DELIMITER $$
#CREATE DEFINER=`root`@`localhost` 
#drop procedure if EXISTS 'sp_AddItems';
DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_AddItems`(
in p_userID int,
in p_item varchar(55)
)
BEGIN
    insert into exercises(
        userID,
        exerciseName
    )
    values(
        p_userID,
        p_item
    );
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_RemoveItems`(
in p_exerciseID varchar(55)
)
BEGIN
    DELETE FROM exercises WHERE exerciseID = p_exerciseID
END$$
DELIMITER ;



DELIMITER ;
DROP procedure IF EXISTS `sp_GetAllItems`;
DELIMITER $$
USE `workout`$$
CREATE PROCEDURE `sp_GetAllItems` (
in p_userID int
)
BEGIN
    select exerciseID, exerciseName from exercises where userID = p_userID; 
END$$
DELIMITER ;