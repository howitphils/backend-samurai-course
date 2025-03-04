import { OutputErrorsType } from "../types/output-error-type";
import { InputVideoTypePost, Resolutions } from "../types/videos-types";

export const postVideoBodyValidation = (body: InputVideoTypePost) => {
  const errors: OutputErrorsType = {
    errorsMessages: [],
  };
  const { author, availableResolutions, title } = body;

  if (!author || !author.trim() || author.length > 20) {
    errors.errorsMessages.push({
      message: "Invalid author input",
      field: "author",
    });
  }
  if (!title || !title.trim() || title.length > 40) {
    errors.errorsMessages.push({
      message: "Invalid title input",
      field: "title",
    });
  }
  if (
    !availableResolutions ||
    !availableResolutions.length ||
    !body.availableResolutions.find((p) => Resolutions[p])
  ) {
    errors.errorsMessages.push({
      message: "Invalid availableResolutions input",
      field: "availableResolutions",
    });
  }
  return errors;
};
