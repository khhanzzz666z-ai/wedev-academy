const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define(
    "Enrollment",
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
      courseId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
      enrolledAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    },
    {
      tableName: "enrollments",
      timestamps: false,
    }
  );
};
