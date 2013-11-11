'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var fs = require('fs-extra');

var ThemeCopyCasperGenerator = module.exports = function ThemeCopyCasperGenerator(args, options, config) {
  yeoman.generators.NamedBase.apply(this, arguments);
  var cb = this.async();
  var self = this;

  var casper = path.join(process.cwd(), 'content', 'themes', 'casper');
  var theme = path.join(process.cwd(), 'content', 'themes', this.name);

  fs.copy(casper, theme, function(err){
    if (err) return err;
    console.log('You copied Casper to themes/' + self.name);
  });
};

util.inherits(ThemeCopyCasperGenerator, yeoman.generators.NamedBase);
