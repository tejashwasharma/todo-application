const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String
  },
  email: {
    type: String,
    unique: true
  },
  password: {
    type: String
  },
  team: {
    type: mongoose.Types.ObjectId,
    required: true
  },
  archived: {
    type: Boolean,
    default: false
  },
  type: {
    type: String,
    default: 'user'
  }
}, { timestamps: true, collection: 'user' });

userSchema.pre('save', function (next) {
  const user = this;
  if (!user.isModified('password')) {
    return next();
  }
  bcrypt.hash(user.password, 10).then((hashedPassword) => {
    user.password = hashedPassword;
    return next();
  }, err => next(err));
});

userSchema.methods.comparePassword = function comparePassword(userPassword) {
  return new Promise((resolve, reject) => {
    if (!this.password) {
      return resolve(false)
    }
    bcrypt.compare(userPassword, this.password)
      .then((isMatch) => {
        resolve(isMatch);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const User = mongoose.model('User', userSchema);
module.exports = User;
