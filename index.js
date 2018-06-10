const Boom = require('boom');

module.exports = function (condition, errorMessage, statusCode = 400) {
  if (!errorMessage) {
    throw new Error('You must specify an error message.');
  }

  if (condition) {
    return;
  }

  const error = new Error(
    process.env.NODE_ENV === 'production' ? '' : errorMessage,
  );

  throw Boom.boomify(error, { statusCode });
};
