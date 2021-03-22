import { FinalResult } from '..';

// Initialize
let getConfig: jest.Mock;
let printHeader: jest.Mock;
let execa: jest.Mock;

// Mocks
jest.mock('../utils/print-header');
jest.mock('../utils/get-config');
jest.mock('../utils/package-manager');
jest.mock('execa');

// Tests
describe('#testProjects()', () => {
	beforeEach(() => {
		jest.resetModules();
		printHeader = require('../utils/print-header').default;
		getConfig = require('../utils/get-config').default;
		execa = require('execa');
		execa.mockImplementation(() => Promise.resolve({}));
		getConfig.mockImplementation(() => ({
			injectAsDevDependency: false,
			testProjectsDirectory: 'test-projects',
			yarnMutexPort: 31997,
			testInParallel: true,
			compileScriptName: 'compile',
			printSuccessfulOutput: false,
		}));

		const packageManager = require('../utils/package-manager').default;

		packageManager.runScript.mockReturnValue(Promise.resolve({ args: [], tool: 'yarn' }));
		packageManager.choosePackageManager.mockReturnValue(Promise.resolve('yarn'));
		packageManager.errorCatcher.mockImplementation(() => {
			throw new Error();
		});
	});

	it('Prints header', async () => {
		const testProjects = require('./test-projects').default;

		await testProjects(['/example-project']), { failedTests: [], successfulTests: [], errorEncountered: false };

		expect(printHeader).toHaveBeenCalledTimes(1);
		expect(printHeader).toHaveBeenCalledWith('Testing projects');
	});

	it('Creates a list of tasks', async () => {
		jest.doMock('listr');
		const Listr = require('listr');

		(Listr.prototype.run as jest.Mock).mockImplementation(() => Promise.resolve());

		const testProjects = require('./test-projects').default;

		await testProjects(['/example-project'], { failedTests: [], successfulTests: [], errorEncountered: false });

		expect(Listr).toHaveBeenCalledTimes(1);
		expect(Listr).toHaveBeenCalledWith(
			[
				{
					title: 'example-project',
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

	it("Runs its tasks", async () => {
		const testProjects = require('./test-projects').default;

		const finalResult: FinalResult = { failedTests: [], successfulTests: [], errorEncountered: false };

		await expect(testProjects(['/example-project'], finalResult)).resolves.not.toThrow();
		expect(execa).toHaveBeenCalledTimes(1);
		expect(execa).toHaveBeenCalledWith('yarn', [], { cwd: '/example-project', all: true, reject: false });
		expect(finalResult.successfulTests).toStrictEqual([]);
		expect(finalResult.failedTests).toStrictEqual([]);
	});

	it('Collects successful output based on configuration', async () => {
		getConfig.mockImplementation(() => ({
			injectAsDevDependency: false,
			testProjectsDirectory: 'test-projects',
			yarnMutexPort: 31997,
			testInParallel: true,
			compileScriptName: 'compile',
			printSuccessfulOutput: true,
		}));

		const testProjects = require('./test-projects').default;

		const finalResult: FinalResult = { failedTests: [], successfulTests: [], errorEncountered: false };

		await expect(testProjects(['/example-project'], finalResult)).resolves.not.toThrow();
		expect(finalResult.successfulTests).toStrictEqual([
			{
				project: 'example-project',
				output: 'No output...',
			},
		]);
		expect(finalResult.failedTests).toStrictEqual([]);
	});

	it('Gracefully handles promise rejections, and collects failed test projects with output', async () => {
		execa.mockReturnValue(Promise.resolve({ failed: true, all: 'Example output' }));

		const testProjects = require('./test-projects').default;
		const { HandledError } = require('../utils/errors');

		const finalResult: FinalResult = { failedTests: [], successfulTests: [], errorEncountered: false };

		await expect(testProjects(['/example-project'], finalResult)).rejects.toThrow(HandledError);

		expect(finalResult.failedTests).toStrictEqual([
			{
				project: 'example-project',
				output: 'Example output',
			},
		]);

		expect(finalResult.successfulTests).toStrictEqual([]);
	});
});