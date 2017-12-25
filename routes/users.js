"use strict";

const express = require("express");
const router = express.Router();

module.exports = knex => {
  router.get("/", (req, res) => {
    const getMaps = knex.select("*").from("maps");
    const getPoints = knex.select("*").from("points");

    Promise.all([getMaps, getPoints]).then(results => {
      const maps = results[0];
      const points = results[1];
      res.send(results);
      // console.log(maps);
      // console.log(points);
    });
    // const mapsWithPoints = maps.map(map => {
    //   map.points = points.filter(point => point.maps_id === map.id);
    //   return map;
    // res.json(results);
    // });
    // res.json({maps: mapsWithPoints, points});
    // console.log(maps);
    // console.log(points);
  });

  router.get("/maps/:id", (req, res) => {
    knex
      .select("*")
      .from("points")
      .where("maps_id", req.params.id)
      .then(results => {
        if (results.length) {
          return res.json(results);
        } else {
          return res.send({ error: "not found" });
        }
      });
    // console.log(req.params.id);
  });

  router.get("/points/:id", (req, res) => {
    knex
      .select("*")
      .from("points")
      .where("id", req.params.id)
      .then(results => {
        res.json(results);
    });
  });

  router.post("/maps", (req, res) => {
    knex("maps")
      .returning("id")
      .insert({
        users_id: 1000002,
        title: req.body.mapname,
        longitude: -123.116226,
        latitude: 49.246292
      })
      // catch((err) => console.log(err)).
      .then(function(id) {
        console.log("id=", id);
        console.log("typeof id=", typeof id);
        res.json(id);
      });
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

  // router.get('/users/:id', (req, res) => {
  //   console.log('userid: ' + req.params.id);
  //   res.render('profile');
  // })

  router.get("/profile", (req, res) => {
    res.render("profile");
})


  router.post("/like", (req, res) => {
    res.send("liked");
  });

  router.put("/points/:id", (req, res) => {
    knex("points")
      .where({ id: req.params.id })
      .update({ description: req.body });
    res.send("got point");
  });

  return router;
};
