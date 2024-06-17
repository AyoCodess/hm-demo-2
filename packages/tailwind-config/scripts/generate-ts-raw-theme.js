const fs = require('fs');

// Read the JavaScript file
const jsFile = fs.readFileSync('rawTheme.js', 'utf8');

// Replace `module.exports` with `export default`
const tsFile = jsFile.replace('module.exports = theme;', 'export default theme;');

// Write the TypeScript file
fs.writeFileSync('rawTheme.ts', tsFile);
