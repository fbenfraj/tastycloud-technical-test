const request = require("supertest");
const app = require("../app");

test("Should get all items", (done) => {
  request(app).get("/items").send().expect(200).end(done);
});

test("Should get an item by id", (done) => {
  request(app).get("/items/3").expect(200).end(done);
});

test("Should create a new item", (done) => {
  request(app)
    .post("/items")
    .send({
      name: "Test item",
      price: 99,
      categoryId: 1,
    })
    .expect(201)
    .end(done);
});

test("Should delete an item", (done) => {
  request(app).delete("/items/3").send().expect(200).end(done);
});


