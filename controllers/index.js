const express = require('express');
const router = express.Router();

const frontEnd = require("./frontEndRoutes");
router.use("/",frontEnd)

router.get("/showsessions",(req,res)=>{
    res.json(req.session)
})

const apiRoutes = require("./api");
router.use("/api", apiRoutes);

// router.get("/setfaveanimal/:faveanimal",(req,res)=>{
//     req.session.favAnimal = req.params.faveanimal;
//     console.log(req.session);
//     res.json(req.session);
// })
// router.get("/secretclub",(req,res)=>{
//     if(!req.session.user){
//         return res.status(401).json({msg:"ya gotta login to join the club!"})
//     }
//     res.json({msg:`welcome to the club ${req.session.user.username}`})
// })

module.exports = router;