module.exports = {
    testMatch: ['<rootDir>/src/**/*.test.js', '<rootDir>/src/**/*.test.jsx'],
    transform: {
        '^.+\\.(js|jsx)$': 'babel-jest',
    },
};
