/*
  Warnings:

  - You are about to drop the column `text` on the `News` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `News` table. All the data in the column will be lost.
  - Added the required column `text_ru` to the `News` table without a default value. This is not possible if the table is not empty.
  - Added the required column `text_uk` to the `News` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title_ru` to the `News` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title_uk` to the `News` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "News" DROP COLUMN "text",
DROP COLUMN "title",
ADD COLUMN     "text_ru" TEXT NOT NULL,
ADD COLUMN     "text_uk" TEXT NOT NULL,
ADD COLUMN     "title_ru" TEXT NOT NULL,
ADD COLUMN     "title_uk" TEXT NOT NULL;
