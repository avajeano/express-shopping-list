process.env.NODE_ENV = "test";
const request = require("supertest");
const app = require("../app");

let items = require("../fakeDb");

let item = { name: "bread", price: 4.50 }

// add item before each test
beforeEach(async function() {
    items.push(item)
});

afterEach(async function() {
    items = []
});

describe("GET /items", function() {
    test("Get list of items", async function() {
        const res = await request(app).get("/items");
        const { items } = res.body;
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty("items");
    })
})

describe("GET /items/:name", function(){
    test("Get a singe item", async function() {
        const res = await request(app).get("/items/bread");
        expect(res.statusCode).toBe(200);
        expect(res.body.item).toEqual(item);
    });

    test("404 error handlinng", async function(){
        const res = await request(app).get("/items/candy");
        expect(res.statusCode).toBe(404);
    });
});

describe("POST /items", function() {
    test("Create a new item", async function() {
        const res = await request(app).post("/items").send({name: "eggs", price: 4.00 });
        expect(res.statusCode).toBe(200);
        expect(res.body.item.name).toEqual("eggs");
        expect(res.body.item.price).toEqual(4.00);
    });
});

describe("DELETE /items", function() {
    test("Delete specified item", async function() {
        const res = await request(app).delete(`/items/${item.name}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ message: "Deleted" })
    });
});