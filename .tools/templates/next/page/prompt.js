module.exports = [
  {
    type: 'input',
    name: 'name',
    message: 'What is the page name?',
    validate: (answer) => {
      if (!answer) {
        return 'page name is required';
      }
      return true;
    },
  },
  {
    type: 'input',
    name: 'path',
    message: 'Optionally enter nested path',
  },
];
