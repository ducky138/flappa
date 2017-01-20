var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;



var mongoose = require('mongoose');
var Post = mongoose.model('Post'); //IT'S 'POST' INSTEAD OF 'POSTS' BECAUSE IN Posts.js WE HAVE mongoose.model('Post', PostSchema);
var Comment = mongoose.model('Comment');

// 1) When a GET request is run on /posts...
// 2) we look into the 'Post' table using the find method USING the $scope.posts as a parameter...
router.get('/posts', function(req, res, next) {
  Post.find(function(err, posts){  //mongoose.model.find() to find in the db
    if(err){ return next(err); }

    res.json(posts);
  });
});

router.post('/posts', function(req, res, next) {
  var post = new Post(req.body);

  post.save(function(err, post){ //mongoose.model.save() to save to the database
    if(err){ return next(err); }

    res.json(post);
  });
});

// ADDED SHIT FROM HERE ------------------------------------------------------------

router.param('post', function(req, res, next, id) {
  var query = Post.findById(id);

  query.exec(function (err, post){
    if (err) { return next(err); }
    if (!post) { return next(new Error('can\'t find post')); }

    req.post = post;
    return next();
  });
});


router.get('/posts/:post', function(req, res) {
  res.json(req.post);
});
