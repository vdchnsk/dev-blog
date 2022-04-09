const path = require('path')

module.exports = {
    webpack(config) {
        config.resolve.alias = {
            ...config.resolve.alias,
            styles: path.resolve('./src/styles'),
        }

        return config
    },
}
