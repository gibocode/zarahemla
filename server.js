const express = require("express");
const app = express();
const database = require("./database");
const cors = require("cors");
const passport = require("passport");
const GitHubStrategy = require("passport-github2").Strategy;
const session = require("express-session");
const User = require("./models/User");

app.use(express.json())

    // // Parse URL-encoded bodies (for form submissions)
    .use(express.urlencoded({ extended: true }))

    // Session and security
    .use(session({
        secret: "zarahemlasecret1234",
        resave: false,
        saveUninitialized: true
    }))
    .use(passport.initialize())
    .use(passport.session())

    // Header
    .use((req, res, next) => {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader(
            "Access-Control-Allow-Headers",
            "Origin, X-Requested-With, Content-Type, Accept, Z-Key"
        );
        res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        next();
    })
    .use(cors({ methods: ["GET", "POST", "PUT", "UPDATE", "DELETE", "PATCH"]}))
    .use(cors({ origin: "*" }))

    // Main Routes
   .use("/", require("./routes"));

// GitHub OAuth using passport
passport.use(new GitHubStrategy({
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
}));

// Serializing and deserializing user
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

// Default error handling
process.on("uncaughtException", (err) => {
    console.error("There was an uncaught error", err);
});

// Initialize database and start server
database.initialize((err) => {
    if (err) {
        console.error(err);
    }
    else {
        const port = process.env.APP_PORT || 3000;
        app.listen(port, () => {
            console.log(`Database connected and server is running on port ${port}`);
        });
    }
});
