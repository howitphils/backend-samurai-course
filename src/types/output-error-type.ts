export type ErrorType = {
  message: string;
  field: string;
};

export type OutputErrorsType = {
  errorsMessages: ErrorType[];
};
