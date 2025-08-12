const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Course title is required'],
    trim: true
  },
  category: {
    type: String,
    required: [true, 'Course category is required'],
    enum: [
      'Next JS',
      'Data Science',
      'Frontend Development',
      'Fullstack Development',
      'MERN Stack Development',
      'Javascript',
      'Python',
      'Docker',
      'MongoDB',
      'HTML'
    ]
  },
  description: {
    type: String,
    required: [true, 'Course description is required']
  },
  price: {
    type: Number,
    required: [true, 'Course price is required'],
    min: 0
  },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  thumbnail: {
    type: String,
    default: 'default-course-thumbnail.jpg'
  },
  isPublished: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Course', courseSchema); 