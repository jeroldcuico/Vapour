const express = require("express");
let router = express.Router();
const axios = require("axios");
const API_URL = "https://api.rawg.io/api/";
const params = {
  key: "f2057e0e1a99490b98030ffe617db723",
};

//!GET THE FOLLOWING API TAG,PLATFORMS ETC
router.get("/:resource", (req, res) => {
  const resource = req.params.resource;
  const params = {
    key: "3f4a034d7b034f7bbea4371034a6e66d",
    ordering: req.query.ordering
  };
  axios
    .get(`${API_URL}${resource}`, { params })
    .then((response) => {
      res.send(response.data);
    })
    .catch((error) => {
      res.send(error);
    });
});

//! Game Details
router.get("/games/:slug", (req, res) => {
  const slug = req.params.slug;
  axios
    .get(`${API_URL}games/${slug}`, { params })
    .then((response) => {
      res.send(response.data);
    })
    .catch((error) => {
      res.send(error);
    });
});

//! Category List

router.get("/category/:category/:slug", (req, res) => {
  const category = req.params.category;
  const slug = req.params.slug;
  axios
    .get(`${API_URL}/${category}/${slug}`, { params })
    .then((response) => {
      res.send(response.data);
    })
    .catch((error) => {
      res.send(error);
    });
});

//! Get Data

router.get("/fetch/:tags/:id", (req, res) => {
  const tags = req.params.tags;
  const id = req.params.id;
  axios.get(`${API_URL}${tags}/${id}`, { params })
    .then(response => {
      const games = response.data.results;
      for (const game of games) {
        console.log(game.name);
      }
    })
    .catch(error => {
      console.error('Error fetching games:', error);
    });
});


//GET GAME SCREENSHOTS
router.get("/games/:id/screenshots", (req, res) => {
  const id = req.params.id;
  axios
    .get(`${API_URL}games/${id}/screenshots`, { params })
    .then((response) => {
      res.send(response.data);
    })
    .catch((error) => {
      res.send(error);
    });
});
module.exports = router;
