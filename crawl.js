const jsdom = require("jsdom");
const { JSDOM } = jsdom;

// takes a string url, and normalizes it by removing the protocol and trailing slash, if there is one
function normalizeURL(url) {
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
// appends the baseURL to relative links
async function getURLsFromHTML(htmlBody, baseURL) {
  const dom = new JSDOM(htmlBody);
  const linkList = [];
  dom.window.document.querySelectorAll("a").forEach((link) => {
    if (link.getAttribute("href").startsWith("/")) {
      linkList.push(`${baseURL}${link.getAttribute("href")}`);
    } else {
      linkList.push(link.getAttribute("href"));
    }
  });
  return linkList;
}

async function crawlPage(baseURL, currentURL, pages = {}) {
  const baseURLconverted = new URL(baseURL);
  const currentURLconverted = new URL(currentURL);

  if (currentURLconverted.host !== baseURLconverted.host) {
    return pages;
  }

  const normalizedCurrentURL = normalizeURL(currentURLconverted);

  if (!pages[normalizedCurrentURL]) {
    pages[normalizedCurrentURL] = 1;
  }
  if (baseURL === currentURL) {
    pages[normalizedCurrentURL] = 0;
  } else {
    pages[normalizedCurrentURL] += 1;
    return pages;
  }

  try {
    const res = await fetch(currentURL);
    console.log(`Crawling ${currentURL}...`);
    if (res.status >= 400 && res.status < 500) {
      console.log(`Error: status code: ${res.status}`);
      return;
    }
    if (!res.headers.get("Content-Type").includes("text/html")) {
      console.log(`Error: link is not text/html`);
      return;
    }

    const data = await res.text();
    const links = await getURLsFromHTML(data, baseURL);

    links.forEach((link) => {
      crawlPage(baseURL, link, pages);
    });
  } catch (e) {
    console.log(`Fetch failed: ${e}`);
  }

  return pages;
}

module.exports = {
  normalizeURL,
  getURLsFromHTML,
  crawlPage,
};
