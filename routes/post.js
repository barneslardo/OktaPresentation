const express = require("express");
const postRoutes = express.Router();

const Post = require("../models/Post");

postRoutes.route("/test").get(function(req, res) {
  res.send("Route hit");
});

postRoutes.route("/").post(function(req, res) {
  const post = new Post(req.body);
  post
    .save()
    .then(post => {
      res.status(200).json({ post: "Lead was added sucessfully!" });
    })
    .catch(err => {
      res.status(400).send("Unable to save to database");
    });
});

postRoutes.route("/").get(function(req, res) {
  Post.find(function(err, post) {
    if (err) {
      console.log(err);
    } else {
      res.json(post);
    }
  });
});

postRoutes.route("/edit/:id").get(function(req, res) {
  let id = req.params.id;
  Post.findById(id, function(err, post) {
    res.json(post);
  });
});

// update route
postRoutes.route("/update/:id").post(function(req, res) {
  Post.findById(req.params.id, function(err, post) {
    if (!post) res.status(404).send("Lead not found");
    else {
      post.name = req.body.name;
      post.body = req.body.body;

      post
        .save()
        .then(post => {
          res.json("Update complete");
        })
        .catch(err => {
          res.status(400).send("Unable to update database");
        });
    }
  });
});

// delete route
postRoutes.route("/delete/:id").get(function(req, res) {
  Post.findByIdAndRemove({ _id: req.params.id }, function(err, business) {
    if (err) res.json(err);
    else res.json("Successfully removed");
  });
});

module.exports = postRoutes;
