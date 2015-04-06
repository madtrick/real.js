/*global module:false*/
module.exports = function(grunt) {
  'use strict';

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      browserify: {
        files: ['index.html', 'app/**/*', '!**/__tests__/**'],
        tasks: ['browserify'],
        options: {
          livereload: true
        }
      },
      sass: {
        files: 'app/styles/**/*',
        tasks: 'sass',
        options: {
          livereload: true
        }
      }
    },
    react: {
      files: {
        expand: true,
        cwd: 'app/',
        src: ['**/*.react.js'],
        dest: 'build/app/components/',
        ext: '.js'
      }
    },
    browserify: {
      options: {
        browserifyOptions: {
          debug: true //enable sourceMaps. Will be appended to the bundle file
        },
        transform: [ require('grunt-react').browserify, 'envify' ]
      },
      app: {
        src: 'app/app.react.js',
        dest: 'build/bundle.js'
      }
    },
    connect: {
      server: {
        options: {
          debug: true,
          port: 8001,
          keepalive: true,
          livereload: true
        }
      }
    },
    concurrent: {
      target: ['connect', 'watch'],
      options: {
        logConcurrentOutput: true
      }
    },
    sass: {
      dev: {
        options: {
          includePaths: ['bower_components/bootstrap-sass-official/assets/stylesheets/']
        },
        files: {
          'build/bundle.css': 'app/styles/index.scss'
        }
      }
    },
    wiredep: {
      target: {
        src: 'index.html',
        exclude: [
          'bower_components/react/react.js',
          'bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/'
        ]
      }
    },
    useminPrepare: {
      html: 'index.html',
      options: {
        dest: 'dist'
      }
    },
    usemin: {
      html: 'dist/index.html'
    },
    copy: {
      dist: {
        files: [
          {expand: false, src: 'index.html', dest: 'dist/index.html'},
          {
            expand: true,
            flatten: true,
            src: 'bower_components/font-awesome/fonts/*',
            dest: 'dist/fonts/'
          }
        ]
      }
    },
    uglify: {
      options: {
        sourceMap: false
      }
    },
    env: {
      dev: {
        NODE_ENV: 'development'
      },
      dist: {
        NODE_ENV: 'production'
      }
    },
    sed: {
      fontAwesome: {
        path: 'dist/real.min.css',
        pattern: '../fonts/fontawesome-webfont',
        replacement: 'fonts/fontawesome-webfont',
        recursive: false
      }
    },
    filerev: {
      files: {
        src: [
          'dist/*.js',
          'dist/*.css'
        ]
      }
    },
    clean: {
      dist: 'dist/'
    },
    eslint: {
      target: 'app/**/*.js'
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-react');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-wiredep');
  grunt.loadNpmTasks('grunt-usemin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-env');
  grunt.loadNpmTasks('grunt-sed');
  grunt.loadNpmTasks('grunt-filerev');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-eslint');

  grunt.registerTask('default', ['env:dev', 'concurrent:target']);

  grunt.registerTask('dist', [
    'clean',
    'env:dist',
    'browserify',
    'copy:dist',
    'useminPrepare',
    'concat:generated',
    'uglify:generated',
    'cssmin:generated',
    'sed',
    'filerev',
    'usemin'
  ]);
};
