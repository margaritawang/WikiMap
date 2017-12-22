"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.get("/", (req, res) => {
    const getMaps = knex
      .select('*')
      .from('maps');
    const getPoints = knex
      .select('*')
      .from ('points');

    Promise.all([getMaps, getPoints])
      .then((results) => {
        const maps = results[0];
        const points = results[1];
        res.send(results);
        // console.log(maps);
        // console.log(points);
      })
        // const mapsWithPoints = maps.map(map => {
        //   map.points = points.filter(point => point.maps_id === map.id);
        //   return map;
        // res.json(results);
        // });
        // res.json({maps: mapsWithPoints, points});
        // console.log(maps);
        // console.log(points);
  });

  router.get('/maps/:id', (req, res) => {
    knex
      .select("*")
      .from("points")
      .where('maps_id', req.params.id)
      .then((results) => {
        res.json(results);
    });
    console.log(req.params.id);
  })

  router.get('/points/:id', (req, res) => {
    knex
      .select("*")
      .from('points')
      .where('id', req.params.id)
      .then((results) => {
        res.json(results);
    });
    console.log(req.params.id)
    // res.send('got point');
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

