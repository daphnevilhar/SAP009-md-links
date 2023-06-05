#!/usr/bin/env node
const mdLinks = require('./index');

const argument = process.argv[2];
const options = {
  validate: process.argv.includes('--validate'),
  stats: process.argv.includes('--stats'),
};

function showList(result) {
  const list = result.map((item) => `${item.file} | ${item.href} | ${item.text}`).join('\n');
  console.log(list);
}

function showValidation(result) {
  const list = result.map((item) => `${item.href} | ${item.ok} | ${item.status}`).join('\n');
  console.log(list);
}

mdLinks(argument, options)
  .then((result) => {
    if (options.validate === false && options.stats === false) {
      showList(result);
    } else if (options.validate === true && options.stats === false) {
      showValidation(result);
    } else if (options.validate === false && options.stats === true) {
      showStats(result);
    }
  });
