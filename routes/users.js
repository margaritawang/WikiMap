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
    console.log(req.session.user_id);
    knex("maps")
      .returning("id")
      .insert({
        users_id: req.session.user_id,
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
    // console.log('mapname='+req.body.mapname);
    // res.send('created');
  })

  router.post('/maps/:id/points', (req, res) => {
    knex('points')
      .insert(req.body)
      .then(() => {
        return res.sendStatus(200);
      })
    // console.log('created pointts');
  })

  router.post('/like', (req, res) => {
    knex('fav_maps')
      .insert(req.body)
      .then(() => {
        return res.sendStatus(200);
      })
  })

  // router.get('/users/:id', (req, res) => {
  //   console.log('userid: ' + req.params.id);
  //   res.render('profile');
  // })

  router.get("/profile", (req, res) => {
    knex.select("*")
    .from("maps")
    .where("users_id", req.session.user_id)
    const userMaps = knex.select("*").from("maps").where("users_id", req.session.user_id);
    const userPoints = knex.select("*").from("points");

    Promise.all([userMaps, userPoints]).then(results => {
      const maps = results[0];
      const points = results[1];
      res.send(results);
    });
    // .then((results) => {
    //   res.render("profile", results);
    //   res.json(results);
    //   console.log(results);
    // })
  });

  // Edit points
  router.post("/points/:id", (req, res) => {
    knex("points")
      .where({ id: req.params.id })
      .update({ description: req.body });
    res.send("got point");
  });

  // Delete points
  router.post("/points/:id/delete", (req, res) => {
    knex("points")
      .returning('maps_id')
      .where({ id: req.params.id })
      .del()
      .then((maps_id) => {
        return res.send(maps_id);
      })
  });
  return router;
};
