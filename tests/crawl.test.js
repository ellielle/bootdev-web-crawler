const { describe, test, expect } = require("@jest/globals");
const { normalizeURL, getURLsFromHTML } = require("../crawl.js");
const { sortResultsByLargest } = require("../report.js");
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
      expect(normalizeURL(url)).toBe("blog.boot.dev/path");
    });
  });
  test("it throws an error with invalid URLs", () => {
    const url = "//blog.boot.dev/path";
    expect(() => normalizeURL(url)).toThrow(Error);
  });
});

describe("getURLsFromHTML function", () => {
  test("it grabs all links from a valid document", async () => {
    expect(await getURLsFromHTML(htmlDoc, "http://web.simmons.edu")).toContain(
      "css-linking#internal",
      "http://web.simmons.edu/~grovesd/comm244",
      "http://web.simmons.edu/~grovesd/comm244/week3",
    );
  });
  test("it converts relative URLs to absolute URLs", async () => {
    expect(await getURLsFromHTML(htmlDoc, "http://web.simmons.edu")).toContain(
      "http://web.simmons.edu/~grovesd/comm244/week4",
    );
  });
});

describe("sortResultsByLargest function", () => {
  test("sorts the crawling results from largest count to smallest", () => {
    const testData = {
      "boot.dev": 2,
      "boot.dev/signup-flow": 5,
      "boot.dev/settings": 2,
      "boot.dev/teams": 2,
      "boot.dev/gifts": 2,
      "boot.dev/sitemap.xml": 2,
    };
    const sortedData = sortResultsByLargest(testData);
    expect(sortedData).toStrictEqual([
      { "boot.dev/signup-flow": 5 },
      { "boot.dev": 2 },
      { "boot.dev/settings": 2 },
      { "boot.dev/teams": 2 },
      { "boot.dev/gifts": 2 },
      { "boot.dev/sitemap.xml": 2 },
    ]);
  });
});
