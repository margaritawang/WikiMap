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

  router.post('/maps', (req, res) => {
    //res.send('hahahafuckyou');
    res.json({
      "name": "amy",
      "id": 1
    })

  })

  return router;
}
