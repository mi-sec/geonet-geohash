module.exports = {
	env: {
		es6: true,
		node: true
	},

	extends: 'eslint:recommended',

	parserOptions: {
		ecmaVersion: 2018,
		sourceType: 'module'
	},

	globals: {
		before: true,
		after: true,
		afterEach: true,
		describe: true,
		it: true,
		JSON: true,
		console: true,
		$: true,
		M: true,
		document: true,
		location: true,
		window: true,
		sessionStorage: true,
		localStorage: true,
		Blob: true,
		L: true,
		Materialize: true,
		navigator: true,
		alert: true,
		import: true,
		require: true,
		module: true,
		exports: true,
		fetch: true
	},

	rules: {
		indent: [
			'error',
			'tab',
			{ SwitchCase: 1 }
		],
		'linebreak-style': [ 'error', 'unix' ],
		'max-len': [
			'error',
			{
				code: 120,
				tabWidth: 4,
				ignoreStrings: true,
				ignoreRegExpLiterals: true
			}
		],
		'max-depth': [ 'warn', 5 ],
		'max-lines': [ 'warn', 1500 ],
		'max-params': [ 'warn', 6 ],
		'max-statements': [ 'warn', 30 ],
		'accessor-pairs': 'off',
		'arrow-parens': [ 'error', 'always' ],
		'arrow-spacing': [
			'warn',
			{
				before: true,
				after: true
			}
		],
		'block-spacing': [ 'warn', 'always' ],
		camelcase: 'off',
		'comma-dangle': [ 'warn', 'never' ],
		'comma-spacing': [
			'warn',
			{
				before: false,
				after: true
			}
		],
		'comma-style': [ 'warn', 'last' ],
		'constructor-super': 'warn',
		curly: 'error',
		'template-curly-spacing': [ 'warn', 'always' ],
		'object-curly-spacing': [ 'warn', 'always' ],
		'dot-location': [ 'warn', 'property' ],
		'eol-last': [ 'warn', 'always' ],
		eqeqeq: [ 'warn', 'allow-null' ],
		'generator-star-spacing': [
			'warn',
			{
				before: true,
				after: true
			}
		],
		'handle-callback-err': [ 'warn', '^(err|error)$' ],
		'key-spacing': 'off',
		'keyword-spacing': [
			'warn',
			{
				overrides: {
					catch: { after: true },
					if: { after: true },
					for: { after: true },
					while: { after: true },
					switch: { after: true }
				}
			}
		],
		'new-cap': [
			'warn',
			{
				newIsCap: true,
				capIsNew: false
			}
		],
		'new-parens': 'warn',
		'no-array-constructor': 'warn',
		'no-caller': 'warn',
		'no-case-declarations': 'off',
		'no-class-assign': 'warn',
		'no-cond-assign': 'warn',
		'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		'no-const-assign': 'warn',
		'no-control-regex': 'warn',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		'no-delete-var': 'warn',
		'no-dupe-args': 'warn',
		'no-dupe-class-members': 'warn',
		'no-dupe-keys': 'warn',
		'no-duplicate-case': 'warn',
		'no-duplicate-imports': 'warn',
		'no-empty-character-class': 'warn',
		'no-empty-pattern': 'warn',
		'no-eval': 'warn',
		'no-ex-assign': 'warn',
		'no-extend-native': 'warn',
		'no-extra-bind': 'warn',
		'no-extra-boolean-cast': 'off',
		'no-extra-parens': [ 'warn', 'functions' ],
		'no-fallthrough': 'warn',
		'no-floating-decimal': 'warn',
		'no-func-assign': 'warn',
		'no-implied-eval': 'warn',
		'no-inner-declarations': [ 'warn', 'functions' ],
		'no-trailing-spaces': 'off',
		'no-invalid-regexp': 'warn',
		'no-irregular-whitespace': 'warn',
		'no-iterator': 'warn',
		'no-label-var': 'warn',
		'no-labels': [
			'warn',
			{
				allowLoop: false,
				allowSwitch: false
			}
		],
		'no-lone-blocks': 'warn',
		'no-mixed-spaces-and-tabs': 'warn',
		'no-multi-spaces': 'off',
		'no-multi-str': 'warn',
		'no-multiple-empty-lines': [ 'warn', { max: 4 } ],
		'no-native-reassign': 'warn',
		'no-negated-in-lhs': 'warn',
		'no-new': 'warn',
		'no-new-func': 'warn',
		'no-new-object': 'warn',
		'no-new-require': 'warn',
		'no-new-symbol': 'warn',
		'no-new-wrappers': 'warn',
		'no-obj-calls': 'warn',
		'no-octal': 'warn',
		'no-octal-escape': 'warn',
		'no-path-concat': 'warn',
		'no-proto': 'warn',
		// TODO:: no-prototype-builtins might be a bit dangerous to keep off. Come back to this later.
		'no-prototype-builtins': 0,
		'no-redeclare': 'warn',
		'no-regex-spaces': 'warn',
		'no-return-assign': 'off',
		'no-self-assign': 'warn',
		'no-self-compare': 0,
		'no-sequences': 'off',
		'no-shadow-restricted-names': 'warn',
		'no-spaced-func': 'warn',
		'no-sparse-arrays': 'warn',
		'no-this-before-super': 'warn',
		'no-throw-literal': 'warn',
		'no-undef': 'error',
		'no-undef-init': 'warn',
		'no-unexpected-multiline': 'warn',
		'no-unmodified-loop-condition': 'warn',
		'no-unneeded-ternary': [
			'warn',
			{
				defaultAssignment: false
			}
		],
		'no-unreachable': 'warn',
		'no-unsafe-finally': 'warn',
		'no-unused-vars': [
			'warn',
			{
				vars: 'local',
				args: 'after-used'
			}
		],
		'no-useless-call': 'warn',
		'no-useless-computed-key': 'warn',
		'no-useless-constructor': 'warn',
		'no-useless-escape': 'warn',
		'no-whitespace-before-property': 'warn',
		'no-with': 'warn',
		'one-var': [ 'warn', { var: 'always' } ],
		'operator-linebreak': [
			'warn',
			'after',
			{
				overrides: {
					'?': 'after',
					':': 'after'
				}
			}
		],
		'padded-blocks': 'off',
		'prefer-const': 'warn',
		quotes: [
			'warn',
			'single'
		],
		// TODO: look into this rule. Difficult to use express session with this as an error
		'require-atomic-updates': 'warn',
		'require-jsdoc': [
			0,
			{
				require: {
					FunctionDeclaration: true,
					MethodDefinition: true,
					ClassDeclaration: true
				}
			}
		],
		semi: [ 'error', 'always' ],
		'semi-style': [ 'error', 'last' ],
		'semi-spacing': [
			'warn',
			{
				before: false,
				after: true
			}
		],
		'space-before-blocks': [ 'warn', 'always' ],
		'space-before-function-paren': [ 'warn', {
			anonymous: 'never',
			named: 'never',
			asyncArrow: 'always'
		} ],
		'space-in-parens': [ 'warn', 'always' ],
		'space-infix-ops': 'warn',
		'space-unary-ops': [
			'warn',
			{
				words: true,
				nonwords: false
			}
		],
		'spaced-comment': [
			'warn',
			'always',
			{
				markers: [
					'global',
					'globals',
					'eslint',
					'eslint-disable',
					'*package',
					'!',
					','
				]
			}
		],
		'use-isnan': 'warn',
		'valid-jsdoc': [ 'warn', { requireReturn: false } ],
		'valid-typeof': 'warn',
		'wrap-iife': [ 'warn', 'any' ],
		'yield-star-spacing': [ 'warn', 'both' ],
		yoda: [ 'warn', 'never' ],
		'max-statements-per-line': [ 'warn', { 'max': 2 } ]
	}
};
