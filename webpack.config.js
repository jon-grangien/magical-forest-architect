const webpack = require('webpack');
const path = require('path');
const ROOT_PATH = path.resolve(__dirname);

module.exports = {
	devtool: 'source-map',
	entry: [
		'webpack-hot-middleware/client',
    './src/main.tsx'
  ],
	resolve: {
		extensions: ['.js', '.ts', '.tsx', 'css', 'scss']
	},
  output: {
    path: path.join(ROOT_PATH, 'public'),
    filename: 'bundle.js',
    publicPath: path.join(ROOT_PATH, 'public')
  },
  devServer: {
    publicPath: '/public',
    contentBase: path.join(ROOT_PATH, "public"),
    compress: true,
    hot: true,
    port: 1337
  },
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'GOOGLE_WEB_FONTS': JSON.stringify([ // Add or remove entries in this array to change which fonts are loaded
        'Anonymous Pro',
        'Roboto'
      ])
    })
	],
	module: {
		loaders: [
      { 
        test: /\.ts$/, 
        enforce: 'pre', 
        loader: 'tslint-loader' 
      },
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				query: {
					presets: [ 'es2015' ]
				}
			},
      { 
        test: /\.ts|\.tsx$/,
        loader: 'ts-loader', 
        exclude: '/node_modules/' 
      },
      { test: /\.(glsl|frag|vert)$/, loader: 'raw-loader', exclude: /node_modules/ },
      { test: /\.(glsl|frag|vert)$/, loader: 'glslify-loader', exclude: /node_modules/ },
      // {
      //   test: /\.glsl$/,
      //   loader: 'webpack-glsl'
      // },
			{
				test: /(\.scss|\.css)$/,
				loader: 'style-loader!css-loader?sourceMap&modules&importLoaders=1&localIdentName=[name]-[local]___[hash:base64:5]!sass-loader?sourceMap'
			}
		]
  }
};
