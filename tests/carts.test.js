const request = require("supertest");
const { app, startDatabase, closeDatabase } = require("../server")
const Cart = require("../models/Cart");
const ObjectId = require("mongodb").ObjectId;

beforeAll(async () => {
    await startDatabase();
});

// Tests for GET /carts endpoint
describe("GET /carts", () => {

    // Test retrieving all carts
    test("retrieve all carts", async () => {
        const res = await request(app).get("/carts");
        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeInstanceOf(Array);
    });
});

// Tests for GET /carts/user/:username endpoint
describe("GET /carts/user/:username", () => {

    let cart;

    const username = "testuser";
    const cartData = {
        cartId: "UC1234",
        username: username,
        cartItems: [
            "P001",
            "P002",
            "P003"
        ]
    };

    // Create a test cart before each test
    beforeEach(async () => {
        cart = new Cart();
        const response = await cart.create(cartData);
        id = response.insertedId;
    });

    // Test retrieving a all carts of a user by username
    test("retrieve all carts of a user", async () => {
        const res = await request(app).get(`/carts/user/${username}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeInstanceOf(Array);
        expect(res.body[0]).toBeInstanceOf(Object);
        expect(res.body[0].username).toEqual(username);
        expect(res.body[0]._id).toEqual(id.toString());
    });

    // Test retrieving all carts of non-existing username
    test("retrieve all carts of a non-existing username", async () => {
        const nonExistingUsername = "nonexistingusername";
        const res = await request(app).get(`/carts/user/${nonExistingUsername}`);
        expect(res.statusCode).toEqual(404);
    });

    // Clean up the test cart after each test
    afterEach(async () => {
        await cart.delete(id);
    });
});

// Tests for GET /carts/:id endpoint
describe("GET /carts/:id", () => {

    let cart;
    let id;

    const cartData = {
        cartId: "UC1234",
        username: "testuser",
        cartItems: [
            "P123",
            "P456",
            "P789"
        ]
    };

    // Create a test cart before each test
    beforeEach(async () => {
        cart = new Cart();
        const response = await cart.create(cartData);
        id = response.insertedId;
    });

    // Test retrieving a single cart by ID
    test("retrieve single cart", async () => {
        const res = await request(app).get(`/carts/${id}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeInstanceOf(Object);
        expect(ObjectId.isValid(res.body._id)).toBeTruthy();
        expect(res.body._id).toEqual(id.toString());
    });

    // Test retrieving a single cart by an invalid ID
    test("retrieve single cart with invalid ID", async () => {
        const invalidId = "testinvalidid1234";
        const res = await request(app).get(`/carts/${invalidId}`);
        expect(res.statusCode).toEqual(400);
    });

    // Test retrieving a single non-existing cart by ID
    test("retrieve single non-existing cart with valid ID", async () => {
        const nonExistingId = new ObjectId().toString();
        const res = await request(app).get(`/carts/${nonExistingId}`);
        expect(res.statusCode).toEqual(404);
    });

    // Clean up the test cart after each test
    afterEach(async () => {
        await cart.delete(id);
    });
});

afterAll(async () => {
    await closeDatabase();
});
