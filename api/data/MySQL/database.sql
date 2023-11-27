CREATE DATABASE punto;
USE punto;

CREATE TABLE Users(
    userId int NOT NULL AUTO_INCREMENT,
    nameUser Varchar(255) NOT NULL,
    PRIMARY KEY(userId)
);

CREATE TABLE Party(
    partyId int NOT NULL AUTO_INCREMENT,
    partyName Varchar(255),
    PRIMARY KEY(partyId)
);

CREATE TABLE PartyUsers(
    partyId int NOT NULL,
    userId int NOT NULL,
    PRIMARY KEY(partyId, userId),
    FOREIGN KEY(partyId) REFERENCES Party(partyId),
    FOREIGN KEY(userId) REFERENCES Users(userId)
);