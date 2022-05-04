import { Config, ExpressContext } from 'apollo-server-express';

import typeDefs from './schema';
import resolvers from './resolvers';
import dataloader from './dataloader';

export const getServerProps = () =>
	({
		typeDefs,
		resolvers,
		context: () => ({
			dataloaders: dataloader(),
		}),
	} as Config<ExpressContext>);
