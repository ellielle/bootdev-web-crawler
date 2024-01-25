const { crawlPage } = require("./crawl.js");
const { printReport } = require("./report.js");

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
    const results = await crawlPage(startURL, startURL);
    printReport(results);
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
}

main();
