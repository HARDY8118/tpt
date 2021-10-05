const path = require('path');

module.exports = {
    entry: './src/tpt.ts',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.ts'],
    },
    output: {
        filename: 'tpt.js',
        path: path.resolve(__dirname),
    },
};
