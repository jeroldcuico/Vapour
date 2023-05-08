const express = require("express");
let router = express.Router();
const axios = require("axios");
const API_URL = "https://api.rawg.io/api/";
const params = {
  key: "3f4a034d7b034f7bbea4371034a6e66d",
};


//GAME DETAIL
router.get("/:category/:id", (req, res) => {
  const id = req.params.id;

  axios
    .get(`${API_URL}games/${id}`, { params })
    .then((response) => {
      res.send(response.data);
    })
    .catch((error) => {
      res.send(error);
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

//!GET THE FOLLOWING API TAG,PLATFORMS ETC
router.get("/:resource", (req, res) => {
  const resource = req.params.resource;
  const params = {
    key: "3f4a034d7b034f7bbea4371034a6e66d",
    ordering : req.query.ordering
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

// ///!GET THE FOLLOWING API TAG,PLATFORMS ETC
// router.get("/ddd/:resource/:id", (req, res) => {
//   const resource = req.params.resource;
//   axios
//     .get(`${API_URL}${resource}/${req.params.id}`, { params })
//     .then((response) => {
//       res.send(response.data);
//     })
//     .catch((error) => {
//       res.send(error);
//     });
// });


module.exports = router;
