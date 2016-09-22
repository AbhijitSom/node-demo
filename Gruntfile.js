module.exports = function(grunt) {

    grunt.initConfig({


        watch: {
            dist: {
                files: {
                    'server.min.js': ['server.js']
                }
            }
        }
    });
	
    // Load the plugins
   // grunt.loadNpmTasks('grunt-contrib-cssmin');
    //grunt.loadNpmTasks('grunt-contrib-uglify');

    // Do the tasks
   grunt.registerTask('default', 'watch');
	grunt.loadNpmTasks('grunt-contrib-watch');
}
