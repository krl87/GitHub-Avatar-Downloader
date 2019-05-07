var request = require("request");
var gitHubToken = require("./secrets.js");
var fs = require("fs");

console.log("Welcome to GitHub Avatar Downloader!");

// implents request to fetch list of contributors for the given repo
function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      "User-Agent": "request",
      "Authorization": "token" + gitHubToken
    }
  };
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
getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  var data = JSON.parse(result);
  for (var i = 0; i < data.length; i++) {
    console.log(data[i].avatar_url);
  }
});

downloadImageByURL("https://avatars2.githubusercontent.com/u/2741?v=3&s=466", "avatars/kvirani.jpg");





