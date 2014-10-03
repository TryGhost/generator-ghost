var githubReleases = require('./github');

module.exports = function (cb) {
  githubReleases.fetch('TryGhost', 'Casper', function (err, releases, body) {
    var tar = 'https://github.com/TryGhost/Casper/archive/' + body[0].tag_name + '.tar.gz'
    cb(tar);
  });
};