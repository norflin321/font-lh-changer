const opentype = require('opentype.js');

const FONT_FILE = "font.ttf";
const CHANGE_BY = 500;
const NEW_NAME = ""; // change if want to rename

(async () => {
  try {
    const font = await opentype.load(FONT_FILE);

    font.ascender += CHANGE_BY;
    font.tables["os2"].sTypoAscender += CHANGE_BY;
    font.tables["hhea"].ascender += CHANGE_BY;
    font.descender -= CHANGE_BY;
    font.tables["os2"].sTypoDescender -= CHANGE_BY;
    font.tables["hhea"].descender -= CHANGE_BY;

    let newFileName = FONT_FILE;
    if (NEW_NAME) {
      // change font names
      const nameProps = ['fontFamily', 'fullName', 'preferredFamily', 'compatibleFullName', 'postScriptName'];
      for (const prop of nameProps) {
        try {
          for (const key in font.names[prop]) font.names[prop][key] = NEW_NAME;
        } catch {
          continue;
        }
      }
      // change file name
      const arr = FONT_FILE.split(".");
      const fileExt = arr[arr.length - 1];
      newFileName = NEW_NAME + `.${fileExt}`;
    }

    font.download(newFileName);
  } catch (err) {
    console.error(err);
  }
})();
