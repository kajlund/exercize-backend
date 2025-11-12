import { kindsOfActivities } from './activity.utils.js';

export const idSchema = {
  type: 'object',
  required: ['id'],
  properties: {
    id: {
      type: 'string',
      minLength: 24,
      maxLength: 36,
    },
  },
};

export const activitySchema = {
  type: 'object',
  required: ['when', 'kind', 'title'],
  properties: {
    when: {
      type: 'string',
      format: 'date',
      description: 'Date of the activity',
      example: '2025-01-01',
    },
    kind: {
      type: 'string',
      enum: kindsOfActivities,
      description: 'Activity category',
      example: 'Walking',
    },
    title: {
      type: 'string',
      minLength: 2,
      maxLength: 50,
      description: 'Title of the activity',
      example: 'Morning Walk',
    },
    description: {
      type: 'string',
      description: 'A comment about the activity',
      example: 'A relaxing walk around the hood.',
    },
    distance: {
      type: 'number',
      minimum: 0,
      description: 'Distance covered during the activity in km',
      example: 5.55,
    },
    duration: {
      type: 'string',
      pattern: '^([0-9]{2}):([0-9]{2}):([0-9]{2})$',
      description: 'Duration of the activity in seconds',
      example: '01:00:00',
    },
    // pace: {
    //   type: 'string',
    //   pattern: '^([0-9]{2}):([0-9]{2})$',
    //   description: 'Average pace during the activity in mm:ss per kilometer',
    //   example: ' 05:00',
    // },
    elevation: {
      type: 'number',
      description: 'Elevation gain during the activity in meters',
      minimum: 0,
      example: 35,
    },
    calories: {
      type: 'number',
      minimum: 0,
      description: 'Calories burned during the activity',
      example: 500,
    },
    // heartRate: {
    //   type: 'number',
    //   minimum: 0,
    //   description: 'Average heart rate during the activity in beats per minute (BPM)',
    //   example: 120,
    // },
    // cadence: {
    //   type: 'number',
    //   minimum: 0,
    //   description: 'Average cadence during the activity in steps per minute (SPM)',
    //   example: 80,
    // },
  },
};
