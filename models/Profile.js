const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  company: {
    type: String
  },
  address: {
    address1: {
      type: String
    },
    address2: {
      type: String
    },
    city: {
      type: String
    },
    state: {
      type: String
    },
    zip: {
      type: Number,
      required: true
    },
    country: {
      type: String
    }
  },
  tanks: [
    {
      water: {
        type: String,
        required: true
      },
      gallons: {
        type: Number
      },
      dimensions: {
        length: { type: Number },
        width: { type: Number },
        height: { type: Number }
      },
      fish: {
        type: [String]
      },
      plants: {
        type: [String]
      },
      coral: {
        type: [String]
      },
      image: {
        type: String
      }
    }
  ],
  bio: {
    type: String
  },
  social: {
    youtube: {
      type: String
    },
    twitter: {
      type: String
    },
    facebook: {
      type: String
    },
    instagram: {
      type: String
    }
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);
