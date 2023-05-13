const express = require("express");
let router = express.Router();

//Initialize Data without DB
let liked = [
  {
    like_id: 0,
  },
];

router.get("/all", (req, res) => {
  res.send(liked);
});

router.post("/addLike", (req, res) => {
  // Save the game based to collection based from logged user
  const newCollection = { like_id: liked.length + 1, ...req.body };
  // Check if the newCollection already
  const existingCollection = liked.find((collection) => {
    return (
      collection.id === newCollection.id &&
      collection.account_id === newCollection.account_id
    );
  });

  if (existingCollection) {
    res.send({ message: "You already liked this", status: false });
  } else {
    liked.push(newCollection);
    res.send({ message: "Added to Likes", status: true });
  }
});

router.get("/like", (req, res) => {
  const account_id = req.query.account_id;
  const filteredCollection = liked.filter(
    (item) => item.account_id === account_id
  );
  res.json(filteredCollection);
});

router.delete("/like/delete/:id", (req, res) => {
  const account_id = req.query.account_id;
  const id = req.params.id;
  liked = liked.filter(
    (e) => e.id !== Number(id) && e.account_id !== Number(account_id)
  );
  res.send({ message: `Game succesfully Deleted from likes` });
});

module.exports = router;
