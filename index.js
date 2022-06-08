const opentype = require('opentype.js');

const FONT_FILE = "./font.ttf";
const CHANGE_BY = 500;

(async () => {
  try {
    const font = await opentype.load(FONT_FILE);
    font.ascender += CHANGE_BY;
    font.tables["os2"].sTypoAscender += CHANGE_BY;
    font.tables["hhea"].ascender += CHANGE_BY;
    font.descender -= CHANGE_BY;
    font.tables["os2"].sTypoDescender -= CHANGE_BY;
    font.tables["hhea"].descender -= CHANGE_BY;
    const arr = FONT_FILE.split(".");
    arr[arr.length - 2] += `_lh_changed_by_${CHANGE_BY}`;
    font.download(arr.join("."));
  } catch (err) {
    console.error(err);
  }
})();
