import type {Config} from '@jest/types';

const config: Config.InitialOptions = {
  setupFilesAfterEnv: ["<rootDir>src/setupTests.js"]
};
export default config;
