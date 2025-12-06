const request = require("supertest");
const { app, startDatabase, closeDatabase } = require("../server")
const Category = require("../models/Category");
const ObjectId = require("mongodb").ObjectId;

beforeAll(async () => {
    await startDatabase();
});

// Tests for GET /categories endpoint
describe("GET /categories", () => {

    // Test retrieving all categories
    test("retrieve all categories", async () => {
        const res = await request(app).get("/categories");
        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeInstanceOf(Array);
    });
});

// Tests for GET /categories/:id endpoint
describe("GET /categories/:id", () => {

    let category;
    let id;

    const categoryData = {
        categoryId: "test123",
        categoryName: "Test Category",
        categoryDescription: "This is a test category."
    };

    // Create a test category before each test
    beforeEach(async () => {
        category = new Category();
        const response = await category.createCategory(categoryData);
        id = response.insertedId;
    });

    // Test retrieving a single category by ID
    test("retrieve single category", async () => {
        const res = await request(app).get(`/categories/${id}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeInstanceOf(Object);
        expect(ObjectId.isValid(res.body._id)).toBeTruthy();
        expect(res.body._id).toEqual(id.toString());
    });

    // Test retrieving a single category by an invalid ID
    test("retrieve single category with invalid ID", async () => {
        const invalidId = "testinvalidid1234";
        const res = await request(app).get(`/categories/${invalidId}`);
        expect(res.statusCode).toEqual(400);
    });

    // Test retrieving a single non-existing category by ID
    test("retrieve single non-existing category with valid ID", async () => {
        const nonExistingId = new ObjectId().toString();
        const res = await request(app).get(`/categories/${nonExistingId}`);
        expect(res.statusCode).toEqual(404);
    });

    // Clean up the test category after each test
    afterEach(async () => {
        await category.deleteCategory(id);
    });
});

afterAll(async () => {
    await closeDatabase();
});
