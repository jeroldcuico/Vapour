const express = require("express");
let router = express.Router();

//Initialize Data without DB
let collections = [
    {
        collection_id: 0,
    },
];

router.get("/all", (req, res) => {
    res.send(collections);
});

router.post("/addCollection", (req, res) => {
    // Save the game based to collection based from logged user
    const newCollection = { collection_id: collections.length + 1, ...req.body };
    // Check if the newCollection already 
    const existingCollection = collections.find(collection => {
        return (
            collection.id === newCollection.id &&
            collection.account_id === newCollection.account_id
        );
    });

    if (existingCollection) {
        res.send({ message: "Collection already exists", status: false });
    } else {
        collections.push(newCollection);
        res.send({ message: "Collection added", status: true });
    }
});

router.get('/collection', (req, res) => {
    const account_id = req.query.account_id;
    const filteredCollection = collections.filter(item => item.account_id === account_id);
    res.json(filteredCollection);
});

router.delete('/collection/delete/:id', (req, res) => {
    const account_id = req.query.account_id
    const id = req.params.id;
    collections = collections.filter((e) => e.id !== Number(id) && e.account_id !== Number(account_id));
    res.send({ message: `Game succesfully Deleted` });
})


module.exports = router;