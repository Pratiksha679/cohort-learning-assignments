const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db");
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/config')

// User Routes
router.post('/signup', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    User.create({
        username: username,
        password: password
    }).then(function () {
        res.json({
            message: 'User created successfully'
        })
    }).catch(function () {
        res.json({
            message: 'User creation failed'
        })
    })
});

router.post('/signin', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const user = await User.find({
        username: username,
        password: password
    })

    if (user) {
        const token = jwt.sign({
            username
        }, JWT_SECRET)
        res.json({
            token: token
        })
    }
    else {
        res.json({
            message: 'User is not authorized to sign in'
        })
    }
});

router.get('/courses', userMiddleware, async (req, res) => {
    const courses = await Course.find({});
    res.json({
        courses
    })
});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    const courseId = req.params.courseId;
    const token = req.headers.authorization
    const words = token.split(" ");
    const jwtToken = words[1];
    const decodedUser = jwt.decode(jwtToken, JWT_SECRET).username;
    const user = await User.find({
        username: decodedUser
    })
    if (user) {
        try {
            await User.updateOne({
                username: decodedUser
            }, {
                "$push": {
                    purchasedCourses: courseId
                }
            })

            res.json({
                msg: "Purchase complete!"
            })
        }
        catch (err) {
            res.json({
                message: "Error adding the purchase"
            })
        }
    }
    else {
        res.json({
            message: "User doesn't exist"
        })
    }
});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    const token = req.headers.authorization
    const words = token.split(" ");
    const jwtToken = words[1];
    const decodedUser = jwt.decode(jwtToken, JWT_SECRET).username;
    const user = await User.findOne({
        username: decodedUser
    })
    if (user) {
        try {
            const courses = await Course.find({
                _id: {
                    "$in": user.purchasedCourses
                }
            })
            res.json({
                courses
            })
        }
        catch (err) {
            console.log(err);
            res.json({
                message: "Couldn't get purchases"
            })
        }
    }
    else {
        res.json({
            message: "User is not authorized"
        })
    }
});

module.exports = router