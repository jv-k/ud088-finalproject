const autoprefixer = require('autoprefixer');
const path = require('path');

var rootAssetPath = './assets';

module.exports = [{
    mode: 'development',
    entry: [
        rootAssetPath + '/app.scss',
        rootAssetPath + '/app.js'
    ],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    module: {
        rules: [{
            test: /\.scss$/,
            use: [{
                    loader: 'file-loader',
                    options: {
                        path: path.resolve(__dirname, 'dist'),
                        name: 'bundle.css'
                    },
                },
                {
                    loader: 'extract-loader'
                },
                {
                    loader: 'css-loader'
                },
                {
                    loader: 'postcss-loader',
                    options: {
                        postcssOptions: {
                            plugins: [
                                autoprefixer()
                            ]
                        }
                    }
                },
                {
                    loader: 'sass-loader',
                    options: {
                        // Prefer Dart Sass
                        implementation: require('sass'),
                        // See https://github.com/webpack-contrib/sass-loader/issues/804
                        webpackImporter: false,

                        sassOptions: {
                            includePaths: ['./node_modules']
                        },
                    },
                },
            ],
        },
        {
            test: /\.js$/,
            loader: 'babel-loader',
            options: {
                presets: ['@babel/preset-env'],
            },
        }]
    },
}];

/*
  var path = require('path');

var ExtractTextPlugin = require('extract-text-webpack-plugin');
var ManifestRevisionPlugin = require('manifest-revision-webpack-plugin');


module.exports = {
    entry: {
        app_js: [
            rootAssetPath + '/js/entry.js'
        ],
        app_css: [
            rootAssetPath + '/styles/main.css'
        ]
    },
    output: {
        path: './build/public',
        publicPath: 'http://localhost:5000/assets/',
        filename: '[name].[chunkhash].js',
        chunkFilename: '[id].[chunkhash].js'
    },
    resolve: {
        extensions: ['', '.js', '.css']
    },
    module: {
        loaders: [
            {
                test: /\.js$/i, 
                loader: 'script-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/i,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
            },
            {
                test: /\.(jpe?g|png|gif|svg([\?]?.*))$/i,
                loaders: [
                    'file?context=' + rootAssetPath + '&name=[path][name].[hash].[ext]',
                    'image?bypassOnDebug&optimizationLevel=7&interlaced=false'
                ]
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('[name].[chunkhash].css'),
        new ManifestRevisionPlugin(path.join('build', 'manifest.json'), {
            rootAssetPath: rootAssetPath,
            ignorePaths: ['/styles', '/scripts']
        })
    ]
};
*/