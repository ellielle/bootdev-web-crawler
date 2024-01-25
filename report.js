function printReport(pages) {
  console.log("Reporting results...");

  const sortedPages = sortResultsByLargest(pages);

  for (const entry of sortedPages) {
    // destructure the pair into a key:value pair
    const [page, count] = Object.entries(entry)[0];
    console.log(`Found ${count} internal links to ${page}`);
  }
}

function sortResultsByLargest(pages) {
  // create an array of page objects for sorting
  const pageArray = [];
  for (const [key, value] of Object.entries(pages)) {
    pageArray.push({ [key]: value });
  }
  pageArray.sort((a, b) => b[Object.keys(b)[0]] - a[Object.keys(a)[0]]);
  return pageArray;
}
module.exports = {
  printReport,
  sortResultsByLargest,
};
