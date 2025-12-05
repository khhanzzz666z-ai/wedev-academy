-- php-api/migrations/0001_update_users.sql
-- Migration: make users table match requested columns (safe, non-destructive)
-- IMPORTANT: BACKUP your database before running this migration:
-- mysqldump -u root -p webdev_academy > backup_webdev_academy.sql

-- This migration will:
-- 1) Rename `full_name` -> `fullname` (keperluan penamaan)
-- 2) Add `username` column (nullable)
-- 3) Ensure `email` is NOT NULL and has a UNIQUE index
-- 4) Ensure `password` is NOT NULL

-- NOTE: If your MySQL client does not support "IF NOT EXISTS" for indexes/columns,
-- run the checks shown in the README or run commands manually.

-- ---------------------------------------------------
-- 1) Rename column `full_name` to `fullname`
-- (If your table already uses `fullname` this will fail; check first.)
ALTER TABLE users CHANGE COLUMN full_name fullname VARCHAR(255) NOT NULL;

-- ---------------------------------------------------
-- 2) Add username column (nullable)
ALTER TABLE users ADD COLUMN username VARCHAR(255) NULL AFTER fullname;

-- ---------------------------------------------------
-- 3) Ensure email is NOT NULL
ALTER TABLE users MODIFY COLUMN email VARCHAR(255) NOT NULL;

-- Add UNIQUE index on email (if it doesn't already exist this will create it)
CREATE UNIQUE INDEX ux_users_email ON users (email);

-- ---------------------------------------------------
-- 4) Ensure password is NOT NULL
ALTER TABLE users MODIFY COLUMN password VARCHAR(255) NOT NULL;

-- End of migration
