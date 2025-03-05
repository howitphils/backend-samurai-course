import { ErrorType, OutputErrorsType } from "../types/output-error-type";
import {
  InputVideoTypePost,
  InputVideoTypeUpdate,
  Resolutions,
} from "../types/videos-types";

export const createError = (field: string): ErrorType => {
  return {
    field,
    message: `Invalid ${field} input`,
  };
};

export const postVideoBodyValidation = (body: InputVideoTypePost) => {
  const errors: OutputErrorsType = {
    errorsMessages: [],
  };
  const { author, availableResolutions, title } = body;
  if (!validateAuthor(author)) {
    errors.errorsMessages.push(createError("author"));
  }
  if (!validateTitle(title)) {
    errors.errorsMessages.push(createError("title"));
  }
  if (!validateAvailableResolutions(availableResolutions)) {
    errors.errorsMessages.push(createError("availableResolutions"));
  }

  return errors;
};

export const updateVideoBodyValidation = (body: InputVideoTypeUpdate) => {
  const errors: OutputErrorsType = {
    errorsMessages: [],
  };

  const {
    author,
    availableResolutions,
    canBeDownloaded,
    minAgeRestriction,
    publicationDate,
    title,
  } = body;

  if (!validateAuthor(author)) {
    errors.errorsMessages.push(createError("author"));
  }
  if (!validateTitle(title)) {
    errors.errorsMessages.push(createError("title"));
  }
  if (!validateAvailableResolutions(availableResolutions)) {
    errors.errorsMessages.push(createError("availableResolutions"));
  }

  if (validateCanBeDownloaded(canBeDownloaded)) {
    errors.errorsMessages.push(createError("canBeDownloaded"));
  }

  if (!validateMinAgeRestriction(minAgeRestriction)) {
    errors.errorsMessages.push(createError("canBeDownloaded"));
  }

  if (!validatePublicationDate(publicationDate)) {
    errors.errorsMessages.push(createError("canBeDownloaded"));
  }

  return errors;
};

const validateAuthor = (author: string) =>
  !(!author || !author.trim() || author.length > 20);

const validateTitle = (title: string) =>
  !(!title || !title.trim() || title.length > 40);

const validateAvailableResolutions = (availableResolutions: Resolutions[]) =>
  !(
    !availableResolutions ||
    !availableResolutions.length ||
    !availableResolutions.find((p) => Resolutions[p])
  );

const validateMinAgeRestriction = (a: number | null) => {
  if (a === null) {
    return true;
  }
  if (a > 18 || a < 1) {
    return false;
  } else {
    return true;
  }
};

const validatePublicationDate = (date: string) =>
  !(!date || typeof date !== "string");

const validateCanBeDownloaded = (a: boolean) => !a || typeof a !== "boolean";
