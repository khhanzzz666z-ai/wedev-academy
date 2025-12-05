const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define(
    "Lesson",
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },
      courseId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
      title: { type: DataTypes.STRING, allowNull: false },
      content: { type: DataTypes.TEXT, allowNull: true },
      duration: { type: DataTypes.INTEGER, allowNull: true },
      externalId: { type: DataTypes.STRING, allowNull: true },
    },
    {
      tableName: "lessons",
      timestamps: true,
    }
  );
};
