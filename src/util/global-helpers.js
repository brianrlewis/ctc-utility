import isObject from 'lodash-es/isObject';

if (process.env.DEV) {
  // This function makes proxies easier to read in the console
  const formatArg = value => {
    if (Array.isArray(value)) {
      return [...value.map(formatArg)];
    } else if (isObject(value)) {
      return { ...value };
    } else {
      return value;
    }
  };

  window.log = (...args) => console.log(...args.map(formatArg));
}
