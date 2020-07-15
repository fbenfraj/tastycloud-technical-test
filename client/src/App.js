import React, { useState, useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import AddItem from "./components/AddItem";
import AddCategory from "./components/AddCategory";
import ItemsList from "./components/ItemsList";

function App() {
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);

  const handleNewCategory = (name, id) => {
    setCategories([
      ...categories,
      {
        id,
        name,
      },
    ]);
  };

  const handleNewItem = (id, name, price, categoryId) => {
    setItems([
      ...items,
      {
        id,
        name,
        price,
        categoryId,
      },
    ]);
  };

  const handleDeleteItem = (id) => {
    setItems([...items.filter((item) => item.id !== id)]);
  };

  useEffect(() => {
    const fetchCategories = () => {
      fetch("http://localhost:4001/categories")
        .then((response) => response.json())
        .then((response) => {
          setCategories(response);
        });
    };

    const fetchItems = () => {
      fetch("http://localhost:4001/items")
        .then((response) => response.json())
        .then((response) => {
          setItems(response);
        });
    };

    fetchCategories();
    fetchItems();
  }, []);

  return (
    <div className="App">
      <h1 style={{ margin: "20px" }}>TastyCloud Technical Test</h1>
      <AddItem
        onNewItem={(id, name, price, categoryId) =>
          handleNewItem(id, name, price, categoryId)
        }
        categories={categories}
      />
      <AddCategory onNewCategory={(name, id) => handleNewCategory(name, id)} />
      <ItemsList
        categories={categories}
        items={items}
        onDelete={(id) => handleDeleteItem(id)}
      />
    </div>
  );
}

export default App;
