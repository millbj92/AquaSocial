const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const { check, validationResult } = require('express-validator/check');

//@route    GET api/profile/me
//@desc     Get current Users profile
//@access   PRIVATE
router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate(
      'user',
      ['name', 'avatar']
    );

    if (!profile) {
      return res.status(400).json({ msg: 'There is no profile for this user' });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//@route    POST api/profile
//@desc     Create or update user profile
//@access   PRIVATE
router.post('/', auth, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const profileFields = createFields(req);

  try {
    let profile = await Profile.findOne({ user: req.user.id });

    if (profile) {
      //UPDATE
      profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true }
      );

      return res.json(profile);
    }

    //CREATE
    profile = new Profile(profileFields);

    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//@route    GET api/profile
//@desc     GET All Profiles
//@access   PUBLIC
router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['name', 'avatar']);
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//@route    GET api/profile/user/:user_id
//@desc     GET Profile by user ID
//@access   PUBLIC
router.get('/user/:user_id', async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id
    }).populate('user', ['name', 'avatar']);

    if (!profile) {
      return res.status(400).json({ msg: 'Profile not found' });
    }
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(400).json({ msg: 'Profile not found' });
    }
    res.status(500).send('Server Error');
  }
});

//@route    DELETE api/profile
//@desc     Delete profile, user, and posts
//@access   PRIVATE
router.delete('/', auth, async (req, res) => {
  try {
    //@todo - remove users posts
    //Remove Profile
    await Profile.findOneAndRemove({ user: req.user.id });
    //Remove User
    await User.findOneAndRemove({ _id: req.user.id });

    res.json({ msg: 'User deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//@route    POST api/profile/tanks
//@desc     Add Tank to profile
//@access   PRIVATE
router.post(
  '/tanks',
  [
    auth,
    [
      check('water', 'Water type is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const newTank = createTank(req);

    try {
      const profile = await Profile.findOne({ user: req.user.id });

      profile.tanks.unshift(newTank);
      await profile.save();

      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

//@route    DELETE api/profile/tanks/:tank_id
//@desc     Delete tank from profile by id
//@access   PRIVATE
router.delete('/tanks/:tank_id', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    //Get the remove index
    const removeIndex = profile.tanks
      .map(item => item.id)
      .indexOf(req.params.tank_id);

    profile.tanks.splice(removeIndex, 1);

    await profile.save();

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//@route    PUT api/profile/tanks/:tank_id
//@desc     Update tank from profile by id
//@access   PRIVATE
router.put('/tanks/:tank_id', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    const changeIndex = profile.tanks
      .map(item => item.id)
      .indexOf(req.params.tank_id);

    const newTank = createTank(req);
    profile.tanks[changeIndex] = newTank;

    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

const createTank = req => {
  const {
    water,
    gallons,
    length,
    width,
    height,
    fish,
    plants,
    coral,
    image
  } = req.body;

  const tank = {};

  if (water) tank.water = water;
  if (gallons) tank.gallons = gallons;

  if (length && width && height) {
    tank.dimensions = {};
    tank.dimensions.length = length;
    tank.dimensions.width = width;
    tank.dimensions.height = height;
  }

  if (fish) tank.fish = fish.split(',').map(f => f.trim());

  if (plants) tank.plants = plants.split(',').map(f => f.trim());

  if (coral) tank.coral = coral.split(',').map(f => f.trim());

  if (image) tank.image = image;

  return tank;
};

const createFields = req => {
  const {
    company,
    address1,
    address2,
    city,
    state,
    zip,
    country,
    fish,
    bio,
    youtube,
    facebook,
    twitter,
    instagram
  } = req.body;

  const profileFields = {};

  profileFields.user = req.user.id;

  if (company) profileFields.company = company;
  if (bio) profileFields.bio = bio;

  if (youtube || facebook || twitter || instagram) profileFields.social = {};

  if (youtube) profileFields.social.youtube = youtube;
  if (facebook) profileFields.social.facebook = facebook;
  if (twitter) profileFields.social.twitter = twitter;
  if (instagram) profileFields.social.instagram = instagram;

  if (address1 || address2 || city || state || zip || country)
    profileFields.address = {};

  if (address1) profileFields.address.address1 = address1;
  if (address2) profileFields.address.address2 = address2;
  if (city) profileFields.address.city = city;
  if (state) profileFields.address.state = state;
  if (zip) profileFields.address.zip = zip;
  if (country) profileFields.address.country = country;

  return profileFields;
};

module.exports = router;
