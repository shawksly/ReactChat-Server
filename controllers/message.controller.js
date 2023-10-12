const router = require("express").Router();
const Message = require("../models/message.model");
const validateSession = require('../middleware/validateSession');

function errorResponse(res, err) {
  res.status(500).json({
    ERROR: err.message,
  });
};

// create a message per room
router.post("/create/:roomId", validateSession, async (req, res) => {
  try {
    const message = new Message({
      date: Date(),
      text: req.body.text,
      owner: req.user._id,
      room: req.params.roomId
    })
  } catch (err) {
    errorResponse(res, err);
  }
});

// get all messages per room
router.get("/show/:roomId", validateSession, async (req, res) => {
  try {
    
  } catch (err) {
    errorResponse(res, err);
  }
});

// update message
router.patch("/:roomId/:messageId", validateSession, async (req, res) => {
  try {
    
  } catch (err) {
    errorResponse(res, err);
  }
});

// delete message
router.delete("/roomId/:messageId", validateSession, async (req, res) => {
  try {
    
  } catch (err) {
    errorResponse(res, err);
  }
});

module.exports = router;