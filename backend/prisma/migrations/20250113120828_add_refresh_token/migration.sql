-- DropIndex
DROP INDEX "User_Email_key";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "refreshToken" TEXT;
