module.exports = function(grunt) {

    // project configuration
    grunt.initConfig({
	pkg: grunt.file.readJSON('package.json'),
	watch: {
	    css: {
		files: ['css/main.sass'],
		tasks: ['sass']
	    },
	    js: {
		files: ['linebreak.js'],
		tasks: ['jshint']
	    }
	},
	sass: {    // task
	    dev: {    // target
		files: {
		    'css/main.css': 'css/main.sass' // destination:source
		}
	    }
	},
	jshint: {
	    dev: {
		files: {
		    src: ['linebreak.js']
		}
	    }
	}
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    grunt.registerTask('default', ['sass', 'jshint']);

}; 
