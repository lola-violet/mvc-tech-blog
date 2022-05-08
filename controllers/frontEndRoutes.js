const express = require('express');
const router = express.Router();
const {User,Blog} = require('../models');

// Show all blogs on home page
router.get("/", async (req, res) => {
    try {
        const allBlog = await Blog.findAll();
        const hbsBlogs = allBlog.map(allBlog => allBlog.get({ plain: true }));
        const loggedIn = req.session.user ? true : false;
        res.render("home", {allBlog: hbsBlogs, loggedIn, username: req.session.user?.username});
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "500 Internal Server Error" });
    }
});

// Login Page
router.get("/login", (req, res) => {
    if(req.session.user) {
        return res.redirect("/dashboard");
    }
    res.render("login");
});

// Dashboard
router.get("/dashboard", async (req, res) => {
    try {
        if(!req.session.user) {
            return res.redirect("/login");
        };
        const userData = await User.findbypk(req.session.user.id, {
            include: [Blog]
        });
        const hbsData = userData.get({ plain: true });
        hbsData.loggedIn = req.session.user ? true : false;
        res.render("dashboard", hbsData);
    } catch(err) {
        console.log(err);
        res.status(500).json({ msg: "500 Internal Server Error" });
    }
});

module.exports = router;