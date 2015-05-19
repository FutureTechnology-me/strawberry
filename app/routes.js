var Shoppinglist = require('./models/shoppinglists');
var Presets = require('./data/presets');
var ObjectId = require('mongoose').Types.ObjectId;

// middleware function to be used
// for every secured routes
var auth = function (req, res, next) {
  'use strict';
  if (!req.isAuthenticated()) {
    res.sendStatus(401);
  } else {
    next();
  }
};

// --- POST / GET ---
module.exports = function (app, passport) {
  'use strict';

  app.put('/api/list/:id', function (req, res) {
    Shoppinglist.findOneAndUpdate({_id: req.params.id}, {
      //$set: {name: req.body.name},
      $addToSet: {items: req.body.items}
    }, {upsert: true}, function (err) {
      if (err) {
        return res.sendStatus(500, {error: err});
      } else {
        return res.send('succesfully saved');
      }
    });
  });

  app.get('/api/list/:idlist/:iditem', function (req, res) {
    Shoppinglist.aggregate([
      {$match: {_id: new ObjectId(req.params.idlist)}},
      {$unwind: '$items'},
      {$match: {'items._id': new ObjectId(req.params.iditem)}},
      {$project: {_id: false, item: '$items'}}
    ], function (err, item) {
      if (err) {
        return res.sendStatus(500, {error: err});
      } else {
        return res.json(item);
      }
    });
  });

  app.put('/api/list/:idlist/:iditem', function (req, res) {
    var toCheck = req.body.checked;
    Shoppinglist.update({
      _id: new ObjectId(req.params.idlist),
      'items._id': new ObjectId(req.params.iditem)},
      {$set: {'items.$.checked': toCheck}}, function (err) {
        if (err) {
          return res.sendStatus(500, {error: err});
        } else {
          return res.sendStatus(200);
        }
      });
  });

  app.post('/api/list', function (req, res) {
    new Shoppinglist(req.body).save(function () {
      return res.send('succesfully saved');
    });
  });

  app.get('/api/list/:idlist', function (req, res) {
    Shoppinglist.aggregate([
      {$match: {_id: new ObjectId(req.params.idlist)}}
    ], function (err, lists) {
      if (err) {
        return res.sendStatus(500, {error: err});
      } else {
        return res.json(lists);
      }
    });
  });

  app.get('/api/list', function (req, res) {
    Shoppinglist.find(function (err, lists) {
      if (err) {
        return res.sendStatus(500, {error: err});
      } else {
        return res.json(lists);
      }
    });
  });

  app.get('/loggedin', function (req, res) {
    // fixme: this is a bit hacky
    res.send(req.isAuthenticated() ? req.user : '0');
  });

  app.post('/login', passport.authenticate('local'), function (req, res) {
    res.send(req.user);
  });

  app.get('/auth/facebook', passport.authenticate('facebook'));

  app.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
      successRedirect: '/#/main',
      failureRedirect: '/login'
    }));

  app.post('/logout', function (req, res) {
    req.logOut();
    // necessary, otherwise we still
    // look like logged in (why is that?)
    res.sendStatus(404);
  });

  app.get('/category', auth, function (req, res) {
    var products = Presets.categories.map(function (item) {
      return item.product;
    });
    res.json(products);
  });

  // -- application --
  app.get('/', function (req, res) {
    res.sendfile('./public/index.html');  // load the single view file
  });
};
