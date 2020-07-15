module.exports = (sequelize, type) =>
  sequelize.define("option", {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: type.STRING,
      allowNull: false,
    },
    value: {
      type: type.STRING,
      allowNull: false,
    },
  });
