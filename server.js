"use strict";

require('dotenv').config();

const PORT        = process.env.PORT || 8080;
const ENV         = process.env.ENV || "development";
const express     = require("express");
const bodyParser  = require("body-parser");
const sass        = require("node-sass-middleware");
const app         = express();

const knexConfig  = require("./knexfile");
const knex        = require("knex")(knexConfig[ENV]);
const morgan      = require('morgan');
const knexLogger  = require('knex-logger');
const cookieSession = require('cookie-session');
const cookieParser = require('cookie-parser')

// Seperated Routes for each Resource
const usersRoutes = require("./routes/users");

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));
app.use(cookieParser());

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));
//
// app.use((req, res, next) => {
//   const session = req.session;
//   console.log("session",session);
//   res.locals.user = session;
//   next();
// })

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

app.use(cookieSession({
  name: 'session',
  keys: ['key']
}));

// Mount all resource routes
app.use("/api/", usersRoutes(knex));

// Home page
app.get("/", (req, res) => {
  res.render("index", {
    user: req.session
  });
});

app.get('/login/:id', (req, res) => {
    // req.session.user_id = req.params.id;
    req.session.user_id = req.params.id;
    console.log('here');
    console.log(req.params.id);
    res.redirect('/');
});

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});

// app.get("/profile", (req, res) => {
//     res.render("profile", templateVars);
// })
