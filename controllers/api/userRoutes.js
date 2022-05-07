const express = require("express");
const router = express.Router();
const {User,Blog} = require("../models/");
const bcrypt  = require("bcrypt");

// Find All Users
router.get("/", async (req, res) => {
    try {
        const dbUsers = await User.findAll({
            include: [Blog]
        })
        res.json(dbUsers);
    } catch(err) {
        console.log(err);
        res.status(500).json({ msg: "500 Internal Server Error" });
    }
});

// Find One User by ID
router.get("/:id", async (req, res) => {
    try {
        const dbUser = await User.findbyPk(req.params.id, {});
        res.json(dbUser);
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "500 Internal Server Error" });
    }
});

// Create New User
router.post("/", async (req, res) => {
    try {
        const newUser = await User.create(req.body);
        req.session.user = {
            id: newUser.id,
            username: newUser.username
        };
        res.json(newUser);
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "500 Internal Server Error" });
    }
});

// Update an Existing User 
router.put("/:id", async (req, res) => {
    try {
        const updatedUser = await User.update(req.body, {
            where: {
                id: req.params.id
            },
            individualHooks: true,
        });
        res.json(updatedUser);
    } catch(err) {
        console.log(err);
        res.status(500).json({ msg: "500 Internal Server Error" });
    }
});

// Delete an Existing User
router.delete("/:id", async (req, res) => {
    try {
        const deletedUser = await User.destroy({
            where: {
                id: req.params.id
            }
        });
        res.json(deletedUser);
    } catch(err) {
        console.log(err);
        res.status(500).json({ msg: "500 Internal Server Error" });
    }
});

// LOG IN
router.post("/login", async (req, res) => {
    try {
        const currUser = await User.findOne({
            where: {
                username: req.body.username
            }
        });
        if (!currUser) {
            return res.status(400).json({ msg: "Incorrect Login Credentials" });
        };
        if (bcrypt.compareSync(req.body.password, currUser.password)){
            req.session.user = {
                id: currUser.id,
                username: currUser.username
            };
            return res.json(currUser);
        } else {
            return res.status(400).json({ msg: "Incorrect Login Credentials" });
        };
    } catch(err) {
        console.log(err);
        res.status(500).json({ msg: "500 Internal Server Error" });
    }
});

// LOG OUT
router.get("/logout", (req, res) => {
    req.session.destroy();
    res.redirect("/");
});

module.exports = router;