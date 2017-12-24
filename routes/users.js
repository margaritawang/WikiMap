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
    // console.log(req.params.id);
  })

  router.get('/points/:id', (req, res) => {
    knex
      .select("*")
      .from('points')
      .where('id', req.params.id)
      .then((results) => {
        res.json(results);
    });
    // console.log(req.params.id)
    // res.send('got point');
  })

  router.post('/maps', (req, res) => {
    knex('maps')
      .insert({
        users_id: 1000002,
        title: req.body.mapname,
        longitude: -123.116226,
        latitude: 49.246292
      }).
      // catch((err) => console.log(err)).
      then(() => {
        // knex
        // .select('id')
        // .from('maps')
        // .where('title', req.body.mapname)
        // .then((results) => {
        //   console.log(results);
          res.status(200);
        // })
      })
      // .into('maps')
    // console.log('mapname='+req.body.mapname);
    // res.send('created');
  })

  router.post('/maps/:id/points', (req, res) => {
    console.log(req.body);
    console.log(req.params.id);
    knex('points')
      .insert(req.body)
      .then(() => {
        res.status(200);
      })
    // console.log('created pointts');
  })

  router.post('/like', (req, res) => {
    res.send('liked');
  })

  router.get('/users/:id', (req, res) => {
    console.log('userid: ' + req.params.id);
    res.render('profilev2');
  })


  router.get('/maps/:id', (req, res) => {
    res.send('ok');
  })

  router.put('/points/:id', (req, res) => {
    knex('points')
    .where({id: req.params.id})
    .update({ description: req.body})
    res.send('got point');
  })

  router.get
  return router;
};

