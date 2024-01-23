const { describe, test, expect } = require("@jest/globals");
const { normalizeUrl, getURLsFromHTML } = require("../crawl.js");
const fs = require("fs");
const path = require("path");
const htmlDoc = fs.readFileSync(
  path.resolve(__dirname, "./utils/testhtml.html"),
);

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
    expect(getURLsFromHTML(htmlDoc, "http://web.simmons.edu")).toContain(
      "css-linking#internal",
      "http://web.simmons.edu/~grovesd/comm244",
      "http://web.simmons.edu/~grovesd/comm244/week3",
    );
  });
  test("it converts relative URLs to absolute URLs", () => {
    expect(getURLsFromHTML(htmlDoc, "http://web.simmons.edu")).toContain(
      "http://web.simmons.edu/~grovesd/comm244/week4",
    );
  });
});
