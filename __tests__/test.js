const Boom = require('boom');

const invariant = require('../index');

module.exports = function () {
  test('does not throw when the condition is true', () => {
    expect(() => {
      invariant(true, 'This is a developer-facing error message.');
    }).not.toThrow();
  });

  test('throws a Boom 400 error when the condition is true', () => {
    let thrown = false;
    try {
      invariant(false, 'This is a developer-facing error message.');
    } catch (e) {
      thrown = true;
      expect(e).toBeInstanceOf(Boom);
      expect(e.output).toMatchSnapshot();
    }
    expect(thrown).toBe(true);
  });

  test('throws a Boom error with a custom status code when specified', () => {
    try {
      invariant(false, 'This is a developer-facing error message about teapots.', 418);
    } catch (e) {
      expect(e).toBeInstanceOf(Boom);
      expect(e.output).toMatchSnapshot();
    }
  });

  test('rejects the call if no error message is provided', () => {
    expect(() => {
      invariant(true);
    }).toThrowErrorMatchingSnapshot();
  });

  test('allows a boom function to be passed in', () => {
    try {
      invariant(false, 'This is a developer-facing error message.', Boom.notFound);
    } catch (e) {
      expect(e).toBeInstanceOf(Boom);
      expect(e.output).toMatchSnapshot();
    }
  });
};
