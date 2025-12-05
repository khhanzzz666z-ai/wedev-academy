const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME || "webdev_academy",
  process.env.DB_USER || "root",
  process.env.DB_PASSWORD || "",
  {
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
    dialect: "mysql",
    logging: false,
  }
);

const User = require("./user")(sequelize);
const Course = require("./course")(sequelize);
const Lesson = require("./lesson")(sequelize);
const LessonProgress = require("./lessonProgress")(sequelize);
const Enrollment = require("./enrollment")(sequelize);

// Associations
Course.hasMany(Lesson, { foreignKey: "courseId", as: "lessons" });
Lesson.belongsTo(Course, { foreignKey: "courseId", as: "course" });

User.hasMany(LessonProgress, { foreignKey: "userId", as: "progress" });
LessonProgress.belongsTo(User, { foreignKey: "userId", as: "user" });
Lesson.hasMany(LessonProgress, { foreignKey: "lessonId", as: "progress" });
LessonProgress.belongsTo(Lesson, { foreignKey: "lessonId", as: "lesson" });

User.hasMany(Enrollment, { foreignKey: "userId", as: "enrollments" });
Enrollment.belongsTo(User, { foreignKey: "userId", as: "user" });
Course.hasMany(Enrollment, { foreignKey: "courseId", as: "enrollments" });
Enrollment.belongsTo(Course, { foreignKey: "courseId", as: "course" });

module.exports = { sequelize, User, Course, Lesson, LessonProgress };
