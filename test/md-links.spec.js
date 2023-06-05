const fs = require('fs');
const { mdLinks, indentifyLinks, validate } = require('../src/index');

jest.mock('fs');

describe('mdLinks', () => {
  it('should throw error', () => {
    const path = '';
    const options = {};
    try {
      mdLinks(path, options);
    } catch (err) {
      expect(err.message).toEqual('Esse caminho é inválido.');
    }
  });
});

describe('indentifyLinks', () => {
  it('should be a function', () => {
    expect(typeof indentifyLinks).toBe('function');
  });
});

it('should extract links correctly', () => {
  const data = `[Arranjos](https://curriculum.laboratoria.la/pt/topics/javascript/04-arrays)
  [Array - MDN](https://developer.mozilla.org//pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/)`;
  const resultExpected = [
    {
      text: 'Arranjos',
      href: 'https://curriculum.laboratoria.la/pt/topics/javascript/04-arrays',
      file: 'rote',
    },
    {
      text: 'Array - MDN',
      href: 'https://developer.mozilla.org//pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/',
      file: 'rote',
    },
  ];
  const path = 'rote';
  const result = indentifyLinks(data, path);
  expect(result).toEqual(resultExpected);
});

describe('validate', () => {
  it('should show valid links', async () => {
    global.fetch = jest.fn().mockResolvedValue(
      { ok: 'ok' },
    );
    const linksList = [
      { href: 'http://www.google.com', name: 'Google' },
      { href: 'http://www.twitter.com', name: 'Twitter' },
    ];
    const expectedList = [
      { href: 'http://www.google.com', name: 'Google', ok: 'ok' },
      { href: 'http://www.twitter.com', name: 'Twitter', ok: 'ok' },
    ];
    const validLinks = await validate(linksList);
    expect(validLinks).toEqual(expectedList);
  });
});

describe('validate', () => {
  it('should show valid links', async () => {
    global.fetch = jest.fn().mockResolvedValue(
      { ok: false },
    );
    const linksList = [
      { href: 'http://www.google.com', name: 'Google' },
      { href: 'http://www.twitter.com', name: 'Twitter' },
    ];
    const expectedList = [
      { href: 'http://www.google.com', name: 'Google', ok: 'fail' },
      { href: 'http://www.twitter.com', name: 'Twitter', ok: 'fail' },
    ];
    const validLinks = await validate(linksList);
    expect(validLinks).toEqual(expectedList);
  });
});

describe('validate', () => {
  it('should show broken links', async () => {
    global.fetch = jest.fn().mockRejectedValue();
    const linksList = [
      { href: 'http://www.google.com', name: 'Google' },
      { href: 'http://www.twitter.com', name: 'Twitter' },
    ];
    const expectedList = [
      {
        href: 'http://www.google.com', name: 'Google', ok: 'fail', status: 'link inexistente',
      },
      {
        href: 'http://www.twitter.com', name: 'Twitter', ok: 'fail', status: 'link inexistente',
      },
    ];
    const validLinks = await validate(linksList);
    expect(validLinks).toEqual(expectedList);
  });
});

describe('mdLinks', () => {
  it('should return a promise', () => {
    const file = 'doc/text.md';
    const promise = mdLinks(file);

    expect(promise).toBeInstanceOf(Promise);
  });
});
