// import fs from 'fs';
// import chalk from 'chalk';
const fs = require('fs');

function indentifyLinks(data, path) {
  const regex = /\[([^[\]]*?)\]\((https*?:\/\/[^\s?#.].[^\s]*)\)/gm;
  const captures = [...data.matchAll(regex)];
  const results = captures.map((capture) => ({
    text: capture[1],
    href: capture[2],
    file: path,
  }));
  return results;
}

function extractLinks(path) {
  const encoding = 'utf-8';
  return new Promise((resolve, reject) => {
    fs.readFile(path, encoding, (err, data) => {
      if (err) {
        reject(
          err,
        );
      } else {
        const results = indentifyLinks(data, path);
        resolve(results);
      }
    });
  });
}

function validate(linksList) {
  return Promise.all(linksList.map((link) => fetch(link.href)
    .then((response) => {
      const newLink = { ...link, status: response.status };
      if (response.ok) {
        newLink.ok = 'ok';
        return newLink;
      }
      newLink.ok = 'fail';
      return newLink;
    }).catch(() => {
      const newLink = { ...link, status: 'link inexistente' };
      newLink.ok = 'fail';
      return newLink;
    })));
}

function mdLinks(path, options = { }) {
  if (!path) throw new Error('Esse caminho é inválido.');
  return new Promise((resolve, reject) => {
    extractLinks(path)
      .then((file) => {
        console.log(options)
        if (options.validate === false) {
          resolve(file);
        } else if (options.validate === true) {
          resolve(validate(file));
        }
      })
      .catch((error) => reject(error));
  });
}

module.exports = { mdLinks, validate, indentifyLinks };
