function generateKeywordsFromTitle(title) {
  return title
    .toLowerCase()
    .split(" ")
    .filter(word => word.length > 3);
}

export default generateKeywordsFromTitle;