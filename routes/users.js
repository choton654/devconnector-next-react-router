const router = require('express').Router();
const User = require('../models/User');
const { authUser } = require('../utils/authUser');
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const jwt = require('jsonwebtoken');
const {
  validateRegisterInput,
  validateLoginInput,
} = require('../utils/validators');

// register a user
router.post('/register', async (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  try {
    const user = await User.findOne({ email: req.body.email });

    if (user) {
      errors.email = 'user already exists';
      return res.status(400).json(errors);
    }

    const avatar = gravatar.url(req.body.email, { s: 200, r: 'pg', d: 'mm' });

    const hash = await bcrypt.hash(req.body.password, 10);

    const newUser = await new User({
      name: req.body.name,
      email: req.body.email,
      password: hash,
      avatar,
    }).save();
    res.status(200).json(newUser);
  } catch (error) {
    console.error(error);
  }
});

// login user
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      errors.email = 'user not found';
      return res.status(404).json(errors);
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const token = jwt.sign(
        { id: user._id, name: user.name, avatar: user.avatar },
        process.env.JWT_SECRET,
        // { expiresIn: 3600 },
      );
      res.status(200).json({ success: true, token });
    } else {
      errors.password = 'password does not match';
      return res.status(404).json(errors);
    }
  } catch (error) {
    console.error(error);
  }
});

// get auth user
router.get('/current', authUser, async (req, res) => {
  try {
    res.status(200).json({
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
    });
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
