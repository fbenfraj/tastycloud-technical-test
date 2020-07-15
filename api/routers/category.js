const express = require("express");
const Category = require("../db/database").Category;

const router = new express.Router();

//get all items
router.get("/categories", async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.status(200).send(categories);
  } catch (e) {
    console.log(e);
    res.status(404).send();
  }
});

router.post("/categories", async (req, res) => {
  const category = new Category({
    ...req.body,
  });

  try {
    await category.save();
    res.status(201).send(category);
  } catch (e) {
    console.log(e);
    res.status(404).send(e);
  }
});

module.exports = router;
