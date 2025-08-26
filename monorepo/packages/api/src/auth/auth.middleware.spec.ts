// import { CustomError } from "../utils/error-handler";
// import {
//   extractUserKeyFromBearer,
//   isCorrectKey,
//   isKey,
// } from "./auth.middleware";

// describe("extractUserKeyFromBearer", () => {
//   it("should return undefined when authHeader is undefined", () => {
//     const result = extractUserKeyFromBearer();
//     expect(result).toBeUndefined();
//   });

//   it("should return undefined when authHeader is empty string", () => {
//     const result = extractUserKeyFromBearer("");
//     expect(result).toBeUndefined();
//   });
//   it("should return undefined when authHeader has more than two parts", () => {
//     const result = extractUserKeyFromBearer("Bearer token extra");
//     expect(result).toBeUndefined();
//   });
//   it("should return the token when authHeader is properly formatted", () => {
//     const result = extractUserKeyFromBearer("Bearer abc123");
//     expect(result).toBe("abc123");
//   });
// });

// describe("isKey", () => {
//   it("should throw CustomError when key is undefined", () => {
//     expect(() => isKey()).toThrow(CustomError);
//     expect(() => isKey()).toThrow(
//       "Please set api key in param or token Bearer header.",
//     );
//   });
//   it("should return the key when key is provided", () => {
//     const result = isKey("valid-key");
//     expect(result).toBe("valid-key");
//   });
// });

// describe("isCorrectKey", () => {
//   it("should throw CustomError when keys do not match", () => {
//     expect(() => isCorrectKey("correct-key", "wrong-key")).toThrow(CustomError);
//     expect(() => isCorrectKey("correct-key", "wrong-key")).toThrow(
//       "Invalid key provided.",
//     );
//   });
//   it("should not throw when keys match exactly", () => {
//     expect(() => isCorrectKey("correct-key", "correct-key")).not.toThrow();
//   });
// });
