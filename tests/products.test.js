const request = require("supertest");
const { app, startDatabase, closeDatabase } = require("../server")
const Product = require("../models/Product");
const ObjectId = require("mongodb").ObjectId;

beforeAll(async () => {
    await startDatabase();
});

// Tests for GET /products endpoint
describe("GET /products", () => {

    // Test retrieving all products
    test("retrieve all products", async () => {
        const res = await request(app).get("/products");
        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeInstanceOf(Array);
    });
});

// Tests for GET /products/:id endpoint
describe("GET /products/:id", () => {

    let product;
    let id;

    const productData = {
        productId: "test123",
        productName: "Test Product",
        productDescription: "This is a test product.",
        productColor: "Red",
        productBrand: "TestBrand",
        productPrice: 19.99,
        productImage: "http://example.com/image.jpg"
    };

    // Create a test product before each test
    beforeEach(async () => {
        product = new Product();
        const response = await product.create(productData);
        id = response.insertedId;
    });

    // Test retrieving a single product by ID
    test("retrieve single product", async () => {
        const res = await request(app).get(`/products/${id}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeInstanceOf(Object);
        expect(ObjectId.isValid(res.body._id)).toBeTruthy();
        expect(res.body._id).toEqual(id.toString());
    });

    // Test retrieving a single product by an invalid ID
    test("retrieve single product with invalid ID", async () => {
        const invalidId = "testinvalidid1234";
        const res = await request(app).get(`/products/${invalidId}`);
        expect(res.statusCode).toEqual(400);
    });

    // Test retrieving a single non-existing product by ID
    test("retrieve single non-existing product with valid ID", async () => {
        const nonExistingId = new ObjectId().toString();
        const res = await request(app).get(`/products/${nonExistingId}`);
        expect(res.statusCode).toEqual(404);
    });

    // Clean up the test product after each test
    afterEach(async () => {
        await product.delete(id);
    });
});

afterAll(async () => {
    await closeDatabase();
});
