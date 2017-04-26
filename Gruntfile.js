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
        concat: {
            options: {
                sourceMap: true,
            },
            distJs: {
              src: ['*.js'],
              dest: 'dist/kao_loading.js',
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-concat');

    // Default task(s).
    grunt.registerTask('default', ['sass', 'concat']);
};