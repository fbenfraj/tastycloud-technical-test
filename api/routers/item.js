const express = require("express");
const Item = require("../db/database").Item;

const router = new express.Router();

//get all items
router.get("/items", async (req, res) => {
  try {
    const items = await Item.findAll();
    res.status(200).send(items);
  } catch (e) {
    console.log(e);
    res.status(404).send();
  }
});

//get items by category
router.get("/items/:categoryId", async (req, res) => {
  try {
    const items = await Item.findAll({
      where: {
        categoryId: req.params.categoryId,
      },
    });
    res.status(200).send(items);
  } catch (e) {
    console.log(e);
    res.status(404).send();
  }
});

router.post("/items", async (req, res) => {
  const item = new Item({
    ...req.body,
  });

  try {
    await item.save();
    res.status(201).send(item);
  } catch (e) {
    console.log(e);
    res.status(404).send(e);
  }
});

router.delete("/items/:id", async (req, res) => {
  try {
    const item = await Item.destroy({
      where: {
        id: req.params.id,
      },
    });
    !item
      ? res.status(404).send()
      : res.status(200).send({ message: "Item deleted." });
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
