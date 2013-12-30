module.exports= (grunt) ->
    grunt.initConfig
        pkg: grunt.file.readJSON 'package.json'

        copy:
            angular:
                files: [{
                    expand: true
                    cwd: '<%= pkg.build.angular.source %>'
                    src: ['**/*', '!**/*.json', '!**/*.md']
                    dest: '<%= pkg.build.angular.target %>'
                }, {
                    expand: true
                    cwd: '<%= pkg.build.angularAnimate.source %>'
                    src: ['**/*', '!**/*.json', '!**/*.md']
                    dest: '<%= pkg.build.angular.target %>'
                }, {
                    expand: true
                    cwd: '<%= pkg.build.angularResource.source %>'
                    src: ['**/*', '!**/*.json', '!**/*.md']
                    dest: '<%= pkg.build.angular.target %>'
                }, {
                    expand: true
                    cwd: '<%= pkg.build.angularRoute.source %>'
                    src: ['**/*', '!**/*.json', '!**/*.md']
                    dest: '<%= pkg.build.angular.target %>'
                }, {
                    expand: true
                    cwd: '<%= pkg.build.angularLocale.source %>'
                    src: ['**/*', '!**/*.json', '!**/*.md']
                    dest: '<%= pkg.build.angular.target %>'
                }]
            bootstrap:
                files: [{
                    expand: true
                    cwd: '<%= pkg.build.bootstrap.source %>/js'
                    src: ['*.js']
                    dest: '<%= pkg.build.bootstrap.target %>'
                }]
            font:
                files: [{
                    expand: true
                    cwd: '<%= pkg.build.font.source %>'
                    src: ['**/*']
                    dest: '<%= pkg.build.font.target %>'
                }]
            jquery:
                files: [{
                    expand: true
                    cwd: '<%= pkg.build.jquery.source %>'
                    src: ['*.js']
                    dest: '<%= pkg.build.jquery.target %>'
                }]

        coffee:
            awesome:
                files: [{
                    expand: true
                    cwd: '<%= pkg.build.awesome.js.source %>'
                    src: ['**/*.coffee']
                    dest: '<%= pkg.build.awesome.js.target %>'
                    ext: '.js'
                }]

        jade:
            awesome:
                options:
                    data:
                        debug: false
                files: [{
                    expand: true
                    cwd: '<%= pkg.build.awesome.docs.source %>'
                    src: ['**/*.jade', '!**/layout.jade', '!**/mixin.jade']
                    dest: '<%= pkg.build.awesome.docs.target %>'
                    ext: '.html'
                },{
                    expand: true
                    cwd: '<%= pkg.build.awesome.templates.source %>'
                    src: ['**/*.jade', '!**/layout.jade', '!**/mixin.jade']
                    dest: '<%= pkg.build.awesome.templates.target %>'
                    ext: '.html'
                }]

        less:
            awesome:
                files: [{
                    expand: true
                    cwd: '<%= pkg.build.awesome.css.source %>'
                    src: '*.less'
                    dest: '<%= pkg.build.awesome.css.target %>'
                    ext: '.css'
                }]

        watch:
            coffee:
                files: ['**/*.coffee']
                tasks: ['coffee', 'jade']
            jade:
                files: ['**/*.jade']
                tasks: ['jade']
            less:
                files: ['**/*.less']
                tasks: ['less']

    grunt.loadNpmTasks 'grunt-contrib-clean'
    grunt.loadNpmTasks 'grunt-contrib-watch'

    grunt.loadNpmTasks 'grunt-contrib-coffee'
    grunt.loadNpmTasks 'grunt-contrib-copy'
    grunt.loadNpmTasks 'grunt-contrib-jade'
    grunt.loadNpmTasks 'grunt-contrib-less'

    grunt.registerTask 'default', ['copy', 'coffee', 'jade', 'less']
    grunt.registerTask 'dev', ['default', 'watch']
