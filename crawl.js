const jsdom = require("jsdom");

// takes a string url, and normalizes it by removing the protocol and trailing slash, if there is one
function normalizeUrl(url) {
  try {
    let normalizedUrl = new URL(url);
    if (normalizedUrl.pathname.endsWith("/")) {
      return `${normalizedUrl.host}${normalizedUrl.pathname.slice(0, -1)}`;
    }
    return `${normalizedUrl.host}${normalizedUrl.pathname}`;
  } catch (e) {
    throw new Error(e);
  }
}

// parses an HTML doc for hyperlinks
// appends the baseUrl to relative links
function getURLsFromHTML(htmlBody, baseUrl) {
  return false;
}

module.exports = {
  normalizeUrl,
};