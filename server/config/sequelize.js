import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

// Create database if it doesn't exist (without target database)
export async function ensureDatabaseExists() {
  try {
    const tempSeq = new Sequelize(
      "mysql",
      process.env.MYSQL_USER || "root",
      process.env.MYSQL_PASSWORD || "",
      {
        host: process.env.MYSQL_HOST || "localhost",
        port: process.env.MYSQL_PORT ? Number(process.env.MYSQL_PORT) : 3306,
        dialect: "mysql",
        logging: false,
      }
    );

    const dbName = process.env.MYSQL_DATABASE || "webdev_academy";
    await tempSeq.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\``);
    await tempSeq.close();
  } catch (err) {
    console.error("Failed to create database:", err.message);
  }
}

const sequelize = new Sequelize(
  process.env.MYSQL_DATABASE || "webdev_academy",
  process.env.MYSQL_USER || "root",
  process.env.MYSQL_PASSWORD || "",
  {
    host: process.env.MYSQL_HOST || "localhost",
    port: process.env.MYSQL_PORT ? Number(process.env.MYSQL_PORT) : 3306,
    dialect: "mysql",
    logging: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

export default sequelize;
