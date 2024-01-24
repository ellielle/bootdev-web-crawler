const { getURLsFromHTML, normalizeURL, crawlPage } = require("./crawl.js");

// parses args for URL to begin crawling
// no other args accepted
async function main() {
  if (process.argv.length < 3) {
    throw new Error("No URL included");
  }
  if (process.argv.length > 3) {
    throw new Error("Too many arguments");
  }

  const startURL = process.argv[2];

  try {
    const res = await fetch(startURL);

    if (res.status >= 400) {
      throw new Error("Given URL threw an error");
    }

    const data = await res.text();
    const pages = {};

    const links = await getURLsFromHTML(data, startURL);

    // start a count of the number of times a URL shows up
    links.forEach((link) => {
      const normalizedLink = normalizeURL(link);
      if (!pages[normalizedLink]) {
        pages[normalizedLink] = 1;
      } else {
        pages[normalizedLink] += 1;
      }
    });

    crawlPage(startURL, startURL, pages);
  } catch (e) {
    console.log(e);
    throw new Error("URL is not valid");
  }
}

main();
