// Imports
import path from 'path';

// Initialize
let getContext: jest.Mock;
let printHeader: jest.Mock;
let execa: jest.Mock;

// Mocks
jest.mock('../utils/print-header');
jest.mock('../utils/get-context');
jest.mock('../utils/package-manager');
jest.mock('execa');

// Tests
describe('#installDependencies()', () => {
	beforeEach(() => {
		jest.resetModules();
		printHeader = require('../utils/print-header').default;
		getContext = require('../utils/get-context').default;
		execa = require('execa');
		getContext.mockImplementation(() => ({
			packageFile: {
				name: 'example',
			},
		}));

		const packageManager = require('../utils/package-manager').default;

		packageManager.installDependencies.mockReturnValue(Promise.resolve({ args: [], tool: 'yarn' }));
		packageManager.choosePackageManager.mockReturnValue(Promise.resolve('yarn'));
		packageManager.errorCatcher.mockImplementation(() => {
			throw new Error();
		});
		jest.spyOn(path, 'basename').mockReturnValue('example');
	});

	it('Prints header', async () => {
		execa.mockImplementation(() => Promise.resolve());
		const installDependencies = require('./install-dependencies').default;

		await installDependencies(['/example-project']);

		expect(printHeader).toHaveBeenCalledTimes(1);
		expect(printHeader).toHaveBeenCalledWith('Installing dependencies');
	});

	it('Retrieves the context', async () => {
		execa.mockImplementation(() => Promise.resolve());
		const installDependencies = require('./install-dependencies').default;

		await installDependencies(['/example-project']);

		expect(getContext).toHaveBeenCalledTimes(1);
	});

	it('Creates a list of tasks', async () => {
		jest.doMock('listr');
		const Listr = require('listr');

		execa.mockImplementation(() => Promise.resolve());

		(Listr.prototype.run as jest.Mock).mockImplementation(() => Promise.resolve());

		const installDependencies = require('./install-dependencies').default;

		await installDependencies(['/example-project']);

		expect(Listr).toHaveBeenCalledTimes(1);
		expect(Listr).toHaveBeenCalledWith(
			[
				{
					title: 'example',
					task: expect.any(Function),
				},
				{
					title: 'Project: example',
					task: expect.any(Function),
				},
			],
			{
				concurrent: true,
				exitOnError: false,
			}
		);

		jest.dontMock('listr');
	});

	it("Runs it's tasks", async () => {
		execa.mockImplementation(() => Promise.resolve());

		const installDependencies = require('./install-dependencies').default;

		await expect(installDependencies(['/example-project'])).resolves.not.toThrow();
		expect(execa).toHaveBeenCalledTimes(2);
		expect(execa).toHaveBeenCalledWith('yarn', []);
		expect(execa).toHaveBeenCalledWith('yarn', [], { cwd: '/example-project' });
	});

	it('Gracefully handles promise rejections', async () => {
		execa.mockImplementation(() => Promise.reject());

		const { HandledError } = require('../utils/errors');
		const installDependencies = require('./install-dependencies').default;

		await expect(installDependencies(['/example-project'])).rejects.toThrow(HandledError);
	});
});