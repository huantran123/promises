/*
 * Write a function WITH NO CALLBACKS that,
 * (1) reads a GitHub username from a `readFilePath`
 *     (the username will be the first line of the file)
 * (2) then, sends a request to the GitHub API for the user's profile
 * (3) then, writes the JSON response of the API to `writeFilePath`
 *
 * HINT: We exported some similar promise-returning functions in previous exercises
 */

var fs = require('fs');
var Promise = require('bluebird');
var request = require('needle');
var get = require('./promiseConstructor.js');
var githubProfile = require('./promisification.js');

var writeFileAsync = (filePath, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, data, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

var fetchProfileAndWriteToFile = function(readFilePath, writeFilePath) {
  return get.pluckFirstLineFromFileAsync(readFilePath)
    .then((user) => {
      return user;
    })
    .then((user) => {
      return githubProfile.getGitHubProfileAsync(user);
    })
    .then((userProfile) => {
      var data = JSON.stringify(userProfile);
      return writeFileAsync(writeFilePath, data);
    });
};



// Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};
