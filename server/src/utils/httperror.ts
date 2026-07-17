export class HttpError extends Error {
  constructor(
    public statusCode: number,
    message: string,
  ) {
    super(message);
    this.name = "HttpError";
    Object.setPrototypeOf(this, HttpError.prototype);
  }
  static badRequest(message: string): HttpError {
    return new HttpError(400, message);
  }
  static unauthorized(message: string): HttpError {
    return new HttpError(401, message);
  }
  static forbidden(message: string): HttpError {
    return new HttpError(403, message);
  }
  static notFound(message: string): HttpError {
    return new HttpError(404, message);
  }
  static internalServerError(message: string): HttpError {
    return new HttpError(500, message);
  }
}
export default HttpError;
