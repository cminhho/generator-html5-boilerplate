'use strict';
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
module.exports = yeoman.generators.Base.extend({
  options: {
    npm: false
  },
  initializing: function() {
    this.pkg = require('../package.json');
  },
  prompting: function() {
    var done = this.async();
    /**
     * Shows yeoman says his greatings unless the skip option is set
     */
    this.log(yosay(chalk.red('Welcome!') + '\n' + chalk.yellow('You\'re using the fantastic generator for scaffolding an application with HTML5 and Gulp!')));
    var prompts = [{
      type: 'confirm',
      name: 'npm',
      message: 'Would you like to skip install NPM dependencies?',
      default: true
    }];
    this.prompt(prompts, function(props) {
      this.options.npm = props.npm;
      done();
    }.bind(this));
  },
  writing: {
    app: function() {
      var paths = ['package.json', 'bower.json', 'gulpfile.js', '.gitignore'];
      var libPaths = ['../bower_components/bootstrap/dist/css/bootstrap.min.css'];
      
	  var dirs = ['app/icons', 'app/fonts', 'app/images', 'app/js/vendor', 'app/js/src', 'app/css/vendor', 'app/css/src', ];
	  var libDirs = ['app/css/vendor'];
	  
      this.fs.copy(this.templatePath('_index.html'), this.destinationPath('app/index.html'));
      for (var i = 0; i < dirs.length; i++) {
        this.mkdir(dirs[i]);
      }
      for (var j = 0; j < paths.length; j++) {
        this.fs.copy(this.templatePath('_' + paths[j]), this.destinationPath(paths[j]));
      }
	  
	  for (var y = 0; y < paths.length; y++) {
        this.fs.copy(this.templatePath('_' + libPaths[y]), this.destinationPath(libDirs[y]));
      }
    }
  },
  install: function() {
    this.installDependencies({
      bower: true,
      npm: !this.options.npm
    });
  }
});