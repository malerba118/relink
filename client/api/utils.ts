export const assertResponseOk = (response: { error: any }) => {
  if (response.error) {
    throw new ApiError(response.error);
  }
};

export class ApiError extends Error {
  type = "ApiError";
  message: string;
  details: string;
  hint: string;
  code: string;
  constructor(error: any) {
    super(error.message);
    this.message = error.message;
    this.details = error.details;
    this.hint = error.hint;
    this.code = error.code;
  }
}
