import path from 'path';
import { Config } from './src';

const config: Config = {
	injectAsDevDependency: true,
	yarnMutexFilePath: path.join(process.cwd(), 'tmp', '.mutex'),
};

export default config;
