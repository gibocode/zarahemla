const request = require("supertest");
const { app, startDatabase, closeDatabase } = require("../server")
const User = require("../models/User");
const ObjectId = require("mongodb").ObjectId;

beforeAll(async () => {
    await startDatabase();
});

// Tests for GET /users endpoint
describe("GET /users", () => {

    // Test retrieving all users
    test("retrieve all users", async () => {
        const res = await request(app).get("/users");
        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeInstanceOf(Array);
    });
});

// Tests for GET /users/:id endpoint
describe("GET /users/:id", () => {

    let user;
    let id;

    const userData = {
        gitHubId: "123456789",
        username: "testuser",
        displayName: "Test User"
    };

    // Create a test user before each test
    beforeEach(async () => {
        user = new User();
        const response = await user.create(userData);
        id = response.insertedId;
    });

    // Test retrieving a single user by ID
    test("retrieve single user", async () => {
        const res = await request(app).get(`/users/${id}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeInstanceOf(Object);
        expect(ObjectId.isValid(res.body._id)).toBeTruthy();
        expect(res.body._id).toEqual(id.toString());
    });

    // Test retrieving a single user by an invalid ID
    test("retrieve single user with invalid ID", async () => {
        const invalidId = "testinvalidid1234";
        const res = await request(app).get(`/users/${invalidId}`);
        expect(res.statusCode).toEqual(400);
    });

    // Test retrieving a single non-existing user by ID
    test("retrieve single non-existing user with valid ID", async () => {
        const nonExistingId = new ObjectId().toString();
        const res = await request(app).get(`/users/${nonExistingId}`);
        expect(res.statusCode).toEqual(404);
    });

    // Clean up the test user after each test
    afterEach(async () => {
        await user.deleteById(id);
    });
});

afterAll(async () => {
    await closeDatabase();
});
