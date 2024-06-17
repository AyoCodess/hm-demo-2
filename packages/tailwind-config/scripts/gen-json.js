const fs = require('fs');

// Read the JavaScript file
const jsFile = fs.readFileSync('rawTheme.js','utf8');

// Extract the theme object
const themeStart = jsFile.indexOf('{');
const themeEnd = jsFile.lastIndexOf('}') + 1;
const themeString = jsFile.substring(themeStart,themeEnd);

// Parse the theme object
const themeObject = eval('(' + themeString + ')');

// Write the JSON file
fs.writeFileSync('rawTheme.json',JSON.stringify(themeObject,null,2));

// Assign the JSON content to a variable
const rawThemeJson = themeObject;
