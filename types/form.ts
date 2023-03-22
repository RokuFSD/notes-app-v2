export type ErrorType = {
  [key: string]: string;
};

export type ValidationArr = {
  <Array extends [any]>(...args: Array): boolean | ErrorType;
};
