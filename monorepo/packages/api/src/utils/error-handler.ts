class CustomError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
    Object.setPrototypeOf(this, CustomError.prototype);
  }
}

const handeError = (err: unknown) => {
  if (err instanceof CustomError)
    return { message: err.message, status: err.status };
  else if (err instanceof Error) return { message: err.message, status: 500 };
  else return { message: "Unknown error", status: 500 };
};

export { CustomError, handeError };
