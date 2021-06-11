
const path = require('path');

module.exports = {
    entry: path.resolve(__dirname, 'src/main.ts'),
    module: {
        rules: [
                {
                    test: /\.css$/,
                    use: 'css-loader',
                },
                {
                    test: /\.ts$/,
                    use: 'ts-loader',
                },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
};