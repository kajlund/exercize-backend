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

export const activityKindSchema = {
  type: 'object',
  required: ['name'],
  properties: {
    name: {
      type: 'string',
      description: 'Name of the activity kind',
      example: 'Football',
    },
    description: {
      type: 'string',
      description: 'Describes the kind of activity',
      example: '',
    },
  },
};
