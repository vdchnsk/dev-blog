const path = require('path')

module.exports = {
    trailingSlash: false,
    distDir: 'build',

    webpack(config) {
        config.resolve.alias = {
            ...config.resolve.alias,
            '@styles': path.resolve('./src/styles'),
            '@components': path.resolve('./src/components'),
        }

        return config
    },
}
