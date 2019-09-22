module.exports = function(config) {
    config.set({
        frameworks: ['mocha', 'chai'],
        files: [
            'transpiledJs/**/*.js',
            'test/**/*.js'
        ],
        reporters: ['progress'],
        port: 9876, // karma web server port
        colors: true,
        logLevel: config.LOG_INFO,
        browsers: ['Firefox'],
        autoWatch: false,
        concurrency: Infinity,
        singleRun: false,
        autoWatch: true,
        customLaunchers: {
            FirefoxHeadless: {
                base: 'Firefox',
                flags: ['-headless'],
            },
        },
    })
}