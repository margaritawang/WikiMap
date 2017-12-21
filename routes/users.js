"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.get("/", (req, res) => {
    knex
      .select("*")
      .from("users")
      .then((results) => {
        res.json(results);
    });
  });

  router.get('/maps/:id', (req, res) => {
    res.send('ok');
  })

  router.get('/points/:id', (req, res) => {
    res.send('got point');
  })

  router.get
  return router;
}

