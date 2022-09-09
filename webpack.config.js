module.exports = {
	entry: {
		app: './src/ts/main.ts',
	},
	output: {
		path: `/dist/ts/`,
		filename: 'main.js',
	},
	resolve: {
		extensions: ['*', '.webpack.js', '.web.js', '.ts', '.tsx', '.js'],
		fallback: {
			require: false,
			fs: false,
			tls: false,
			net: false,
			path: false,
			zlib: false,
			http: false,
			https: false,
			stream: false,
			crypto: false,
		},
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				exclude: /node_modules/,
				loader: 'ts-loader',
			},
		],
	},
};
