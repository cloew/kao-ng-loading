module.exports = function(grunt) {
    // Project configuration.
    grunt.initConfig({
        sass: {
            compile: {
                files: [{
                    expand: true,
                    src: ['*.scss'],
                    dest: 'dist/',
                    ext: '.css'
                }]
            }
        },
        spider_script: {
            options: {
                sourcemap: false
            },
            compile: {
                files: [{
                    expand: true,
                    src: ['*.spider'],
                    dest: 'dist/',
                    ext: '.js'
                }]
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-spider-script');

    // Default task(s).
    grunt.registerTask('default', ['sass', 'spider_script']);
};