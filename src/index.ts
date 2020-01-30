import Boom from '@hapi/boom';

type BoomFunction = <Data>(message?: string, data?: Data) => Boom.Boom<Data>;

function invariant(
  condition: any,
  errorMessage: string,
  statusCodeOrBoomFunc: number | BoomFunction = 400,
): asserts condition {
  if (!errorMessage) {
    throw new Error('You must specify an error message.');
  }

  if (
    !(
      typeof statusCodeOrBoomFunc === 'number' ||
      typeof statusCodeOrBoomFunc === 'function'
    )
  ) {
    throw new Error('Third argument must be a number or function');
  }

  if (condition) {
    return;
  }

  const sanitizedErrorMessage =
    process.env.NODE_ENV === 'production' ? '' : errorMessage;
  const error = new Error(sanitizedErrorMessage);

  if (typeof statusCodeOrBoomFunc === 'function') {
    throw statusCodeOrBoomFunc(sanitizedErrorMessage);
  }

  throw Boom.boomify(error, { statusCode: statusCodeOrBoomFunc });
}

module.exports = invariant;
export default invariant;
