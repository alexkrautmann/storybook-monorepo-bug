const collectCoverage = process.argv.includes('--coverage');

const coverageConfig = {
    collectCoverage: true,
    coverageDirectory: 'dist/coverage',
    collectCoverageFrom: ['**/src/**/*.{ts,tsx}'],
    "coverageThreshold": {
        "**/src/**/*.{ts,tsx}": {
            "branches": 90,
            "functions": 90,
            "lines": 90,
            "statements": 90,
        }
    }
};

module.exports = {
    "projects": [
        // "<rootDir>",
        "<rootDir>/packages/*",
        // "<rootDir>/packages/*",
    ],
    // testPathIgnorePatterns: ["<rootDir>/packages/native-app", "/node_modules/"],
    ...(collectCoverage ? coverageConfig : {}),
};
