module.exports = {
	// 런타임 환경 정의 : node, browser 모두
	env: {
		browser: true,
		es2021: true,
		node: true,
	},
	// react 기본 config + prettier
	extends: ['eslint:recommended', 'plugin:react/recommended', 'prettier'],
	overrides: [],
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	// react 기본 plugin
	plugins: ['import', 'react'],
	rules: {
		'react/jsx-uses-react': 'off',
		'react/react-in-jsx-scope': 'off',
		'react/prop-types': 'off',
	},
};
