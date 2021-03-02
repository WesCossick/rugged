// Imports
import execa from 'execa';
import Listr from 'listr';
import path from 'path';
import { FinalResult } from '..';
import { HandledError } from '../utils/errors';
import printHeader from '../utils/print-header';

/** Installs dependencies into the root project and test projects */
export default async function testProjects(testProjectPaths: string[], finalResult: FinalResult) {
	// Print section header
	printHeader('Testing projects');

	// Set up the tasks
	const tasks = new Listr(
		testProjectPaths.map((testProjectPath) => ({
			title: path.basename(testProjectPath),
			task: () =>
				execa('yarn', [`test`], {
					cwd: testProjectPath,
					all: true,
				}).catch((error) => {
					// Add to final result
					finalResult.failedTests.push({
						project: path.basename(testProjectPath),
						output: error.all ?? 'No output...',
					});

					// Throw error that Listr will pick up
					throw new Error('Output will be printed below');
				}),
		})),
		{
			concurrent: true,
			exitOnError: false,
		}
	);

	// Run the tasks, catching any errors
	await tasks.run().catch(() => {
		throw new HandledError();
	});
}