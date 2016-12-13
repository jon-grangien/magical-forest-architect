const webpack = require('webpack');

module.exports = {
	devtool: 'source-map',
	entry: [
		'webpack-hot-middleware/client',
		'babel-polyfill',
    './src/main.js'
  ],
  output: {
    path: './public/',
    filename: 'bundle.js',
		publicPath: '/public/'
  },
	plugins: [
		//new webpack.optimize.UglifyJsPlugin({minimize: true}),
		new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
	],
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				query: {
					presets: [ 'es2015', 'stage-0' ]
				}
			},
			{
				test: /(\.scss|\.css)$/,
				loader: 'style-loader!css-loader?sourceMap&modules&importLoaders=1&localIdentName=[name]-[local]___[hash:base64:5]!sass-loader?sourceMap'
			},
		]
  }
};
