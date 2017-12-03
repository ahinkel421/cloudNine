const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const {PORT, DATABASE_URL} = require('./config');
const {Lounge} = require('./models');
const cors = require('cors')

const app = express();
app.use(bodyParser.json());
app.use(cors());


//Used to get all of the different lounges
app.get('/lounges', (req, res) => {
  Lounge
  .find()
  .then(lounges => {
    res.json({ lounges: lounges.map( (lounge) => lounge.apiRepr()) });
  })
  .catch( err => {
    console.error(err);
    res.status(500).json({message: 'Internal server error'});
  });
});


//Used to get a specific lounge by Id
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
    }
  );
});


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
  .then(lounge => res.status(201).json(lounge.apiRepr()))
  .catch(err => {
    console.error(err);
    res.status(500).json({message: 'Internal server error'});
  });
});





// TODO; Now that you have a specific lounge, add a newPost to that lounge.
      // Some ideas. Remember this is async (return a promise maybe?)
      // lounge.posts.push(newPost)
      // lounge.save.then(()=>{
      // res.json( lounge.apiRepr() )
      // })

app.post('/lounges/:loungeId/', (req, res) => {

  const requiredFields = ['content'];
  const field = requiredFields[0];

  if(!(field in req.body)) {
    const message = `Missing \`${field}\` in request body`
    console.error(message);
    return res.status(400).send(message);
  }

  let newPost = {
    author: req.body.author,
    content: req.body.content
  }



  Lounge
  .findById(req.params.loungeId)
  .then(lounge => {
    lounge.posts.push(newPost);
    lounge.save().then(() => {
      res.status(201).json(lounge.apiRepr())
    })
  })
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

app.use('*', function(req, res) {
  res.status(404).json({message: 'Not Found'});
});

let server;

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

if (require.main === module) {
  runServer().catch(err => console.error(err));
};

module.exports = {app, runServer, closeServer};
