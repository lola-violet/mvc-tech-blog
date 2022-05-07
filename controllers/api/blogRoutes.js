const express = require("express");
const router = express.Router();
const {User,Blog} = require("../models");

// Find All Blogs
router.get("/", async (req, res) => {
    try {
        const dbBlogs = await Blog.findAll({});
        res.json(dbBlogs);
    } catch(err) {
        console.log(err);
        res.status(500).json({ msg: "500 Internal Server Error" });
    }
});

// Find One Blog by ID
router.get("/:id", async (req, res) => {
    try {
        const dbBlog = await Blog.findbyPk(req.params.id, {});
        res.json(dbBlog);
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "500 Internal Server Error" });
    }
});

// Create New Blog
router.post("/", async (req, res) => {
    try {
        if (!req.session.user) {
            return res.status(401).json({ msg: "Must be logged in to create a blog post." });
        }
        const newBlog = await Blog.create({
            title: req.body.title,
            body: req.body.body,
            UserId: req.session.user.id
        });
        res.json(newBlog);
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "500 Internal Server Error" });
    }
});

// Update an Existing Blog 
router.put("/:id", async (req, res) => {
    try {
        const updatedBlog = await Blog.update(req.body, {
            where: {
                id: req.params.id
            },
        });
        res.json(updatedBlog);
    } catch(err) {
        console.log(err);
        res.status(500).json({ msg: "500 Internal Server Error" });
    }
});

// Delete an Existing Blog
router.delete("/:id", async (req, res) => {
    try {
        const deletedBlog = await Blog.destroy({
            where: {
                id: req.params.id
            }
        });
        res.json(deletedBlog);
    } catch(err) {
        console.log(err);
        res.status(500).json({ msg: "500 Internal Server Error" });
    }
});

module.exports = router;