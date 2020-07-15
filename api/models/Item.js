module.exports = (sequelize, type) =>
  sequelize.define("item", {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: type.STRING,
      allowNull: false,
    },
    price: {
      type: type.FLOAT,
      allowNull: false,
    },
  });
