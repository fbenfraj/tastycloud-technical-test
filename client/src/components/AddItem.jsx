import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import "./AddItem.css";

const AddItem = ({ categories, onNewItem }) => {
  const [itemName, setItemName] = useState("");
  const [itemPrice, setItemPrice] = useState(0);
  const [itemCategory, setItemCategory] = useState(1);

  const addItem = (e, name, price, categoryId) => {
    e.preventDefault();

    const data = {
      name,
      price,
      categoryId,
    };

    fetch("http://localhost:4001/items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        setItemName("");
        setItemPrice(0);
        onNewItem(data.id, name, price, categoryId);
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <section className="addit-container">
      <h2>Ajouter un item</h2>
      {categories.length ? (
        <form onSubmit={(e) => addItem(e, itemName, itemPrice, itemCategory)}>
          <input
            placeholder="Item name"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            required
          />
          <input
            placeholder="Item price"
            value={itemPrice}
            onChange={(e) => setItemPrice(e.target.value)}
            required
          />
          <select
            onChange={(e) => {
              const selectedIndex = e.target.options.selectedIndex;
              setItemCategory(
                parseInt(
                  e.target.options[selectedIndex].getAttribute("data-key")
                )
              );
            }}
          >
            {categories.map((category) => (
              <option key={category.id} data-key={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          <Button
            style={{ marginLeft: 10 }}
            variant="primary"
            size="sm"
            type="submit"
          >
            Ajouter
          </Button>
        </form>
      ) : (
        <p>No categories yet.</p>
      )}
    </section>
  );
};

export default AddItem;
