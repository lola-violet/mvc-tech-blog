const express = require('express');
const router = express.Router();
const {User,Blog} = require('../models');

// Show all blogs on home page
router.get("/", async (req, res) => {
    try {
        const allBlog = await Blog.findAll({
            // include: [
            //     {
            //         model: User,
            //         attributes: ['name'],
            //     },
            // ],
        });
        const hbsBlogs = allBlog.map(allBlog => allBlog.get({ plain: true }));
        const loggedIn = req.session.user ? true : false;
        res.render("home", {
            allBlog: hbsBlogs, 
            loggedIn, 
            username: req.session.user?.username,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "500 Internal Server Error" });
    }
});

// Login Page
router.get("/login", (req, res) => {
    // if(req.session.user) {
    //     return res.redirect("/dashboard");
    // }
    res.render("login");
});

// Dashboard
// router.get("/dashboard", async (req, res) => {
//     try {
//         if(!req.session.user) {
//             return res.redirect("/login");
//         };
//         const userData = await User.findByPk(req.session.user.id, {
//             // attributes: { exclude: ['password'] },
//             include: [{ model: Blog }],
//           });
      
//           const user = userData.get({ plain: true });
      
//           res.render('dashboard', {
//             ...user,
//             // loggedIn: true
//           });
//         console.log(hbsData);
//     } catch(err) {
//         console.log(err);
//         res.status(500).json({ msg: "500 Internal Server Error" });
//     }
// });

router.get("/dashboard", async (req, res) => {
    try {
        if(!req.session.user) {
            return res.redirect("/login");
        };
        const userData = await User.findByPk(req.session.user.id, {
            include: [Blog]
        });
        // const hbsBlogs = allBlog.map(allBlog => allBlog.get({ plain: true }));
        // const loggedIn = req.session.user ? true : false;
        // res.render("home", {
        //     allBlog: hbsBlogs, 
        //     loggedIn, 
        //     username: req.session.user?.username,
        // });
        const hbsData = userData.get({ plain: true });
        // const userBlogs = hbsData.Blog;
        const loggedIn = req.session.user ? true : false;
        // res.render("dashboard", hbsData);
        res.render("dashboard", {
            userData: hbsData,
            userBlogs: hbsData.Blog,
        })
        console.log(hbsData);
    } catch(err) {
        console.log(err);
        res.status(500).json({ msg: "500 Internal Server Error" });
    }
});
module.exports = router;