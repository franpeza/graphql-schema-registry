import { Config, ExpressContext } from 'apollo-server-express';
import { listFsMocks } from './listFsMocks';

type LoadFsGraphQlMocks = Pick<Required<Config<ExpressContext>>, 'resolvers'>;

export async function loadFsGraphQlMocks(): Promise<LoadFsGraphQlMocks> {
	const mocks = await listFsMocks('graphQLMock', 'json|ts');
	const roots = {} as Config<ExpressContext>['resolvers'];

	// Resolvers
	await Promise.all(
		mocks.map(async (filePath: string) => {
			const mock = (await import(filePath)).default;
			const [schemaKey] = Object.keys(mock);

			if (/ts$/.test(filePath)) {
				roots[schemaKey] = mock[schemaKey];
			} else if (/json$/.test(filePath)) {
				roots[schemaKey] = () => mock[schemaKey];
			}
		})
	);

	return {
		resolvers: { Query: roots },
	};
}
