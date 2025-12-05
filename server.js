const express = require("express");
const app = express();
const database = require("./database");
const cors = require("cors");
const passport = require("passport");
const GitHubStrategy = require("passport-github2").Strategy;
const session = require("express-session");
const User = require("./models/User");

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: "zarahemlasecret1234",
    resave: false,
    saveUninitialized: true
}));

app.use(passport.initialize())
app.use(passport.session())

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Z-Key"
    );
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
});

app.use(cors({ methods: ["GET", "POST", "PUT", "UPDATE", "DELETE", "PATCH"]}));
app.use(cors({ origin: "*" }));

// Routes
app.use("/", require("./routes"));

// GitHub OAuth
passport.use(
    new GitHubStrategy({
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: process.env.CALLBACK_URL
    },
    async (accessToken, refreshToken, profile, done)  => {
        try {
            let model = new User();
            // Creates new user if no existing user from the database
            let user = await model.getByGitHubId(profile.id);
            if (!user) {
                const response = await model.create({
                    gitHubId: profile.id,
                    username: profile.username,
                    displayName: profile.displayName,
                });
                user = await model.getByGitHubId(profile.id);
            }
            // Access token stored only in session
            user.accessToken = accessToken;
            return done(null, user);
        }
        catch (err) {
            console.error(err);
            return done(err, null);
        }
    })
);

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

// Default error handler
process.on("uncaughtException", (err) => {
    console.error("Uncaught Error: ", err);
});

// Database connection management
let dbConnection = null;

async function startDatabase() {
    return new Promise((resolve, reject) => {
        database.initialize((err, db) => {
            if (err) return reject(err);
            dbConnection = db;
            resolve(db);
        });
    });
}

async function closeDatabase() {
    if (dbConnection && dbConnection.close) {
        await dbConnection.close();
    }
}

// Start server only when NOT testing
if (process.env.NODE_ENV !== "test") {
    startDatabase().then(() => {
        const port = process.env.APP_PORT || 3000;
        app.listen(port, () =>
            console.log(`Database connected. Server running on port ${port}`)
        );
    });
}

module.exports = { app, startDatabase, closeDatabase };
