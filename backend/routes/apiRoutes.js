const express = require("express");
let router = express.Router();

router.get('/' , (req, res) => {
    res.json({ "games" : ["gameOne", "gameTwo" , "gameThree"]})
})

module.exports = router;
