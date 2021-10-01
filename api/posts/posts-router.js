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

router.get("/:id", (req,res) => {
    Posts.findById(req.params.id)
        .then(posts => {
            if (posts) {
            res.status(200).json(posts);
            } else {
                res.status(404).json({
                    message: "The post with the specified ID does not exist"
                })
            };
        })
        .catch(error => {
            res.status(500).json({
                message: "The posts information could not be retrieved" 
            })
        })
})

// [Post], creates post with info from req.body and returns new post

router.post("/:id", (req,res) => {
    const newPost = req.body;
        if (!newPost.title || !newPost.contents){
            res.status(400).json("Please provide title and contents for the post")
        } else {
            Posts.insert(newPost)
                .then(post => {
                    res.status(201).json(post)
                })
                .catch(error => {
                    res.status(500).json({
                        message: "There was an error while saving the post to the database"
                    })
                });
        };
    });

// [Put], updates post with the specified ID using data from req.body and returns the modified post

router.put("/:id", async (req,res) => {
    const {id} = req.params;
    const changes = req.body;
    try{
        if (!changes.title || !changes.contents){
            res.status(400).json({
                message: "Please provide title and contents for the post"
            })
        } else {
            const updatedPost = await Posts.update(id, changes);
            if (!updatedPost){
                res.status(404).json({
                    message: "The post with the specified ID does not exist"
                })
            } else {
                res.status(200).json(updatedPost);
            }
        }
    }
    catch(error){
        res.status(500).json({
            message: "The post information could not be modified"
        })
    }
})

// [Delete], removes the post with the specified ID and returns said post

router.delete("/:id", async (req,res) => {
    try{
        const {id} = req.params;
        const deletedPost = await Posts.remove(id)
        if (!deletedPost){
            res.status(404).json({
                message: "The post with the specified ID does not exist" 
            })
        } else {
            res.status(200).json(deletedPost);
        }
    }
    catch(error){
        res.status(500).json({
            message: "The post could not be removed"
        })
    }
})

// [Get], returns array of all the comment objects associated with the specified post ID



module.exports = router;