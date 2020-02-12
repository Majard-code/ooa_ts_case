export interface IResponse {
  result: {
    message: string,
  }
}

export interface IError {
  errors: string[],
}