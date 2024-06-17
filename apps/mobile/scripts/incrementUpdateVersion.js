// incrementVersion.js

const fs = require("fs");
const path = require("path");

// Path to package.json
const packagePath = path.join(__dirname,"../package.json");

// Read the package.json file
const packageJson = fs.readFileSync(packagePath,"utf8");

// Parse the JSON content to a JavaScript object
let packageObj = JSON.parse(packageJson);

// Increment the updateVersion value
packageObj.updateVersion = String(Number(packageObj.updateVersion) + 1);

// Convert the updated object back to JSON
const updatedPackageJson = JSON.stringify(packageObj,null,2);

// Write the updated JSON back to the package.json file
fs.writeFileSync(packagePath,updatedPackageJson);
