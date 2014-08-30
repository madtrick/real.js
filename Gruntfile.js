/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      browserify : {
        files: ['index.html', 'app/**/*', '!**/__tests__/**'],
        tasks: ['browserify'],
        options: {
          livereload: true
        }
      },
      sass: {
        files: 'styles/**/*',
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
    browserify : {
      options:      {
        transform:  [ require('grunt-react').browserify ]
      },
      app: {
        src: 'app/index.react.js',
        dest: 'build/app/index.js'
      }
    },
    connect: {
      server: {
        options: {
          debug: true,
          port: 8001,
          keepalive:true,
          livereload:true
        }
      }
    },
    concurrent: {
      target: ['connect', 'watch'],
      options: {
        logConcurrentOutput: true
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-react');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-concurrent');

  grunt.registerTask('default', ['concurrent:target']);
};
