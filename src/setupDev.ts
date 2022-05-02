import type { Application } from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from '@gatsbyjs/webpack-hot-middleware';
import webpackConfig from '../webpack.config';

export default function setupDev(app: Application) {
	const compiler = webpack(webpackConfig as webpack.Configuration);
	app.use(
		webpackDevMiddleware(compiler, {
			writeToDisk: true,
			publicPath: webpackConfig.output.publicPath,
		})
	);

	app.use(
		//  `webpack-hot-middleware` currently does not work reliably with Webpack 5:
		//  Ref: https://github.com/webpack-contrib/webpack-hot-middleware/pull/397
		webpackHotMiddleware(compiler, {
			log: false,
			path: `/__webpack_hmr`,
			heartbeat: 10 * 1000,
		})
	);
}
