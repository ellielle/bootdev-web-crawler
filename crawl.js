const jsdom = require("jsdom");
const { JSDOM } = jsdom;

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
async function getURLsFromHTML(htmlBody, baseUrl) {
  const dom = new JSDOM(htmlBody);
  const linkList = new Set();
  dom.window.document.querySelectorAll("a").forEach((link) => {
    if (link.getAttribute("href").startsWith("/")) {
      linkList.add(`${baseUrl}${link.getAttribute("href")}`);
    } else {
      linkList.add(link.getAttribute("href"));
    }
  });
  return linkList;
}

async function crawlPage(currentUrl) {
  try {
    const res = await fetch(currentUrl);
    if (res.status >= 400 && res.status < 500) {
      console.log(`Error: status code: ${res.status}`);
      return;
    }
    if (!res.status.ok) {
      console.log(`Error: status code: ${res.status}`);
    }
    if (!res.headers.get("Content-Type").includes("text/html")) {
      console.log(`Error: link is not text/html`);
      return;
    }

    const data = await res.text();
    console.log(data);
  } catch (e) {
    console.log(`Fetch failed: ${e}`);
  }
}

module.exports = {
  normalizeUrl,
  getURLsFromHTML,
  crawlPage,
};
