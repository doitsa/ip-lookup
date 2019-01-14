module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        jasmine: {
            src: 'src/*.js',
            options: {
                specs: 'spec/*-spec.js',
                junit: {
                    path: 'build/jasmine'
                },
                keepRunner: true,
                outfile: 'build/SpecRunner.html'
            }
        },
        jshint: {
            all: ['src/*.js', 'spec/*.js'],
            options: {
                esnext: true
            }
        },
        babel: {
            options: {
                presets: ['@babel/preset-env']
            },
            dist: {
                files: {
                    'dist/<%= pkg.name %>-<%= pkg.version %>.js': 'src/ip-lookup.js'
                }
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= pkg.version %> (<%= grunt.template.today("yyyy-mm-dd") %>) */\n'
            },
            dist: {
                src: 'dist/<%= pkg.name %>-<%= pkg.version %>.js',
                dest: 'dist/<%= pkg.name %>-<%= pkg.version %>.min.js'
            }
        },
    });

    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-babel');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', ['jshint', 'babel', 'jasmine', 'uglify']);
    grunt.registerTask('test', ['jshint', 'babel', 'jasmine']);
};