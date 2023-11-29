-- CreateTable
CREATE TABLE "User" (
    "U_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "email" TEXT NOT NULL,
    "pseudo" TEXT NOT NULL,
    "password" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Group" (
    "G_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Reminder" (
    "R_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "dueDate" DATETIME NOT NULL,
    "GroupId" INTEGER NOT NULL,
    CONSTRAINT "Reminder_GroupId_fkey" FOREIGN KEY ("GroupId") REFERENCES "Group" ("G_id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "UsersInGroup" (
    "idUser" INTEGER NOT NULL,
    "idGroup" INTEGER NOT NULL,

    PRIMARY KEY ("idUser", "idGroup"),
    CONSTRAINT "UsersInGroup_idGroup_fkey" FOREIGN KEY ("idGroup") REFERENCES "Group" ("G_id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "UsersInGroup_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "User" ("U_id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Group_name_key" ON "Group"("name");
