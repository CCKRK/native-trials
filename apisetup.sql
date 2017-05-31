
DROP PROCEDURE IF EXISTS spCreateUser;
DELIMITER $$
CREATE PROCEDURE `spCreateUser` (
IN p_Username VARCHAR(55),
IN p_Password VARCHAR(55)
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
DROP PROCEDURE IF EXISTS sp_AuthenticateUser;
DELIMITER $$
CREATE PROCEDURE `sp_AuthenticateUser` (
IN p_username VARCHAR(55)
)
BEGIN
     select * from users where email = p_username;
END$$
DELIMITER ;
DROP PROCEDURE IF EXISTS sp_AddItems;
DELIMITER $$
CREATE PROCEDURE `sp_AddItems`(
in p_userID INT,
in p_item VARCHAR(55)
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
DROP PROCEDURE sp_RemoveItems;
DELIMITER $$
CREATE PROCEDURE `sp_RemoveItems`(
in p_exerciseID VARCHAR(55)
)
BEGIN
DELETE FROM exercises WHERE exerciseID = p_exerciseID;
END$$
DELIMITER ;
DROP PROCEDURE IF EXISTS sp_GetAllItems;
DELIMITER $$
CREATE PROCEDURE `sp_GetAllItems` (
in p_routineID int
)
BEGIN
    select routineName, exerciseName, exerciseID from exercises JOIN routines ON exercises.routineID = p_routineID; 
END$$
DELIMITER ;


### TEST TABLES
create table exercises (exerciseID INT NOT NULL AUTO_INCREMENT,
routineID INT NOT NULL,
exerciseName VARCHAR(55) NOT NULL,
PRIMARY KEY(exerciseID));

insert into exercises (routineID,exerciseName) VALUES (1,'Bench Press');
insert into exercises (routineID,exerciseName) VALUES (1,'Military Press');
insert into exercises (routineID,exerciseName) VALUES (1,'Squats');
insert into exercises (routineID,exerciseName) VALUES (1,'DeadLifts');
insert into exercises (routineID,exerciseName) VALUES (2,'Bench Press');
insert into exercises (routineID,exerciseName) VALUES (2,'Incline Bench Press');

create table routines (routineID INT NOT NULL AUTO_INCREMENT,
userID INT NOT NULL,
routineName VARCHAR(55) NOT NULL,
PRIMARY KEY (routineID));

insert into routines (routineName,userID) VALUES ("Coolcicada's PPL",1);
insert into routines (routineName,userID) VALUES ("Bro Split",2);
