import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import "./ItemList.css";

const ItemsList = ({ categories, items, onDelete }) => {
  const deleteItem = (id) => {
    fetch("http://localhost:4001/items/" + id, {
      method: "delete",
    }).then((response) => {
      response.json();
      onDelete(id);
    });
  };

  return (
    <Container className="itemli-container">
      <Row className="row-cols-6 justify-content-center">
        {categories.map((category) => {
          return (
            <Col key={category.id}>
              <h2>{category.name}</h2>
              {items
                .filter((item) => item.categoryId === category.id)
                .map((item) => (
                  <div key={item.id} className="itemli-item">
                    <div>
                      {item.name} - {item.price}€
                    </div>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => deleteItem(item.id)}
                    >
                      Supprimer
                    </Button>
                  </div>
                ))}
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

export default ItemsList;
