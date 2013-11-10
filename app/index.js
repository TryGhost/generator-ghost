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
    type: 'confirm',
    name: 'someOption',
    message: 'Would you like to enable this option?',
    default: true
  }];

  this.prompt(prompts, function (props) {
    this.someOption = props.someOption;

    cb();
  }.bind(this));
};

GhostGenerator.prototype.app = function app() {
  var cb = this.async();
  this.tarball('https://github.com/TryGhost/Ghost/archive/0.3.3.tar.gz', '.', cb);

  //this.copy('_package.json', 'package.json');
  //this.copy('_bower.json', 'bower.json');
};

GhostGenerator.prototype.projectfiles = function projectfiles() {
  //this.copy('editorconfig', '.editorconfig');
  //this.copy('jshintrc', '.jshintrc');
};
