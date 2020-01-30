const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Post = require('./models/post');

const app = express();

mongoose.connect(
  'mongodb+srv://dan-dev:B3xA9qam1E2IGQmF@cluster0-1y7o0.mongodb.net/test?retryWrites=true&w=majority',
  { useNewUrlParser: true }
  )
  .then(() => {
    console.log('connected sucesfuly');
  })
  .catch(() => {
    console.log('connection failed');
  });

 app.use(bodyParser.json());

 app.use((req,res,next) => {
    res.setHeader('Access-Control-Allow-Origin', "*");
    res.setHeader(
      'Access-Control-Allow-Headers',
      "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader(
      'Access-Control-Allow-Methods',
      "GET, POST, PATCH, DELETE, OPTIONS");
    next();
  });

 app.post("/api/posts", (req, res, next) => {
   const post = new Post({
     title: req.body.title,
     content: req.body.content
   });
   post.save()
     .then(result => {
       res.status(201).json({message: "post added", postId: result._id});
     });
 });

 app.get('/api/posts', (req, res, next) => {
   Post.find()
     .then(documents => {
       console.log(documents);
       res.status(200).json({
         message: 'Posts fetched',
         posts: documents
       });
     });
 });

 app.delete('/api/posts/:id', (req, res, next) => {
   Post.deleteOne({_id: req.params.id})
     .then(result => {
       console.log(result);
       res.status(200).json({
         message: 'Post deleted',
       });
     });
 });


 module.exports = app;
