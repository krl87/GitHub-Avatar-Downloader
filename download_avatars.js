//importing modules to get access to files/functions/data
var request = require("request");
var gitHubToken = require("./secrets.js");
var fs = require("fs");
var args = process.argv.slice(2);

console.log("Welcome to GitHub Avatar Downloader!");
//set error handling if user doesn't specify both arguments
if (!args[0]) {
  console.log("ERROR!!! Please enter a username and repo URL");
} else {
  // implents request to fetch list of contributors for the given repo
  function getRepoContributors(repoOwner, repoName, cb) {
    var options = {
      url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
      headers: {
        "User-Agent": "request",
        "Authorization": "token" + gitHubToken
      }
    };
    // get page information
    request(options, function(err, res, body){
      cb(err, body);
    });
  }

  // get request to download images
  function downloadImageByURL(url, filePath) {
    request.get(url)
    .pipe(fs.createWriteStream(filePath));
  }

  // invokes function above using callback
  getRepoContributors(args[0], args[1], function(err, result) {
    console.log("Errors:", err);
    var data = JSON.parse(result);
    //loops through array and retrieves avatar link
    for (var i = 0; i < data.length; i++) {
      console.log(data[i].avatar_url);
      downloadImageByURL(data[i].avatar_url, "avatars/" + data[i].login + ".jpg");
    }
  });
}






