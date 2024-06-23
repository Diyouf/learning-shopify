/*
  Warnings:

  - The primary key for the `CustomerReviewModel` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `id` to the `CustomerReviewModel` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_CustomerReviewModel" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "productName" TEXT NOT NULL,
    "review" TEXT NOT NULL
);
INSERT INTO "new_CustomerReviewModel" ("productName", "review") SELECT "productName", "review" FROM "CustomerReviewModel";
DROP TABLE "CustomerReviewModel";
ALTER TABLE "new_CustomerReviewModel" RENAME TO "CustomerReviewModel";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
