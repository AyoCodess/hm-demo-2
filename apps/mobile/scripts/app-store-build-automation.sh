# delete all prior builds!
rm -f build-* && rm -rf WPAppen.app*

# Bump the version using npm
npm version patch

# Get the current version from package.json using grep and awk
version=$(grep -o '"version": "[^"]*' package.json | awk -F ': "' '{print $2}')


# Add all changes
git add .

# Commit changes
git commit -m "Bumped app version to v$version"

# Push changes to remote repository
git push

# Create a tag with the new version
git tag -a "v$version" -m "Bumped app version to v$version"

# Push the new tag to the remote repository
git push origin "v$version"


# Build using eas-cli-ios
eas build --platform ios --local

# Go two levels up from the current directory
cd ../../../

# Delete package-lock.json if it exists
if [ -f "package-lock.json" ]; then
  rm -f package-lock.json
fi


# run this command in a different terminal window to run the andriod build
# eas build --platform android --local (yarn local-google-store)
 


