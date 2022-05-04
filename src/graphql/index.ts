import { ApolloServer } from 'apollo-server-express';
import { getServerProps } from './server';

const initServer = async (app) => {
	const props = getServerProps();

	const server = new ApolloServer(props);

	await server.start();
	server.applyMiddleware({ app });
};

export default initServer;
