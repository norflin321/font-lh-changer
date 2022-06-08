const opentype = require('opentype.js');

const FONT_FILE = "./font.otf"; // change
const INCREASE_BY = 500; // change

(async () => {
  try {
    const font = await opentype.load(FONT_FILE);
    font.ascender += INCREASE_BY;
    font.tables["os2"].sTypoAscender += INCREASE_BY;
    font.tables["hhea"].ascender += INCREASE_BY;
    font.descender -= INCREASE_BY;
    font.tables["os2"].sTypoDescender -= INCREASE_BY;
    font.tables["hhea"].descender -= INCREASE_BY;
    const arr = FONT_FILE.split(".");
    arr[arr.length - 2] += `-lh-increased-by-${INCREASE_BY}`;
    font.download(arr.join("."));
  } catch (err) {
    console.error(err);
  }
})();
