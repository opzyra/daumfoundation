module.exports = [
  {
    type: "input",
    name: "name",
    message: "What is the module name?",
    validate: (answer) => {
      if (!answer) {
        return "module name is required";
      }
      return true;
    },
  },
  {
    type: "input",
    name: "domain",
    message: "What is the domain name? (kr)",
    validate: (answer) => {
      if (!answer) {
        return "domain name is required";
      }
      return true;
    },
  },
];
