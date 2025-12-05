import sequelize from "../config/sequelize.js";
import User from "./user.js";
import Course from "./course.js";
import Enrollment from "./enrollment.js";
import VerificationCode from "./verificationCode.js";

// Define associations if needed in future
// For now, Enrollment.userId -> User.id, Enrollment.courseId -> Course.id

const syncDb = async () => {
  await sequelize.sync({ alter: true });
};

export { sequelize, User, Course, Enrollment, VerificationCode, syncDb };
