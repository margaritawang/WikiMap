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
        if(results.length){
          return res.json(results);
        } else {
          return res.send({"error": "not found"})
        }
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
    // console.log(req.params.id)
    // res.send('got point');
  })

  router.post('/maps', (req, res) => {
    knex('maps')
      .returning('id')
      .insert({
        users_id: 1000002,
        title: req.body.mapname,
        longitude: -123.116226,
        latitude: 49.246292
      }).
      // catch((err) => console.log(err)).
<<<<<<< HEAD
      then(function(id) {
        console.log("id=",id);
        console.log("typeof id=", typeof id);        
        res.json(id);
=======
      then(() => {
        // knex
        // .select('id')
        // .from('maps')
        // .where('title', req.body.mapname)
        // .then((results) => {
        //   console.log(results);
          res.send('good');
        // })
>>>>>>> 4a8e8a6dc6b46080c534346dc51943228a922582
      })
      // .into('maps')
    // console.log('mapname='+req.body.mapname);
    // res.send('created');
  })

<<<<<<< HEAD
  router.post('/maps:id/points', (req, res) => {
    knex('points')
    .insert({
      users_id: req.body.users_id,
      title: req.body.title,
       description: req.body.description,
       longitude: req.body.longitude,
       latitude: req.body.latitude,
       maps_id: req.body.maps_id
     }).then(() => {
       res.send(201);
     })
=======
  router.post('/maps/:id/points', (req, res) => {
    console.log('created points');
>>>>>>> 4a8e8a6dc6b46080c534346dc51943228a922582
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

