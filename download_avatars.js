var request = require('request');

console.log('Welcome to GitHub Avatar Downloader!');

function getRepoContributors(reboOwner, repoName, cb) {

}

getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  console.log("Result:", result);
});