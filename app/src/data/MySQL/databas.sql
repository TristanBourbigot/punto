DROP TABLE Users;
DROP TABLE Party;
DROP TABLE PartyUsers;

CREATE TABLE Users(
    userId Integer,
    username Varchar(255),
    CONSTRAINT PK_Users PRIMARY KEY("userId" AUTOINCREMENT)
);

CREATE TABLE Party(
    partyId Integer,
    partyName Varchar(255),
    CONSTRAINT PK_Party PRIMARY KEY("partyId" AUTOINCREMENT)
);

CREATE TABLE PartyUsers(
    partyId Integer,
    userId Integer,
    CONSTRAINT PK_PartyUsers PRIMARY KEY("partyId", "userId"),
    CONSTRAINT FK_PartyUsers_Party FOREIGN KEY("partyId") REFERENCES Party("partyId"),
    CONSTRAINT FK_PartyUsers_Users FOREIGN KEY("userId") REFERENCES Users("userId")
);