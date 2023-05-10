const express = require("express");
let router = express.Router();

//Initialize Data without DB
let users = [
    {
        id: 0,
        email: '',
        password: ''
    },
    {
        id: 1,
        email: 'test@mail.com',
        password: 'none'
    }
]

router.get("/all", (req, res) => {
    res.send(users);
});

router.get("/login", (req, res) => {
    const ifExist = users.find((usr) => usr.email === req.body.email);
    ifExist ? console.log(`Account Has already Added`) : console.log('Success');
    res.send(users);
});


router.post("/create", (req, res) => {

    const user = req.body
    res.send(user)
    console.log(user);
    // let user = {
    //     id: users.length + 1,
    //     email: req.body.email,
    //     password: req.body.password,
    // }
    // //If Users exist by Email only
    // const ifExist = users.find((usr) => usr.email === user.email);
    // ifExist ? console.log(`Account Has already Added`) : users.push(user)
    // res.send();
});


module.exports = router;