const fs = require("fs");
const path = require("path");

// Function to format a JSON string into a JavaScript object representation
function formatJSONtoJSObject(json) {
  return json.replace(/"([^"]+)":/g,"$1:");
}

// Paths to the source and destination files
const sourcePath = path.resolve(
  __dirname,"../../../packages/tailwind-config/rawTheme.js");
const destinationPath = path.resolve(__dirname,"../rawTheme.ts");
const destinationJsonPath = path.resolve(__dirname,"../rawTheme.json");

// Import the source file
const sourceObject = require(sourcePath);

// Convert the theme object to a JSON string
const jsonString = JSON.stringify(sourceObject,null,2);

// Convert the JSON string to a JavaScript object representation
const jsObjectString = formatJSONtoJSObject(jsonString);

// Write the theme object to a TypeScript file
const jsContent = "export const theme = " + jsObjectString + ";";
fs.writeFileSync(destinationPath,jsContent);

// Write the theme object to a json file
const newJsonObj = "{ \"theme\": " + jsonString + "}"
fs.writeFileSync(destinationJsonPath,newJsonObj);

console.log(`Wrote theme to ${destinationPath}`);
