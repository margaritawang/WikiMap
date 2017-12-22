"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  // router.get("/", (req, res) => {
  //   // knex
  //   //   .select('*')
  //   //   .from('points')
  //   //   // .where('id', 1 )
  //   //   .then((results) => {
  //   //     res.json(results);
  //   // });
  // });

  router.get('/maps/:id', (req, res) => {
  // knex
  //     .select("*")
  //     .from("points")
  //     .where(maps_id = req.params.id)
  //     .then((results) => {
  //       res.json(results);
  //   });
    console.log(req.params.id);
  })

  router.get('/points/:id', (req, res) => {
  // knex
  //     .select("*")
  //     .from("points")
  //     .where(points_id = req.params.id)
  //     .then((results) => {
  //       res.json(results);
  //   });
    res.send('got point');
  })

  router.post('/maps', (req, res) => {
    // knex
    //   .insert ({ name: req.body }).into(maps)

    res.send('created');
  })

  router.post('/maps/:id/points', (req, res) => {
    res.send('created points');
  })

  router.post('/like', (req, res) => {
    res.send('liked');
  })

  router.get('/login/:id', (req, res) => {
    // req.session.user_id = req.params.id;
    console.log('here');
    console.log(req.params.id);
    res.redirect('/');
});

  router.get('/users/:id', (req, res) => {
    console.log('userid: ' + req.params.id);
    res.render('profilev2');
  })


  router.get('/maps/:id', (req, res) => {
    res.send('ok');
  })

  router.get('/points/:id', (req, res) => {
    res.send('got point');
  })

  router.get
  return router;
};

