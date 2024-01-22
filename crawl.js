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

module.exports = {
  normalizeUrl,
};
