# boom-invariant

This is an implementation of Facebook's [`invariant()`](https://github.com/facebook/fbjs/blob/master/packages/fbjs/src/__forks__/invariant.js)
function built on top of [Boom](https://github.com/hapijs/boom/), a library for constructing error
objects with HTTP status codes. Usage and behavior are similar to the original, but with two noteworthy changes:

- Error messages are not formatted for you. You should use ES6 template literals to format your error message when calling the function.
- The third argument is an optional HTTP status code. By default the status code is `400 Bad Request`.

## Installation

If you're using `npm`:

```
npm i --save boom-invariant
```

If you're using `yarn`:

```
yarn add boom-invariant`
```

## Usage

```
# Throws a Boom error with a 400 `statusCode` when `someCondition` is not truthy.
invariant(someCondition, 'Uh oh! Condition was not met!');
```

```
# Throws a Boom error with a 418 `statusCode` when `someCondition` is not truthy.
invariant(someCondition, 'Uh oh! Condition was not met because I\'m a teapot!', 418);
```

Note that the error message argument is **required**.

## Not using Boom?

If you don't use Boom and you want an invariant function, there's [a more generic version that just
throws `Error` objects](https://github.com/zertosh/invariant) and is more similar to Facebook's version.
Or just write one yourself, it's pretty simple.
