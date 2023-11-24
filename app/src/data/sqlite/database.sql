DROP TABLE Users;
DROP TABLE Party;
DROP TABLE PartyUsers;

CREATE TABLE Users(
    userId Integer,
    nameUser Text,
    CONSTRAINT PK_Users PRIMARY KEY("userId" AUTOINCREMENT)
);

CREATE TABLE Party(
    partyId Integer,
    winnerId Integer,
    CONSTRAINT PK_Party PRIMARY KEY("partyId" AUTOINCREMENT),
    CONSTRAINT FK_Party FOREIGN KEY(winnerId) REFERENCES Users(userId)
);

CREATE TABLE PartyUsers(
    partyId Integer,
    userId Integer,
    CONSTRAINT PK_PartyUsers PRIMARY KEY(partyId, userId),
    FOREIGN KEY(partyId) REFERENCES Party(partyId),
    FOREIGN KEY(userId) REFERENCES Users(userId)
);