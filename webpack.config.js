var webpack = require('webpack');

module.exports = {
    entry: [
        './src/index.js'
    ],
    output: {
        path: __dirname,
        publicPath: '/',
        filename: 'bundle.min.js'
    },
    module: {
        loaders:
            [
                {
                    exclude: /node_modules/,
                    loader: 'babel',
                    query: {
                        presets: ['react', 'es2015', 'stage-1'],
                        plugins: ['react-html-attrs', 'transform-class-properties', 'transform-decorators-legacy']
                }
                },
                {
                    test: /\.json$/,
                    loader: 'json'
                },
                {
                    test: /\.scss$/,
                    loader: 'style-loader!css-loader!sass-loader'
                }
            ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    devServer: {
        historyApiFallback: true,
        contentBase: './'
    },
    plugins: [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false })
    ]
};