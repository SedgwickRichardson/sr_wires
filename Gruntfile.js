module.exports = function(grunt) {

    // 1. All configuration goes here 
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        
        shell: {
            jekyllBuild: {
                command: 'bundle exec jekyll build'
            },
            jekyllServe: {
              command: 'bundle exec jekyll serve --baseurl ""'  
            }
        },
        concat: {
            // 2. Configuration for concatinating files goes here.
            dist: {
                src: [
                    'assets/js/source/*.js'
                ],
                dest: 'assets/js/plugins.js'
            }
        },
        uglify: {
            build: {
                src: 'assets/js/plugins.js',
                dest: 'assets/js/plugins.min.js'
            }
        },
        imagemin: {
            options: {
                cache: false,
                optimizationLevel: 0,
                pngquant: true
            },
            dynamic: {
                files: [{
                    expand: true,
                    cwd: 'assets/img/src/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'assets/img/build/'
                }]
            }
        },
        recess: {
          dist: {
            options: {
              compile: true
              //compress: true
            },
            files: {
              'assets/css/build/global.css': [
                'assets/css/src/global.less'
              ]
            }
          }
        },
        watch: {
            files: [ 
                '_layouts/*.html',
                '_includes/*.html',
                '*.html',
                'assets/css/src/*.less',
                'assets/css/src/bootstrap/*.less',
                'assets/js/source/*.js',
                'assets/js/*.js',
            ],
            tasks: [
               // 'concat',
               // 'uglify',
                'recess',
                'shell:jekyllServe'
            ],
            options: {
                spawn: true,
                interrupt: true,
                atBegin: true,
                livereload: true
            }
        }
        // watch: {
        //     options: {
        //         livereload: true
        //     },
        //     scripts: {
        //         files: ['assets/js/source/*.js'],
        //         tasks: ['concat','uglify'],
        //         options: {
        //             spawn: false
        //         }
        //     },
        //     css: {
        //         files: ['assets/css/src/*.scss'],
        //         tasks: ['sass'],
        //         options: {
        //             spawn: false
        //         }
        //     }
        // }

    });

    // 3. Where we tell Grunt we plan to use this plug-in.
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-recess');
    //grunt.loadNpmTasks('grunt-contrib-sass');

    grunt.loadNpmTasks('grunt-shell');

    // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
    grunt.registerTask('default', ['jekyll:serve', 'watch']);

};