const router = require('express').Router();

const User = require('../models/user.model');

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

const encryptPassword = (password) => {
  const encrypt = bcrypt.hashSync(password, 10);
  console.log('ENCRYPT:', encrypt);
}

router.post('/signup', async (req, res) => {
  console.log("trial");
  try {
    const user = new User({
      userName: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.pass, 13)
    });

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

//? LOGIN

router.post('/login', async function (req, res) {
  try {
    const { username, password } = req.body;
    
    const user = await User.findOne({ username: username});

    if (!user) throw new Error('Email or Password does not match');

    const token = jwt.sign({ id: user._id }, process.env.JWT, { expiresIn: 'one day'});

    const passwordMatch = await bcrypt.compare(pass, user.password);

    if (!passwordMatch) throw new Error('Email or Password does not match');

    res.status(200).json({
      user,
      message: 'Succesfful Login!',
      token
    });
  } catch (error) {
      res.status(500).json({
        ERROR: error.message
      })
  }
})

module.exports = router;