const { getURLsFromHTML } = require("./crawl.js");

async function getHTML() {
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
