const router = require('express').Router();

// ^ in English, "cont router = whatever express is giving us (any file within a server can have module.export) using its router method"

//! Controllers relate to URL, Models relate to Database (NOT Postman).

const Room = require('../models/room.model');

const jwt = require('jsonwebtoken');

function errorResponse(res, err) {
  res.status(500).json({
    ERROR: err.message,
  });
};

//? CREATE A ROOM

router.post('/create', async (req, res) => {
  try {
    const room = new Room({
      title: req.body.title,
      description: req.body.description,
      messages: req.body.messages,
      ownerId: req.user
    });

    const newRoom = await room.save();

    res.status(200).json({
      message: "New Room created",
      room: newRoom
    });

    } catch (error) {
      res.status(500).json({
        ERROR: error.message
      })
    }});


/* They'll all have TRY-CATCH statements */


//? GET ONE ROOM (see pizza example (pizza controller))

// .get

/*
router.get('/room/:id', async (req, res) => {
  try {
    const room = 

  }
})
*/

//? GET ALL ROOMS (see get all pizzas example (pizza controller))

// .get

//? UPDATE ONE ROOM (see pizza example (pizza controller))

// .patch

//? DELETE ONE ROOM (see pizza example (pizza controller))

// .delete

/*

- npx nodemon

- test things in POSTMAN

- GitHub stuff.
    - git branch (make sure I'm in room).
    - git add .
    - git commit -m "u6_04a completed room controller"
    - get push origin room




*/



/*
    const newUser = await user.save();

    const token = jwt.sign({ id: newUser['_id']}, process.env.JWT, { expiresIn: "one day"})

    res.status(200).json({
      user: newUser,
      message: 'Succes! User created!',
      token
    })
  } catch (error) {
    res.status(500).json({
      ERROR: error.message
    });
  }
});

*/

module.exports = router