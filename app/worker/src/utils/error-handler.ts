const handleErrorToMessage = (error: unknown) => {
  if (error instanceof Error) return error.message;
  else return "Unknown error";
};

export { handleErrorToMessage };
