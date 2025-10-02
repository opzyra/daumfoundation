const chalk = require('chalk');
const { runner, availableActions } = require('hygen');
const enquirer = require('enquirer');
const Logger = require('hygen/dist/logger');
const path = require('path');
const fs = require('fs');
const templates = path.join(__dirname, 'templates');
const { Select } = enquirer;

async function main() {
  const actions = availableActions(templates);
  const dir = fs
    .readdirSync(path.resolve(__dirname, '../'))
    .filter((item) => !item.startsWith('.') && item !== 'hygen');

  console.log(
    chalk.greenBright(`Code Generator CLI v${process.env.npm_package_version}`),
  );

  const domain = await new Select({
    name: 'dir',
    message: `Choose your module`,
    choices: dir,
  }).run();

  let template = 'next';
  if (domain === 'server') template = 'nest';

  // const template = await new Select({
  //   name: "template",
  //   message: "Pick a template",
  //   choices: Object.keys(actions),
  // }).run();

  const component = await new Select({
    name: 'component',
    message: `Pick a ${template} component preset`,
    choices: actions[template],
  }).run();

  await runner([template, component], {
    templates,
    cwd: process.cwd(),
    logger: new Logger.default(console.log.bind(console)),
    createPrompter: () => enquirer,
    helpers: {
      src: () => path.resolve(__dirname, `../${domain}/src`),
    },
    debug: !!process.env.DEBUG,
  });
}

main().catch(() => {});
