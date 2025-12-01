const express = require("express");
const router = express.Router();
const passport = require("passport");

// GitHub OAuth Callback Route
router.get(
    "/github",
    passport.authenticate("github",
    {
        failureRedirect: "/",
        session: false
    }),
    (req, res) => {
        req.session.user = req.user;
        res.redirect("/");
    }
);

// Login Route
router.get(
    "/login",
    passport.authenticate("github"),
    (req, res) => {}
);

// Logout Route
router.get(
    "/logout",
    (req, res, next) => {
        req.logout((err) => {
            if (err) {
                return next(err);
            }
            res.redirect("/");
        });
    }
);

module.exports = router;
