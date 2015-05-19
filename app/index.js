'use strict';
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
module.exports = yeoman.generators.Base.extend({
  options: {
    npm: true
  },
  initializing: function() {
    this.pkg = require('../package.json');
  },
  prompting: function() {
    var done = this.async();
    /**
     * Shows yeoman says his greatings unless the skip option is set
     */
	 this.log(yosay(
      'You\'re using the fantastic generator for scaffolding an application with HTML5 and Gulp!'
    ));
    var prompts = [{
      type: 'input',
      name: 'name',
      message: 'Your project name',
      default : this.appname // Default to current folder name
    }];
    this.prompt(prompts, function(props) {
      this.log(props.name);
      done();
    }.bind(this));
  },
  writing: {
    app: function() {
      var paths = ['package.json', 'bower.json', 'gulpfile.js', '.gitignore'];
      
	  var dirs = ['app/icons', 'app/fonts', 'app/images', 'app/js/vendor', 'app/js/src', 'app/css/vendor', 'app/css/src', ];
	  
      this.fs.copy(this.templatePath('_index.html'), this.destinationPath('app/index.html'));
      for (var i = 0; i < dirs.length; i++) {
        this.mkdir(dirs[i]);
      }
      for (var j = 0; j < paths.length; j++) {
        this.fs.copy(this.templatePath('_' + paths[j]), this.destinationPath(paths[j]));
      }
	  
    }
  },
  install: function() {
    this.installDependencies({
      bower: true,
      npm: true
    });
  }
});