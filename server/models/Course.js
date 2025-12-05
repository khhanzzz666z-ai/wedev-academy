import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.js";

const Course = sequelize.define(
  "Course",
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    level: DataTypes.STRING,
    hours: DataTypes.INTEGER,
    desc: DataTypes.TEXT,
    image: DataTypes.STRING,
    instructor: DataTypes.STRING,
    rating: DataTypes.FLOAT,
    students: DataTypes.INTEGER,
    lessons: {
      type: DataTypes.JSON,
      defaultValue: [],
    },
  },
  { timestamps: true }
);

export default Course;
