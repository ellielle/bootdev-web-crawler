const { describe, test, expect } = require("@jest/globals");
const { normalizeUrl } = require("../crawl.js");

describe("noramilzeUrl function", () => {
  test("it normalizes URLs", () => {
    const URLS = [
      "https://blog.boot.dev/path/",
      "https://blog.boot.dev/path",
      "http://blog.boot.dev/path/",
      "http://blog.boot.dev/path",
    ];
    URLS.forEach((url) => {
      expect(normalizeUrl(url)).toBe("blog.boot.dev/path");
    });
  });
  test("it throws an error with invalid URLs", () => {
    const url = "//blog.boot.dev/path";
    expect(() => normalizeUrl(url)).toThrow(Error);
  });
});
