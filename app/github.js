var github = require('octonode');

var githubReleases = {
	fetch: function (user, repo, cb) {
		var client = github.client();

		var repo = client.repo(user + '/' + repo);

		repo.releases(function (err, status, body) {
			if (err) {
				return cb(err);
			}

			if (status !== 200) {
				return cb(new Error("Bad response from Github API: "));
			}

			var releases = body.reduce(function (memo, releaseInfo) {
				memo[releaseInfo.name] = releaseInfo;
			}, {});

			cb(null, releases);
		});
	}
};

module.exports = githubReleases;