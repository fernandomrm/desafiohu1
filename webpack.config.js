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
            }
        ],
    }
};
