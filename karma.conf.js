module.exports = function(config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',

        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine', 'browserify'],

        // list of files / patterns to load in the browser
        files: [
          'bower_components/taggle.js/dist/taggle.min.js',
          'app/ext/backbone.js', //<- Load backbone extensions and tweaks
          'jasmine-helpers.js', //<- custom jasmine helpers
          'app/**/__tests__/*.js'
        ],

        // list of files to exclude
        exclude: [],

        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
          'jasmine-helpers.js': ['browserify'],
          'app/ext/backbone.js': ['browserify'],
          'app/**/__tests__/*': ['browserify']
        },
        browserify: {
            debug: true,
            transform: [ 'reactify' , 'envify', 'rewireify']
        },
        reporters: ['progress'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_DEBUG,
        //logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['Chrome'],
        singleRun: false
    });
};

