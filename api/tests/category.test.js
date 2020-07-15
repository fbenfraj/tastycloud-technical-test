const request = require("supertest");
const app = require("../app");

test("Should get all categories", (done) => {
  request(app).get("/categories").send().expect(200).end(done);
});

test("Should create a new category", (done) => {
  request(app)
    .post("/categories")
    .send({
      name: "Test category",
    })
    .expect(201)
    .end(done);
});
