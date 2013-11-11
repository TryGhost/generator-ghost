'use strict';
var util = require('util');
var path = require('path');
var spawn = require('child_process').spawn;
var yeoman = require('yeoman-generator');


var GhostGenerator = module.exports = function GhostGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(GhostGenerator, yeoman.generators.Base);

GhostGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // have Yeoman greet the user.
  console.log(this.yeoman);

  var prompts = [{
    type: 'input',
    name: 'version',
    message: 'What version of Ghost do you want to download?',
    default: '0.3.3'
  }];

  this.prompt(prompts, function (props) {
    this.version = props.version;
    cb();
  }.bind(this));
};

GhostGenerator.prototype.app = function app() {
  var cb = this.async();
  this.log.writeln('Downloading version' + this.version + 'of Ghost');
  this.tarball('https://github.com/TryGhost/Ghost/archive/' + this.version + '.tar.gz', '.', cb);
};

GhostGenerator.prototype.casper = function casper() {
  var cb = this.async();
  var casper = path.join('content', 'themes', 'casper');
  this.tarball('https://github.com/TryGhost/Casper/archive/0.9.1.tar.gz', casper, cb);
};