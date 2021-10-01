//Imports
const Posts = require("./posts-model.js");
const express = require("express");
const router = express.Router();

// Posts endpoints

// [Get], returns array of all the post objects

router.get("/", (req,res) => {
    Posts.find()
        .then(posts => {
            res.status(200).json(posts);
        })
        .catch(error => {
            res.status(500).json({
                message: "The posts information could not be retrieved" 
            })
        })
})

// [Get], returns post object with the specified ID


// [Post], creates post with info from req.body and returns new post


// [Put], updates post with the specified ID using data from req.body and returns the modified post


// [Delete], returns array of all the comment objects associated with the specified post ID



module.exports = router;