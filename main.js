const { getURLsFromHTML } = require("./crawl.js");

// parses args for URL to begin crawling
// no other args accepted
async function getHTML() {
  if (process.argv.length < 3) {
    throw new Error("No URL included");
  }
  if (process.argv.length > 3) {
    throw new Error("Too many arguments");
  }
  try {
    const res = await fetch(process.argv[2]);
    const data = await res.text();

    console.log(getURLsFromHTML(data, process.argv[2]));
  } catch (e) {
    console.log(e);
    throw new Error("URL is not valid");
  }
}

getHTML();
