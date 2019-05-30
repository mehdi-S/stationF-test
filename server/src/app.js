const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const history = require('connect-history-api-fallback');

const app = express()
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());

const mongodb_conn_module = require('./mongodbConnModule');
var db = mongodb_conn_module.connect();

const Post = require("../models/post");

var postRouter = express.Router(); 
postRouter.route('/')
.all((req,res) => { 
      res.json({message : "nice request!", methode : req.method});
});

postRouter.route('/post')
  .get((req,res) => {
    var db = req.db;
    Post.find({}, 'title description capacity equipments', function (error, posts) {
      if (error) { console.error(error); }
      res.send({
        posts: posts
      })
    }).sort({_id:-1})
  })
  .post((req, res) => {
    var db = req.db;
    var title = req.body.title;
    var description = req.body.description;
    var capacity = req.body.capacity;
    var equipments = req.body.equipments;
    var new_post = new Post({
      title: title,
      description: description,
      capacity: capacity,
      equipments: equipments,
    })

    new_post.save((error) => {
      if (error) {
        console.log(error)
      }
      res.send({
        success: true
      })
    })
  })

postRouter.get('/search', (req, res) => {
  var db = req.db;
  Post.find({ capacity: { $lte : req.body.capacity } }, 'title description capacity equipments resa', function (error, q) {
    if (error) { console.error(error); }
    res.send(q)
  })
})

// Fetch single post
postRouter.get('/post/:id', (req, res) => {
  var db = req.db;
  Post.findById(req.params.id, 'title description capacity equipments', function (error, post) {
    if (error) { console.error(error); }
    res.send(post)
  })
})

// Update a post
postRouter.put('/post/:id', (req, res) => {
  var db = req.db;
  Post.findOneAndUpdate(
    {'_id':req.params.id},
    req.body,
    {new:true}
  )
  .then(doc => { res.json() })
  .catch(err => { res.status(500).json(err) })
})

// Delete a post
postRouter.delete('/post/:id', (req, res) => {
  var db = req.db;
  Post.remove({
    _id: req.params.id
  }, function(err, post){
    if (err)
      res.send(err)
    res.send({
      success: true
    })
  })
})

app.use(postRouter)

app.use(history());
app.listen(process.env.PORT || 8081)