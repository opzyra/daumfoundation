module.exports = [
  {
    type: 'input',
    name: 'name',
    message: 'What is the section name?',
    validate: (answer) => {
      if (!answer) {
        return 'section name is required';
      }
      return true;
    },
  },
  {
    type: 'input',
    name: 'path',
    message: 'Enter nested page path',
    validate: (answer) => {
      if (!answer) {
        return 'path is required';
      }
      return true;
    },
  },
];
