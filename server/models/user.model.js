import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const experienceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  startDate: {
    type: String,
    required: true,
  },
  endDate: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const educationSchema = new mongoose.Schema({
  degree: {
    type: String,
    required: true,
  },
  school: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  startDate: {
    type: String,
    required: true,
  },
  endDate: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const seekerDetailsSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: function () {
      return this.isModified('fullName');
    },
  },
  profileImage: {
    type: String,
    required: true,
    default: '/placeholder.svg?height=200&width=200',
  },
  headline: {
    type: String,
    required: function () {
      return this.isModified('headline');
    },
  },
  location: {
    type: String,
    required: function () {
      return this.isModified('location');
    },
  },
  hourlyRate: {
    type: Number,
    required: function () {
      return this.isModified('hourlyRate');
    },
  },
  overview: {
    type: String,
    required: function () {
      return this.isModified('overview');
    },
  },
  skills: {
    type: [String],
    required: function () {
      return this.isModified('skills');
    },
  },
  experience: {
    type: [experienceSchema],
    required: true,
  },
  education: {
    type: [educationSchema],
    required: true,
  },
});

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: ['seeker', 'recruiter'],
    default: 'seeker',
  },
  profilePicture: {
    type: String,
    required: true,
    default: 'https://cdn.pixabay.com/photo/2022/02/23/20/17/man-7031423_1280.png',
  },
  seekerDetails: {
    type: seekerDetailsSchema,
    required: function () {
      return this.role === 'seeker' && this.isNew;
    },
    // required: false,
    default: {}
  },
  recruiterDetails: {
    type: Object,
    required: function () {
      return this.role === 'recruiter';
    },
    // required: false,
    // default: {}
  },
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.matchPassword = function (password) {
  return bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;
