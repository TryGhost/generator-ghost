'use strict';
var util = require('util');
var path = require('path');
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

  //this.copy('_package.json', 'package.json');
  //this.copy('_bower.json', 'bower.json');
};

GhostGenerator.prototype.projectfiles = function projectfiles() {
  //this.copy('editorconfig', '.editorconfig');
  //this.copy('jshintrc', '.jshintrc');
};
