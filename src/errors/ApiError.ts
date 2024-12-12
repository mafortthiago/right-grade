export class ApiError extends Error {
  constructor(message = "Api responded with an error") {
    super(message);
    this.name = "ApiError";
  }
}
