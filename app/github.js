var github = require('octonode');

var githubReleases = {
	fetch: function (user, repo, cb) {
		var client = github.client();

		var repo = client.repo(user + '/' + repo);

		repo.releases(function (err, body, header) {
			if (err) {
				return cb(err);
			}

			if (header.status !== '200 OK') {
				return cb(new Error("Bad response from Github API: "));
			}

			var releases = body.reduce(function (memo, releaseInfo) {
				memo[releaseInfo.name] = releaseInfo.tag_name;
				return memo;
			}, {});

			cb(null, releases, body);
		});
	}
};

module.exports = githubReleases;