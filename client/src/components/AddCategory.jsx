import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import "./AddCategory.css";

const AddCategory = ({ onNewCategory }) => {
  const [categoryName, setCategoryName] = useState("");

  const addCategory = (e, name) => {
    e.preventDefault();

    const data = {
      name,
    };

    fetch("http://localhost:4001/categories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        setCategoryName("");
        onNewCategory(name, data.id);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <section>
      <h2>Ajouter une catégorie</h2>
      <form onSubmit={(e) => addCategory(e, categoryName)}>
        <input
          placeholder="Category name"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          required
        />
        <Button
          style={{ marginLeft: 10 }}
          variant="primary"
          size="sm"
          type="submit"
        >
          Ajouter
        </Button>
      </form>
    </section>
  );
};

export default AddCategory;
