const router = require("express").Router();
const Message = require("../models/message.model");
const Room = require("../models/room.model");
const validateSession = require('../middleware/validateSession');

function errorResponse(res, err) {
  res.status(500).json({
    ERROR: err.message,
  });
};

// create a message per room
router.post("/create/:roomId", validateSession, async (req, res) => {
  try {

    //create message and add to room's message array
    const message = new Message({
      date: Date(),
      text: req.body.text,
      owner: req.user._id,
      room: req.params.roomId,
      username: req.user.username
    })

    const targetRoom = await Room.findOne({ _id: req.params.roomId });
    const messageList = targetRoom.messages;

    messageList.push(message);

    const updated = await Room.findOneAndUpdate({ _id: req.params.roomId }, { messages: messageList }, { new: true });

    if (!updated)
      throw new Error("Invalid Room")

    // add message object to database
    const newMessage = await message.save();

    res.status(200).json({
      message: `Message ${newMessage._id} Created! Room ${updated._id} Updated!`,
      newMessage,
      updated
    });

  } catch (err) {
    errorResponse(res, err);
  }
});

// get all messages per room
router.get("/show/:roomId", validateSession, async (req, res) => {
  try {
    // const singleRoom = await Room.findOne({ _id: req.params.roomId });
    // const messageList = singleRoom.messages;

    // messageList.length > 0 ?
    //   res.status(200).json({ ...messageList })
    //   :
    //   res.status(404).json({ message: "No Messages Found!" });

    // might be a better solution, but both work.
    // This searches the messages database, where the above searches for the right room and pulls the message array
    const getAllMessages = await Message.find({ room: req.params.roomId });

    getAllMessages.length > 0 ?
      res.status(200).json({ getAllMessages })
      :
      res.status(404).json({ message: "No Messages Found!" });

  } catch (err) {
    errorResponse(res, err);
  }
});

// get all messages per owner
router.get("/show/owner/:ownerId", validateSession, async (req, res) => {
  try {
    const getOwnerMessages = await Message.find({ owner: req.params.ownerId });

    getOwnerMessages.length > 0 ?
      res.status(200).json({ getOwnerMessages })
      :
      res.status(404).json({ message: "No Messages Found!" });

  } catch (err) {
    errorResponse(res, err);
  }
});

// update message
router.patch("/:roomId/:messageId", validateSession, async (req, res) => {
  try {

    // update message item in database
    let newText = req.body.text;

    const updated = await Message.findOneAndUpdate({ _id: req.params.messageId, owner: req.user.id }, { text: newText }, { new: true });

    if (!updated)
      throw new Error("Invalid Message/User combination");


    // update message object in room's messages array
    const targetRoom = await Room.findOne({ _id: updated.room });
    const messageList = targetRoom.messages;

    // Leaving this for myself -Scott
    // I'd love to know why, but this works...
    // const targetRoom = await Room.findOne({ "messages.room": req.params.roomId });
    // ... and this doesnt
    // const targetRoom = await Room.findOne({ "messages._id": req.params.messageId });
    // posted to StackOverflow - https://stackoverflow.com/questions/77296042/using-mongo-filter-to-query-the-id-of-an-object-nested-in-an-array

    let updatedCount = 0;

    messageList.forEach(item => {
      if (item._id == req.params.messageId) {
        item.text = newText;
        updatedCount++;
      };
    });

    if (updatedCount < 1)
      throw new Error("No Text Updated");

    const updatedRoom = await Room.findOneAndUpdate({ _id: updated.room }, { messages: messageList }, { new: true });

    if (!updatedRoom)
      throw new Error("Invalid Message/User combination");

    res.status(200).json({
      message: `Message ${updated._id} Updated! Room ${updatedRoom._id} Updated!`,
      updated,
      updatedRoom
    });
    
  } catch (err) {
    errorResponse(res, err);
  }
});

// delete message
router.delete("/:messageId", validateSession, async (req, res) => {
  try {

    const message = await Message.findOne({ _id: req.params.messageId, owner: req.user.id });

    if (!message)
      throw new Error("Invalid Message/User combination");

    // delete message object from database
    const deletedMessage = await Message.deleteOne({ _id: req.params.messageId, owner: req.user.id });

    if (!deletedMessage.deletedCount)
      throw new Error('Could not find room or not owner of Message!');

    // delete message object from room's messages array
    const targetRoom = await Room.findOne({ _id: message.room });
    const messageList = targetRoom.messages;

    let deleteIndex = -1;

    messageList.forEach((item, index) => {
      if (item._id == req.params.messageId)
        deleteIndex = index;
    });

    if (deleteIndex < 0) {
      throw new Error("No Text Deleted")
    } else {
      messageList.splice(deleteIndex, 1);
    };

    const updatedRoom = await Room.findOneAndUpdate({ _id: message.room }, { messages: messageList }, { new: true });

    if (!updatedRoom)
      throw new Error("Invalid Message/User combination");

    res.status(200).json({
      message: `Message deleted! Room ${updatedRoom._id} Updated!`,
      deletedMessage,
      updatedRoom
    });
    
  } catch (err) {
    errorResponse(res, err);
  }
});

module.exports = router;