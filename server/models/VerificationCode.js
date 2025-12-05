import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.js";

const VerificationCode = sequelize.define(
  "VerificationCode",
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    expiresAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  { timestamps: true }
);

export default VerificationCode;
