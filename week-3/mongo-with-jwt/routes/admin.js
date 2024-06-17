const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const { Admin, Course } = require('../db')
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/config')

// Admin Routes
router.post('/signup', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    Admin.create({
        username: username,
        password: password
    }).then(function () {
        res.json({
            msg: "Admin created successfully"
        })
    }).catch(function () {
        res.json({
            msg: "Admin creation failed"
        })
    })
});

router.post('/signin', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const admin = await Admin.findOne({
        username: username,
        password: password
    })

    if (admin) {
        const token = jwt.sign({
            username
        }, JWT_SECRET);

        res.json({
            token
        })
    }
    else {
        res.json({
            msg: "Username and password doesn't exist"
        })
    }
});

router.post('/courses', adminMiddleware, (req, res) => {
    const title = req.body.title;
    const description = req.body.description;
    const price = parseInt(req.body.price);
    const imageLink = req.body.imageLink;
    Course.create({
        title: title,
        description: description,
        price: price,
        imageLink: imageLink
    }).then(
        function (Course) {
            res.json({
                msg: "Course creation successful",
                courseId: Course._id
            })
        }
    ).catch(
        function () {
            res.json({
                msg: "Course creation failed"
            })
        }
    )
});

router.get('/courses', adminMiddleware, async (req, res) => {
    const courses = await Course.find({});
    res.json({
        courses
    })
});

module.exports = router;