const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define(
    "LessonProgress",
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
      lessonId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
      currentStep: { type: DataTypes.INTEGER.UNSIGNED, defaultValue: 0 },
      progress: { type: DataTypes.FLOAT, defaultValue: 0 },
      completedSteps: {
        type: DataTypes.JSON,
        allowNull: false,
        defaultValue: [],
      },
    },
    {
      tableName: "lesson_progress",
      timestamps: true,
    }
  );
};
