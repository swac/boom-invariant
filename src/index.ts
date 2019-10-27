import Boom from 'boom';

export default function(
  condition: any,
  errorMessage: string,
  statusCodeOrBoomFunc: number | ((msg: string) => Boom) = 400
) {
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
