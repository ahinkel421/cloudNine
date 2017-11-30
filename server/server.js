const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const {PORT, DATABASE_URL} = require('./config');
const {Lounge} = require('./models');

const app = express();
app.use(bodyParser.json());


app.get('/lounges', (req, res) => {
  Lounge
  .find()
  .then(lounges => {
    res.json({ lounges: lounges.map( (lounge) => lounge.apiRepr()) });
  })
  .catch(
    err => {
      console.error(err);
      res.status(500).json({message: 'Internal server error'});
    });
  });

  app.get('/lounges/:loungeId', (req, res) => {

    Lounge
    .findById(req.params.loungeId)
    .then(lounge => {
      res.json( lounge.apiRepr() )
    })
    .catch(
      err => {
        console.error(err);
        res.status(500).json({message: 'Internal server error'});
      });
    });



    app.post('/lounges/:loungeId/post', (req, res) => {

      //const requiredFields = ['content'];
      let newPost = {
        name: req.body.name || "a",
        content: req.body.content,
      }
      Lounge
      .findById(req.params.loungeId)
      .then(lounge => {

          // TODO; Now you have lounge, add newPost to that lounge.x
      // Some ideas. Remember this is async
      // lounge.posts.push(newnewPostLounge)
      // lounge.save.then(()=>{
      // res.json( lounge.apiRepr() )
      //  })

      })
      .catch(
        err => {
          console.error(err);
          res.status(500).json({message: 'Internal server error'});
        });
      })





      // not used frontend.
      // use postman to create a lounge
      app.post('/lounges', (req, res) => {
        const requiredFields = ['name', 'picture', 'description'];
        for (let i=0; i<requiredFields.length; i++) {
          const field = requiredFields[i];
          if (!(field in req.body)) {
            const message = `Missing \`${field}\` in request body`
            console.error(message);
            return res.status(400).send(message);
          }
        }

        Lounge
        .create({
          name: req.body.name,
          picture: req.body.picture,
          description: req.body.description,
        })
        .then(
          lounge => res.status(201).json(lounge.apiRepr()))
          .catch(err => {
            console.error(err);
            res.status(500).json({message: 'Internal server error'});
          });
        });


        /*
        app.put('/lounges/:id', (req, res) => {
        // ensure that the id in the request path and the one in request body match
        if (!(req.params.id && req.body.id && req.params.id === req.body.id)) {
        const message = (
        `Request path id (${req.params.id}) and request body id ` +
        `(${req.body.id}) must match`);
        console.error(message);
        return res.status(400).json({message: message});
      }

      // we only support a subset of fields being updateable.
      // if the user sent over any of the updatableFields, we udpate those values
      // in document
      const toUpdate = {};
      const updateableFields = ['name', 'borough', 'cuisine', 'address'];

      updateableFields.forEach(field => {
      if (field in req.body) {
      toUpdate[field] = req.body[field];
    }
  });

  Post
  // all key/value pairs in toUpdate will be updated -- that's what `$set` does
  .findByIdAndUpdate(req.params.id, {$set: toUpdate})
  .then(lounge => res.status(204).end())
  .catch(err => res.status(500).json({message: 'Internal server error'}));
});
*/

/*
app.delete('/lounges/:id', (req, res) => {
Post
.findByIdAndRemove(req.params.id)
.then(lounge => res.status(204).end())
.catch(err => res.status(500).json({message: 'Internal server error'}));
});
*/

// catch-all endpoint if client makes request to non-existent endpoint
app.use('*', function(req, res) {
  res.status(404).json({message: 'Not Found'});
});

// closeServer needs access to a server object, but that only
// gets created when `runServer` runs, so we declare `server` here
// and then assign a value to it in run
let server;

// this function connects to our database, then starts the server
function runServer(databaseUrl=DATABASE_URL, port=PORT) {

  return new Promise((resolve, reject) => {
    mongoose.connect(databaseUrl, err => {
      if (err) {
        return reject(err);
      }
      server = app.listen(port, () => {
        console.log(`Your app is listening on port ${port}`);
        resolve();
      })
      .on('error', err => {
        mongoose.disconnect();
        reject(err);
      });
    });
  });
}

// this function closes the server, and returns a promise. we'll
// use it in our integration tests later.
function closeServer() {
  return mongoose.disconnect().then(() => {
    return new Promise((resolve, reject) => {
      console.log('Closing server');
      server.close(err => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  });
}

// if server.js is called directly (aka, with `node server.js`), this block
// runs. but we also export the runServer command so other code (for instance, test code) can start the server as needed.
if (require.main === module) {
  runServer().catch(err => console.error(err));
};

module.exports = {app, runServer, closeServer};
