const sequelize = require("../config/connection")
const {User,Blog} = require("../models")

const users = [
    {
        username:"violet",
        password:"password"
    },
    {
        username:"wilson",
        password:"password1"
    },
    {
        username:"goose",
        password:"Password3"
    }
]

const blogs = [
    {
        title:"About Me",
        body:"Welcome to my blog. My name is Violet & I'm a siamese tortie mix.",
        UserId:1
    },
    {
        title:"Haircut",
        body:"My human gave me a haircut recently... She sucks.",
        UserId:1
    },
    {
        title:"I'm Wilson",
        body:"My name is Mr. Wilson & I'm Violet's cousin.",
        UserId:2
    }
]

const seedMe = async () => {
    try {
        await sequelize.sync({force:true});
        await User.bulkCreate(users,{
            individualHooks:true
        });
        await Blog.bulkCreate(blogs);
        process.exit(0);
    } catch(err) {
        console.log(err);
    };
};

seedMe()