import type { Config } from 'jest';

const config: Config = {
    preset: 'jest-expo',
    setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
    testEnvironment: 'node',
}

export default config;