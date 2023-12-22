require("dotenv").config();
const fs = require("fs");
const https = require("https");
const path = require("path");
const express = require("express");
const helmet = require("helmet");
const passport = require("passport");
const { Strategy } = require("passport-google-oauth20");
const cookieSession = require("cookie-session");

const PORT = 3000;

const config = {
  CLIENT_ID: process.env.CLIENT_ID,
  CLIENT_SECRET: process.env.CLIENT_SECRET,
  COOKIE_KEY_1: process.env.COOKIE_KEY_1,
  COOKIE_KEY_2: process.env.COOKIE_KEY_2,
};

function verifyCallback(accessToken, refreshToken, profile, done) {
  done(null, profile);
}

passport.use(
  new Strategy(
    {
      clientID: config.CLIENT_ID,
      clientSecret: config.CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    verifyCallback
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  done(null, id);
});

const app = express();

app.use(helmet());
app.use(
  cookieSession({
    name: "session",
    maxAge: 1000 * 60 * 60 * 24,
    keys: [config.COOKIE_KEY_1, config.COOKIE_KEY_2],
  })
);
app.use(passport.initialize());
app.use(passport.session());

function checkLoggedIn(req, res, next) {
  const isLoggedIn = req.isAuthenticated() && req.user;

  if (!isLoggedIn) {
    return res.status(401).json({
      error: "You must be logged in",
    });
  }

  next();
}

app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["email"],
  })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/failure",
    successRedirect: "/",
    session: true,
  }),
  () => {
    console.log("Google called is back!");
  }
);

app.get("/auth/logout", (req, res) => {
  req.logout();
  return res.redirect("/");
});

app.get("/secret", checkLoggedIn, (req, res) => {
  return res.send("Your personal secret is 42!");
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/failure", (req, res) => {
  return res.send("Failed to login");
});

https
  .createServer(
    {
      cert: fs.readFileSync(path.join(__dirname, "cert.pem")),
      key: fs.readFileSync(path.join(__dirname, "key.pem")),
    },
    app
  )
  .listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
