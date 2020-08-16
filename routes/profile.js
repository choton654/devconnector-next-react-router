const router = require('express').Router();
const User = require('../models/User');
const Profile = require('../models/Profile');
const { authUser } = require('../utils/authUser');
const {
  validateProfileInput,
  validateExpInput,
  validateEduInput,
} = require('../utils/validators');

// get user by handle
router.get('/handle/:handle', async (req, res) => {
  try {
    const user = await Profile.findOne({
      handle: req.params.handle,
    }).populate('user', ['name', 'avatar']);

    if (!user) {
      return res
        .status(400)
        .json({ noProfile: 'There is no profile for this user' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ profile: 'There is no profile for this user' });
  }
});

// get user by userId
router.get('/user/:userId', async (req, res) => {
  try {
    const user = await Profile.findOne({
      user: req.params.userId,
    }).populate('user', ['name', 'avatar']);

    if (!user) {
      return res
        .status(400)
        .json({ noProfile: 'There is no profile for this user' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ profile: 'There is no profile for this user' });
  }
});

// get all profiles
router.get('/all', async (req, res) => {
  try {
    const users = await Profile.find().populate('user', ['name', 'avatar']);

    if (!users) {
      return res.status(400).json({ noProfile: 'There are no profiles' });
    }

    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ profile: 'There are no profiles' });
  }
});

// get single user profile
router.get('/', authUser, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate('user', ['name', 'avatar']);

    if (!profile) {
      return res
        .status(400)
        .json({ noProfile: 'There is no profile for this user' });
    }

    res.status(200).json(profile);
  } catch (error) {
    console.error(error);
  }
});

// create or update profile
router.post('/', authUser, async (req, res) => {
  try {
    const { errors, isValid } = validateProfileInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }
    // get fields
    const profileFields = {};
    profileFields.user = req.user.id;
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.company) profileFields.company = req.body.company;
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.status) profileFields.status = req.body.status;
    if (req.body.githubusername)
      profileFields.githubusername = req.body.githubusername;

    // skills split into array
    if (req.body.skills !== 'undefined') {
      profileFields.skills = req.body.skills.split(',');
    }

    // social
    profileFields.social = {};
    if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
    if (req.body.instagram) profileFields.social.instagram = req.body.instagram;

    const existingProfile = await Profile.findOne({ user: req.user.id });

    if (existingProfile) {
      // update profile
      const updatedProfile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true },
      );
      res.status(200).json(updatedProfile);
    } else {
      // create
      const sameHandleProfile = await Profile.findOne({
        handle: req.user.handle,
      });

      if (sameHandleProfile) {
        errors.handle = 'Handle already exists';
        return res.status(400).json(errors);
      } else {
        const newProfile = await new Profile(profileFields).save();
        res.status(200).json(newProfile);
      }
    }
  } catch (error) {
    console.error(error);
  }
});

// delete experience from profile
router.delete('/experience/:expId', authUser, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    });

    if (!profile) {
      return res
        .status(400)
        .json({ noProfile: 'There is no profile for this user' });
    }

    profile.experience.pull({ _id: req.params.expId });
    await profile.save();

    res.status(200).json(profile);
  } catch (error) {
    console.error(error);
  }
});

// add experience to profile
router.post('/experience', authUser, async (req, res) => {
  try {
    const { errors, isValid } = validateExpInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
    } = req.body;

    const profile = await Profile.findOne({
      user: req.user.id,
    });

    if (!profile) {
      return res
        .status(400)
        .json({ noProfile: 'There is no profile for this user' });
    }

    const newExp = {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
    };

    profile.experience.unshift(newExp);
    await profile.save();

    res.status(200).json(profile);
  } catch (error) {
    console.error(error);
  }
});

// delete education from profile
router.delete('/education/:eduId', authUser, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    });

    if (!profile) {
      return res
        .status(400)
        .json({ noProfile: 'There is no profile for this user' });
    }

    profile.education.pull({ _id: req.params.eduId });
    await profile.save();

    res.status(200).json(profile);
  } catch (error) {
    console.error(error);
  }
});

// add education to profile
router.post('/education', authUser, async (req, res) => {
  try {
    const { errors, isValid } = validateEduInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description,
    } = req.body;

    const profile = await Profile.findOne({
      user: req.user.id,
    });

    if (!profile) {
      return res
        .status(400)
        .json({ noProfile: 'There is no profile for this user' });
    }

    const newEdu = {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description,
    };

    profile.education.unshift(newEdu);
    await profile.save();

    res.status(200).json(profile);
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
