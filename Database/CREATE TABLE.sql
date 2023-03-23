CREATE TABLE user(
username VARCHAR(225),
password VARCHAR(225),
PRIMARY KEY(username)
);

CREATE TABLE campus(
idcampus CHAR(5),
name VARCHAR(225),
location VARCHAR(225),
PRIMARY KEY(idcampus)
);

CREATE TABLE studies(
idstudies CHAR(5),
name VARCHAR(45),
studie_points INT,
year INT,
PRIMARY KEY(idstudies)
);

CREATE TABLE student(
idstudent CHAR(5),
email VARCHAR(225),
date_of_birth DATE,
graduation_year DATE,
idcampus CHAR(5),
idstudies CHAR(5),
username VARCHAR(225),
PRIMARY KEY(idstudent),
FOREIGN KEY(idcampus) REFERENCES campus(idcampus),
FOREIGN KEY(idstudies) REFERENCES studies(idstudies),
FOREIGN KEY(username) REFERENCES user(username)
);

CREATE TABLE polls(
idpolls INT,
title TEXT(225),
description TEXT(225),
idcampus VARCHAR(225),
idstudies INT,
PRIMARY KEY(idpolls),
FOREIGN KEY(idcampus) REFERENCES campus(idcampus),
FOREIGN KEY(idstudies) REFERENCES studies(idstudies)
);

CREATE TABLE poll_answer(
idpoll_answer INT,
title TEXT(225),
votes INT,
idpolls INT,
PRIMARY KEY(idpoll_answer),
FOREIGN KEY(idpolls) REFERENCES polls(idpolls)
);