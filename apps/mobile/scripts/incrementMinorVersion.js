// incrementMinorVersion.js

const fs = require("fs");
const path = require("path");

// Path to package.json
const packagePath = path.join(__dirname,"../package.json");

// Read the package.json file
const packageJson = fs.readFileSync(packagePath,"utf8");

// Parse the JSON content to a JavaScript object
let packageObj = JSON.parse(packageJson);

// Split the version into major, minor, and patch
let [major,minor,patch] = packageObj.version.split(".");

// Increment the patch version
patch = Number(patch) + 1;

// If patch version exceeds 9999, reset it to 0 and increment minor version
if (patch > 9999) {
  patch = 0;
  minor = Number(minor) + 1;
}

// Update the version in the package object
packageObj.version = `${major}.${minor}.${String(patch).padStart(4,"0")}`;

// Convert the updated object back to JSON
const updatedPackageJson = JSON.stringify(packageObj,null,2);

// Write the updated JSON back to the package.json file
fs.writeFileSync(packagePath,updatedPackageJson);
