// Imports
import ListrDef from 'listr';
import path from 'path';
import unmockedPackageManager from '../utils/package-manager';
import injectRootPackageDef from './inject-root-package';
import tmpDef from 'tmp';
import * as Errors from '../utils/errors';

// Initialize
let getContext: jest.Mock;
let getConfig: jest.Mock;
let printHeader: jest.Mock;
let execa: jest.Mock;

// Mocks
jest.mock('../utils/print-header');
jest.mock('../utils/get-context');
jest.mock('../utils/get-config');
jest.mock('../utils/package-manager');
jest.mock('tmp');
jest.mock('execa');

// Tests
describe('#injectRootPackage()', () => {
	beforeEach(() => {
		// Resetting modules due to doMock
		jest.resetModules();

		// Modules have to be re-required after calls to doMock, or you get a different instance of the module than is used in testing
		printHeader = (require('../utils/print-header') as { default: jest.Mock }).default;
		getContext = (require('../utils/get-context') as { default: jest.Mock }).default;
		getConfig = (require('../utils/get-config') as { default: jest.Mock }).default;
		execa = require('execa') as jest.Mock;
		getContext.mockImplementation(() => ({
			packageFile: {
				name: 'example',
				scripts: {
					compile: '',
				},
			},
		}));
		getConfig.mockImplementation(() => ({
			injectAsDevDependency: false,
			testProjectsDirectory: 'test-projects',
			yarnMutexPort: 31997,
			testInParallel: true,
			compileScriptName: 'compile',
			printSuccessfulOutput: false,
		}));
		const tmp = require('tmp') as jest.Mocked<typeof tmpDef>;

		tmp.dirSync.mockReturnValue({ name: '/example-directory', removeCallback: () => null });

		const packageManager = (require('../utils/package-manager') as {
			default: jest.Mocked<typeof unmockedPackageManager>;
		}).default;

		packageManager.runScript.mockReturnValue(Promise.resolve({ args: [], tool: 'yarn' }));
		packageManager.pack.mockReturnValue(Promise.resolve({ args: [], tool: 'yarn' }));
		packageManager.remove.mockReturnValue(Promise.resolve({ args: [], tool: 'yarn' }));
		packageManager.unlink.mockReturnValue(Promise.resolve({ args: [], tool: 'yarn' }));
		packageManager.add.mockReturnValue(Promise.resolve({ args: [], tool: 'yarn' }));
		packageManager.choosePackageManager.mockReturnValue(Promise.resolve('yarn'));
		packageManager.errorCatcher.mockImplementation(() => {
			throw new Error();
		});
		jest.spyOn(path, 'basename').mockReturnValue('example');
	});

	it('Prints header', async () => {
		execa.mockImplementation(() => Promise.resolve({ stdout: '' }));
		const injectRootPackage = (require('./inject-root-package') as { default: typeof injectRootPackageDef }).default;

		await injectRootPackage(['/example-project']);

		expect(printHeader).toHaveBeenCalledTimes(1);
		expect(printHeader).toHaveBeenCalledWith('Injecting example');
	});

	it('Retrieves the context', async () => {
		execa.mockImplementation(() => Promise.resolve({ stdout: '' }));
		const injectRootPackage = (require('./inject-root-package') as { default: typeof injectRootPackageDef }).default;

		await injectRootPackage(['/example-project']);

		expect(getContext).toHaveBeenCalledTimes(1);
	});

	it('Creates a list of tasks', async () => {
		jest.doMock('listr');
		const Listr = require('listr') as jest.MockedClass<typeof ListrDef>;

		execa.mockImplementation(() => Promise.resolve({ stdout: '' }));

		(Listr.prototype.run as jest.Mock).mockImplementation(() => Promise.resolve());

		const injectRootPackage = (require('./inject-root-package') as { default: typeof injectRootPackageDef }).default;

		await injectRootPackage(['/example-project']);

		expect(Listr).toHaveBeenCalledTimes(1);
		expect(Listr).toHaveBeenCalledWith([
			{
				title: 'Compiling',
				// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
				skip: expect.any(Function),
				// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
				task: expect.any(Function),
			},
			{
				title: 'Packaging',
				// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
				task: expect.any(Function),
			},
			{
				title: 'Removing linked version',
				// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
				task: expect.any(Function),
			},
			{
				title: 'Injecting packaged version',
				// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
				task: expect.any(Function),
			},
		]);

		jest.dontMock('listr');
	});

	it('Runs its tasks', async () => {
		execa.mockImplementation(() => Promise.resolve({ stdout: '' }));

		const injectRootPackage = (require('./inject-root-package') as { default: typeof injectRootPackageDef }).default;

		await expect(injectRootPackage(['/example-project'])).resolves.not.toThrow();
		expect(execa).toHaveBeenCalledTimes(5);
		expect(execa).toHaveBeenCalledWith('yarn', []);
		expect(execa).toHaveBeenCalledWith('yarn', [], { cwd: '/example-project' });
	});

	it('Gracefully handles promise rejections', async () => {
		execa.mockImplementation(() => Promise.reject());

		const { HandledError } = require('../utils/errors') as typeof Errors;
		const injectRootPackage = (require('./inject-root-package') as { default: typeof injectRootPackageDef }).default;

		await expect(injectRootPackage(['/example-project'])).rejects.toThrow(HandledError);
	});

	it('Throws an error on the Packaging step if there is no output from stdout', async () => {
		execa.mockImplementation(() => Promise.resolve());

		const { HandledError } = require('../utils/errors') as typeof Errors;
		const injectRootPackage = (require('./inject-root-package') as { default: typeof injectRootPackageDef }).default;

		await expect(injectRootPackage(['/example-project'])).rejects.toThrow(HandledError);
	});
});
