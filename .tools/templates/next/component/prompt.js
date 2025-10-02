module.exports = [
  {
    type: 'input',
    name: 'name',
    message: 'What is the component name?',
    validate: (answer) => {
      if (!answer) {
        return 'component name is required';
      }
      return true;
    },
  },
];
