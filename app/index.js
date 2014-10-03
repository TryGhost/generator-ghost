'use strict';
var util = require('util');
var path = require('path');
var spawn = require('child_process').spawn;
var yeoman = require('yeoman-generator');
var githubReleases = require('./github');
var getCasper = require('./get-casper');


var GhostGenerator = module.exports = function GhostGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({
      skipInstall: options['skip-install'],
      callback: function () {
        this.spawnCommand('grunt', ['default']);
      }.bind(this)
    });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(GhostGenerator, yeoman.generators.Base);

GhostGenerator.prototype.askFor = function askFor() {
  var self = this;
  var cb = this.async();

  // have Yeoman greet the user.
  console.log(this.yeoman);

  // Grab the github releases for Ghost
  githubReleases.fetch('TryGhost', 'Ghost', function (err, releases) {
    // Store the available release map for later.
    self.availableReleases = releases;

    // Store the release names as the choices
    var choices = [];
    for(var key in releases) {
      if (!releases.hasOwnProperty(key)) { continue; }
      choices.push(key);
    }

    var prompts = [{
      type: 'list',
      name: 'version',
      message: 'What version of Ghost do you want to download?',
      choices: choices,
      default: '0.3.3'
    }];

    self.prompt(prompts, function (props) {
      self.version = releases[props.version];
      cb();
    });
  });
};

GhostGenerator.prototype.app = function app() {
  var cb = this.async();
  this.log.writeln('Downloading version ' + this.version + ' of Ghost');
  this.tarball('https://github.com/TryGhost/Ghost/archive/' + this.version + '.tar.gz', '.', cb);
};


GhostGenerator.prototype.casper = function casper() {
  var cb = this.async();
  var self = this;
  
  var casper = path.join('content', 'themes', 'casper');
  
  getCasper(function (tar) {
    self.tarball(tar, casper, cb);
  });
};
