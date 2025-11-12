import mongoose from 'mongoose';

import { kindsOfActivities } from './activity.utils.js';

const ActivitySchema = new mongoose.Schema(
  {
    when: {
      type: Date,
      required: [true, 'When is required'],
    },
    kind: {
      type: String,
      required: [true, 'Kind of activity is required.'],
      default: 'Outdoor walking',
      enum: kindsOfActivities,
    },
    title: {
      type: String,
      required: [true, 'An activity needs a title (2 - 50 chars).'],
      minlength: 2,
      maxlength: 50,
    },
    description: {
      type: String,
    },
    distance: {
      type: Number,
      default: 0,
    },
    duration: {
      type: Number,
      default: 0,
    },
    elevation: {
      type: Number,
      default: 0,
    },
    calories: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

export default mongoose.model('Activity', ActivitySchema);
