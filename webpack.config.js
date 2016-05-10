var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports =
{
    entry: './frontend/src',
    output: {
        path: './frontend/dist',
        filename: 'bundle.js',
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                include: __dirname + '/frontend/src',
                loader: 'babel',
                query: {
                    presets: ['es2015', 'react']
                },
            },
            {
                test: /\.scss/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader')
            },
            {
                test: /\.css/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loaders: [
                    'file?hash=sha512&digest=hex&name=[hash].[ext]',
                    'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
                ]
            }
        ],
    },
    plugins: [
        new ExtractTextPlugin('style.css', {allChunks: true})
    ]
};
