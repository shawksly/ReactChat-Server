const router = require('express').Router();

const User = require('../models/user.model');

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

const validateSession = require('../middleware/validateSession');

function errorResponse(res, err) {
  res.status(500).json({
    ERROR: err.message,
  });
};

const encryptPassword = (password) => {
  const encrypt = bcrypt.hashSync(password, 10);
  console.log('ENCRYPT:', encrypt);
}

router.post('/signup', async (req, res) => {
  try {
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 13)
    });

    const newUser = await user.save();

    const token = jwt.sign({ id: newUser['_id']}, process.env.JWT, { expiresIn: "1 day"})

    res.status(200).json({
      user: newUser,
      message: 'Success! User created!',
      token
    })
  } catch (err) {
    res.status(500).json({
      ERROR: err.message
    });
  }
});

//? LOGIN

router.post('/login', async function (req, res) {
  try {
    const { username, password } = req.body;
    
    const user = await User.findOne({ username: username});

    if (!user) throw new Error('Email or Password does not match');

    const token = jwt.sign({ id: user._id }, process.env.JWT, { expiresIn: '1 day'});

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) throw new Error('Email or Password does not match');

    res.status(200).json({
      user,
      message: 'Succesfful Login!',
      token
    });
  } catch (err) {
      res.status(500).json({
        ERROR: err.message
      })
  }
})

// update a user
router.patch('/:userId', validateSession, async (req, res) => {
  try {
    let _id = req.params.userId;
    let owner = req.user.id;

    let updatedInfo = req.body;

    if (_id !== owner)
      throw new Error("Can't change another user's information");

    if (updatedInfo.password)
      updatedInfo.password = bcrypt.hashSync(updatedInfo.password, 13);

    const updated = await User.findOneAndUpdate({_id}, updatedInfo, {new: true});

    if (!updated)
      throw new Error("Invalid User")

    res.status(200).json({
      message: `User ${updated._id} Updated!`,
      updated
    });

  } catch (err) {
    errorResponse(res, err);
  }
});

// delete a user
router.delete('/:userId', validateSession, async (req, res) => {
  try {
    let { userId } = req.params;
    let owner = req.user.id;

    if (userId !== owner)
      throw new Error("Can't delete another user's information");
console.log('1');
    const deletedUser = await User.deleteOne({_id: userId});
console.log('2');
    if (!deletedUser.deletedCount)
      throw new Error('Invalid User!')

    res.status(200).json({
      message: 'User Deleted!',
      deletedUser
    })

  } catch (err) {
    errorResponse(res, err);
  }
});

module.exports = router;