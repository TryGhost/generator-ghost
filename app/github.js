var github 	= require('octonode'),
    Promise	= require('bluebird'),
    client	= github.client();

function getVersions(repoName) {
    var repo = client.repo(repoName),
        tags = Promise.promisify(repo.tags, {context: repo});

	// jshint camelcase:false
    client.requestDefaults.qs = {per_page: 100};
	// jshint camelcase:true

    return tags;
}

function getArchive(repoName) {
    return function () {
        var repo = client.repo(repoName),
            archive = Promise.promisify(repo.archive, {context: repo});

        return archive.apply(repo, arguments);
    };
}

module.exports = {
    ghostVersions: getVersions('TryGhost/Ghost'),
    ghostArchive: getArchive('TryGhost/Ghost'),
    casperVersions: getVersions('TryGhost/Casper'),
    casperArchive: getArchive('TryGhost/Casper')
};
