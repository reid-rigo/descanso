module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),

      concat: {
          options: {
          },
          dist: {
              src: ['src/before.js',
                    'src/utils.js',
                    'src/ajax.js',
                    'src/crud.js',
                    'src/mixins.js',
                    'src/collection.js',
                    'src/model.js',
                    'src/after.js'],
              dest: 'descanso.concat.js',
          },
        },

        uglify: {
            options: {
                mangle: false,
                beautify: true,
                preserveComments: 'all',
                compress: {
                  sequences: false
                }
            },
            dist: {
                files: {
                    'descanso.concat.js': ['descanso.js']
                }
            }
        },

        karma: {
            options: {
                browsers: ['PhantomJS'],
                frameworks: ['mocha'],
                files: ['lib/jquery.js',
                        'descanso.js',
                        'test/mocha.js',
                        'test/chai.js',
                        'test/sinon-chai.js',
                        'test/sinon.js',
                        'test/pre.js',
                        'test/**/*.js'],
                autoWatch: true
            },
            watch: {},
            test: {
                singleRun: true
            }
        },

        watch: {
            src: {
                files: ['src/*.js'],
                tasks: ['default']
            }
        },

        jshint: {
            src: ['descanso.concat.js']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-karma');

    grunt.registerTask('default', ['concat', 'uglify']);
    grunt.registerTask('test', 'karma:test');
    grunt.registerTask('hint', ['concat', 'jshint']);
};