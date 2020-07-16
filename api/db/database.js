// import CategoryModel from "./models/Category";
const { Sequelize } = require("sequelize");

const CategoryModel = require("../models/Category");
const ItemModel = require("../models/Item");
const IngredientModel = require("../models/Ingredient");
const OptionModel = require("../models/Option");

var sequelizeConnection = new Sequelize(
  process.env.DATABASE_NAME,
  "root",
  "Azerty123!",
  {
    host: "db",
    dialect: "mysql",
  }
);

sequelizeConnection
  .authenticate()
  .then(function (err) {
    console.log("Connection has been established successfully.");
  })
  .catch(function (err) {
    console.log("Unable to connect to the database:", err);
  });

const Category = CategoryModel(sequelizeConnection, Sequelize);
const Item = ItemModel(sequelizeConnection, Sequelize);
const Ingredient = IngredientModel(sequelizeConnection, Sequelize);
const Option = OptionModel(sequelizeConnection, Sequelize);

Category.hasMany(Item, {
  foreignKey: "categoryId",
});
Item.belongsTo(Category);

Item.hasMany(Ingredient, {
  foreignKey: "itemId",
});
Ingredient.belongsTo(Item);

Item.hasMany(Option, {
  foreignKey: "itemId",
});
Option.belongsTo(Item);

populate = async () => {
  //Cleaning up old database entries
  await Category.destroy({
    where: {},
  });
  await Item.destroy({
    where: {},
  });
  await Ingredient.destroy({
    where: {},
  });
  await Option.destroy({
    where: {},
  });

  //Categories
  await Category.create({
    id: 1,
    name: "Starters",
  });
  await Category.create({
    id: 2,
    name: "Main Dishes",
  });
  await Category.create({
    id: 3,
    name: "Desserts",
  });

  //Items
  await Item.create({
    id: 1,
    name: "Salad",
    price: 15.0,
    categoryId: 1,
  });
  await Item.create({
    id: 2,
    name: "Cheese balls",
    price: 18.87,
    categoryId: 1,
  });
  await Item.create({
    id: 3,
    name: "ChickenSatay",
    price: 17.94,
    categoryId: 1,
  });

  await Item.create({
    id: 4,
    name: "Pasta",
    price: 22.42,
    categoryId: 2,
  });
  await Item.create({
    id: 5,
    name: "Pizza",
    price: 22.48,
    categoryId: 2,
  });
  await Item.create({
    id: 6,
    name: "Steak (with fries)",
    price: 22.47,
    categoryId: 2,
  });

  await Item.create({
    id: 7,
    name: "Tiramisu",
    price: 6.43,
    categoryId: 3,
  });
  await Item.create({
    id: 8,
    name: "Pannacotta",
    price: 6.43,
    categoryId: 3,
  });
  await Item.create({
    id: 9,
    name: "Ice Cream",
    price: 6.43,
    categoryId: 3,
  });

  //Ingredients
  await Ingredient.create({
    id: 1,
    name: "Lettuce",
    itemId: 1,
  });
  await Ingredient.create({
    id: 2,
    name: "Tomatoes",
    itemId: 1,
  });
  await Ingredient.create({
    id: 3,
    name: "Cheese",
    itemId: 2,
  });
  await Ingredient.create({
    id: 4,
    name: "Meat",
    itemId: 6,
  });
  await Ingredient.create({
    id: 5,
    name: "Fries",
    itemId: 6,
  });

  //Options
  await Option.create({
    id: 1,
    name: "Cooking degree",
    value: "Blue",
    itemId: 6,
  });
  await Option.create({
    id: 2,
    name: "Cooking degree",
    value: "Rare",
    itemId: 6,
  });
  await Option.create({
    id: 3,
    name: "Cooking degree",
    value: "Well done",
    itemId: 6,
  });
};

populate();

sequelizeConnection.sync().then(() => {
  console.log("All tables have been created.");
});

module.exports = {
  Category,
  Item,
  Ingredient,
  Option,
};
