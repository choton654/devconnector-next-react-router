const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.authUser = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res.status(404).json({ error: 'Unauthorized' });
    }

    const { id } = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET,
    );

    const user = await User.findOne({ _id: id });
    if (!user) {
      return res.status(404).json({ error: 'No user found' });
    }
    req.user = user;
    // console.log(req.user);
    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: 'token verification field' });
  }
};
