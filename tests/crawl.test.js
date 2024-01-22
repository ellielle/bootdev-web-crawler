const { describe, test, expect } = require("@jest/globals");
const { normalizeUrl } = require("../crawl.js");
const htmlDoc = require("./utils/testhtml.html");

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

describe("getURLsFromHTML function", () => {
  test("it grabs all links from a valid document", () => {
    expect(getURLsFromHTML(htmlDoc)).toBe(false);
  });
});
