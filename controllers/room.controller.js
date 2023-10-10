const router = require("express").Router();
const Room = require("../models/room.model");
const User = require("../models/user.model");
const validateSession = require('../middleware/validateSession');

function errorResponse(res, err) {
  res.status(500).json({
    ERROR: err.message,
  });
};

// create a room
router.post("/create", validateSession, async (req, res) => {
  try {
    const room = new Room({
      title: req.body.title,
      description: req.body.description,
      messages: [],
      owner: req.user._id
    });

    const newRoom = await room.save();
    console.log(req.user);

    res.status(200).json({
      message: "New Room Created!",
      room: newRoom
    });

  } catch (err) {
    errorResponse(res, err);
  }
});

// get (show) room by id
router.get("/show/:id", validateSession, async (req, res) => {
  try {
    const singleRoom = await Room.findOne({ _id: req.params.id })
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
router.patch('/:id', validateSession, async (req, res) => {
  try {
    let _id = req.params.id;
    let owner = req.user.id;

    console.log(_id);
    console.log(owner);

    let updatedInfo = req.body;

    const updated = await Room.findOneAndUpdate({ _id, owner }, updatedInfo, { new: true });
    console.log("222222", updated);

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
router.delete ('/:id', validateSession, async function(req, res) {
  try {
    let { id } = req.params;
    let owner = req.user.id;

    const deletedRoom = await Room.deleteOne({ _id: id, owner });

    // TODO Need to check if this accounts for non-owner, and account for that. Only ownder can delete
    if (!deletedRoom.deletedCount)
      throw new Error('Could not find or not owner of Room!');

    res.status(200).json({
      message: 'Room Deleted!',
      deletedRoom
    })

  } catch (err) {
    errorResponse(res, err);
  }
})

module.exports = router;