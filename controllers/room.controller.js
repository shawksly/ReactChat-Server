// just declaring that this is the router for our app (which is standard for JS Express). We'll export this variable at the end of the document and are saying that we require the express package to be installed for whoever's using our app to have it function properly.
const router = require("express").Router();
// the variable "Room" used in this file is brought in from our room model.
const Room = require("../models/room.model");
// the variable "User" used in this file is brought in from our user model.
const User = require("../models/user.model");
// the variable validateSession here is referring to the output, or module.exports, from the validateSession file within this same root directory.
const validateSession = require('../middleware/validateSession');

// we're creation a function named errorResponse, which takes in two parameters, a response and an error. The JSON that results from the response's .status method, when given 500 as its argument, is an error message. This object has a key-value pair of an error and a corresponding value of the value of the err variable's message.
function errorResponse(res, err) {
  res.status(500).json({
    ERROR: err.message,
  });
};

// We're creating a room here using the .post method. I'm not sure the utility of validateSession, but afterwards, we're using an asynchronous request/response callback function. We're defining our room variable as a new instance of a Room object, which has key-value pairs which are taking the "title" and "description" keys from our Postman's body section and assigning them as values for our newly-created Room keys. For the "messages" key, we're using an empty array? And for our "owner" key, we're referencing the id from our database. Admittedly, I am still a bit shaky on how this _id is derived.
router.post("/create", validateSession, async (req, res) => {
  try {
    const room = new Room({
      title: req.body.title,
      description: req.body.description,
      messages: [],
      owner: req.user._id
    });

    const newRoom = await room.save();
    // console.log(req.user);

    res.status(200).json({
      message: "New Room Created!",
      room: newRoom
    });

// We add a 'catch' section here to display errors. I don't 
  } catch (err) {
    errorResponse(res, err);
  }
});

// We're attempting to show a room's by its id. 
router.get("/show/:roomId", validateSession, async (req, res) => {
  try {
    const singleRoom = await Room.findOne({ _id: req.params.roomId })
    const user = await User.findById(singleRoom.owner);

    res.status(200).json({ found: singleRoom, owner: user })

  } catch (err) {
    errorResponse(res, err);
  }
});

// get all rooms
router.get("/list", validateSession, async (req, res) => {
  try {
    const getAllRooms = await Room.find();

    getAllRooms.length > 0 ?
      res.status(200).json({ getAllRooms })
      :
      res.status(404).json({ message: "No Rooms Found!" });

  } catch (err) {
    errorResponse(res, err);
  }
});

// update a room
router.patch('/:roomId', validateSession, async (req, res) => {
  try {
    let _id = req.params.roomId;
    let owner = req.user.id;

    // console.log(_id);
    // console.log(owner);

    let updatedInfo = req.body;

    const updated = await Room.findOneAndUpdate({ _id, owner }, updatedInfo, { new: true });
    // console.log("!!!!!!!!!", updated);

    if (!updated)
      throw new Error("Invalid Room/User Combination");
    
    res.status(200).json({
      message: `${updated._id} Updated!`,
      updated
    });

  } catch (err) {
    errorResponse(res, err);
  }
});

// delete a room
router.delete ('/:roomId', validateSession, async function(req, res) {
  try {
    let { roomId } = req.params;
    let owner = req.user.id;

    const deletedRoom = await Room.deleteOne({ _id: roomId, owner });

    if (!deletedRoom.deletedCount)
      throw new Error('Could not find room or not owner of Room!');

    res.status(200).json({
      message: 'Room Deleted!',
      deletedRoom
    })

  } catch (err) {
    errorResponse(res, err);
  }
})

module.exports = router;

