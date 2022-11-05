const { Router } = require('express');
const User = require('../database/schemas/User');
const passport = require('passport');
const { hashPassword, comparePassword } = require('../utils/helper');
const router = Router();
/*
router.post('/login', async (request, response) => {
  const { email, password } = request.body;
  if (!email || !password) return response.send(400);
  const userDB = await User.findOne({ email });
  if (!userDB) return response.send(401);
  const isValid = comparePassword(password, userDB.password);
  if (isValid) {
    console.log('Authenticated Successfully!');
    request.session.user = userDB;
    return response.send(200);
  } else {
    console.log('Failed to Authenticate');
    return response.send(401);
  }
});
*/

router.post('/login', passport.authenticate('local'), (req, res) => {
  res.send(200);
});

router.post('/register', async (req, res) => {
  const { email } = req.body;
  const userDB = await User.findOne({ email });
  if(userDB) {
    res.status(400).send({ msg: 'User already exists.' });
  } else {
    const password = hashPassword(req.body.password);
    console.log(password);
    const newUser = await User.create({ username, password, email});
    res.status(201);
  }
});

module.exports = router;
