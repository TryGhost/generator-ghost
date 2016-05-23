var _               = require('lodash');
var generators      = require('yeoman-generator');
var pkg             = require('../package');
var githubUtils     = require('./github');
var semver          = require('semver');
var Promise         = require('bluebird');

module.exports = generators.Base.extend({
    constructor: function () {
        generators.Base.apply(this, arguments);

        this.option('version', {
            desc: 'Version of Ghost to install',
            type: 'string',
            alias: 'v'
        });

        // @TODO: re-enable this when support for the production option is
        // added
        // this.option('production', {
        //     desc: 'Whether or not the production install of Ghost should be used (zip file vs. Github repo)',
        //     type: 'string',
        //     alias: 'prod',
        //     default: false
        // });

        this.option('casperVersion', {
            desc: 'Version of Casper to install',
            type: 'string',
            alias: 'cv',
            default: 'latest'
        });
    },

    initializing: function () {
        var self = this;

        this.properties = _.pick(this.options, ['version', 'casperVersion']);

        this.log('Yeoman Ghost Generator v' + pkg.version);

        return Promise.props({
            ghostVersions: githubUtils.ghostVersions(),
            casperVersions: githubUtils.casperVersions()
        }).then(function (results) {
            self.ghostReleases = _.filter(_.map(results.ghostVersions, 'name'), function (val) {
                return semver.valid(val);
            });

            self.casperReleases = _.filter(_.map(results.casperVersions, 'name'), function (val) {
                return semver.valid(val);
            });
        });
    },

    prompting: function () {
        var version = this.properties.version,
            casperVersion = this.properties.casperVersion,
            self = this,
            prompts = [];

        if (!version || (['latest', 'master', 'stable'].indexOf(version) === -1 && this.ghostReleases.indexOf(version) === -1)) {
            prompts.push({
                type: 'list',
                name: 'version',
                message: 'Version to install',
                choices: this.ghostReleases,
                default: this.ghostReleases[0]
            });
        }

        if (!casperVersion || (['latest', 'master', 'stable'].indexOf(casperVersion) === -1 && this.casperReleases.indexOf(casperVersion) === -1)) {
            prompts.push({
                type: 'list',
                name: 'casperVersion',
                message: 'Casper version to install',
                choices: this.casperReleases,
                default: this.casperReleases[0]
            });
        }

        return this.prompt(prompts).then(function (answers) {
            _.assign(self.properties, answers);
        });
    },

    writing: function () {
        var extract = Promise.promisify(this.extract, {context: this}),
            self = this;

        if (this.properties.version === 'latest') {
            this.properties.version = this.ghostReleases[0];
        }

        if (this.properties.casperVersion === 'latest') {
            this.properties.casperVersion = this.casperReleases[0];
        }

        this.log('Downloading and extracting Ghost and Casper...');

        return githubUtils.ghostArchive('tarball', this.properties.version).then(function (url) {
            return extract(url, self.destinationRoot(), {strip: 1});
        }).then(function () {
            return githubUtils.casperArchive('tarball', self.properties.casperVersion);
        }).then(function (casperUrl) {
            return extract(casperUrl, self.destinationPath('content', 'themes', 'casper'), {strip: 1});
        });
    },

    install: function () {
        var self = this;

        this.spawnCommandSync('git', ['init']);

        this.npmInstall('', function () {
            self.spawnCommand('grunt', ['init']);
        });
    }
});
