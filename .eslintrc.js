module.exports = {
	env: {
		es6: true,
		node: true
	},
	extends: 'eslint:recommended',
	parserOptions: {
		ecmaVersion: 2017,
		ecmaFeatures: {
			experimentalObjectRestSpread: true
		},
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
		Blob: true
	},
	rules: {
		indent: [
			2,
			'tab',
			{ SwitchCase: 1 }
		],
		'linebreak-style': [ 2, 'unix' ],
		'max-len': [
			2,
			{
				code: 120,
				tabWidth: 4,
				ignoreStrings: true,
				ignoreRegExpLiterals: true
			}
		],
		'max-depth': [ 1, 5 ],
		'max-lines': [ 1, 1500 ],
		'max-params': [ 1, 6 ],
		'max-statements': [ 1, 30 ],
		'accessor-pairs': 'off',
		'arrow-spacing': [
			1,
			{
				before: true,
				after: true
			}
		],
		'block-spacing': [ 1, 'always' ],
		'brace-style': 'off',
		camelcase: 'off',
		'comma-dangle': [ 1, 'never' ],
		'comma-spacing': [
			1,
			{
				'before': false,
				'after': true
			}
		],
		'comma-style': [ 1, 'last' ],
		'constructor-super': 1,
		curly: 2,
		'template-curly-spacing': [ 1, 'always' ],
		'object-curly-spacing': [ 1, 'always' ],
		'dot-location': [ 1, 'property' ],
		'eol-last': 1,
		eqeqeq: [ 1, 'allow-null' ],
		'generator-star-spacing': [
			1,
			{
				'before': true,
				'after': true
			}
		],
		'handle-callback-err': [ 1, '^(err|error)$' ],
		'key-spacing': 'off',
		'keyword-spacing': [
			1,
			{
				overrides: {
					catch: { after: false },
					if: { after: false },
					for: { after: false },
					while: { after: false },
					switch: { after: false }
				}
			}
		],
		'new-cap': [
			1,
			{
				newIsCap: true,
				capIsNew: false
			}
		],
		'new-parens': 1,
		'no-array-constructor': 1,
		'no-caller': 1,
		'no-case-declarations': 'off',
		'no-class-assign': 1,
		'no-cond-assign': 1,
		'no-console': 'off',
		'no-const-assign': 1,
		'no-control-regex': 1,
		'no-debugger': 1,
		'no-delete-var': 1,
		'no-dupe-args': 1,
		'no-dupe-class-members': 1,
		'no-dupe-keys': 1,
		'no-duplicate-case': 1,
		'no-duplicate-imports': 1,
		'no-empty-character-class': 1,
		'no-empty-pattern': 1,
		'no-eval': 1,
		'no-ex-assign': 1,
		'no-extend-native': 1,
		'no-extra-bind': 1,
		'no-extra-boolean-cast': 'off',
		'no-extra-parens': [ 1, 'functions' ],
		'no-fallthrough': 1,
		'no-floating-decimal': 1,
		'no-func-assign': 1,
		'no-implied-eval': 1,
		'no-inner-declarations': [ 1, 'functions' ],
		'no-trailing-spaces': 'off',
		'no-invalid-regexp': 1,
		'no-irregular-whitespace': 1,
		'no-iterator': 1,
		'no-label-var': 1,
		'no-labels': [
			1,
			{
				allowLoop: false,
				allowSwitch: false
			}
		],
		'no-lone-blocks': 1,
		'no-mixed-spaces-and-tabs': 1,
		'no-multi-spaces': 'off',
		'no-multi-str': 1,
		'no-multiple-empty-lines': [ 1, { max: 4 } ],
		'no-native-reassign': 1,
		'no-negated-in-lhs': 1,
		'no-new': 1,
		'no-new-func': 1,
		'no-new-object': 1,
		'no-new-require': 1,
		'no-new-symbol': 1,
		'no-new-wrappers': 1,
		'no-obj-calls': 1,
		'no-octal': 1,
		'no-octal-escape': 1,
		'no-path-concat': 1,
		'no-proto': 1,
		'no-redeclare': 1,
		'no-regex-spaces': 1,
		'no-return-assign': 'off',
		'no-self-assign': 1,
		'no-self-compare': 0,
		'no-sequences': 'off',
		'no-shadow-restricted-names': 1,
		'no-spaced-func': 1,
		'no-sparse-arrays': 1,
		'no-this-before-super': 1,
		'no-throw-literal': 1,
		'no-undef': 2,
		'no-undef-init': 1,
		'no-unexpected-multiline': 1,
		'no-unmodified-loop-condition': 1,
		'no-unneeded-ternary': [
			1,
			{
				defaultAssignment: false
			}
		],
		'no-unreachable': 1,
		'no-unsafe-finally': 1,
		'no-unused-vars': [
			1,
			{
				vars: 'local',
				args: 'after-used'
			}
		],
		'no-useless-call': 1,
		'no-useless-computed-key': 1,
		'no-useless-constructor': 1,
		'no-useless-escape': 1,
		'no-whitespace-before-property': 1,
		'no-with': 1,
		'one-var': [ 1, { var: 'always' } ],
		'operator-linebreak': [
			1,
			'after',
			{
				overrides: {
					'?': 'after',
					':': 'after'
				}
			}
		],
		'padded-blocks': 'off',
		quotes: 'off',
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
		semi: [ 2, 'always' ],
		'semi-style': [ 2, 'last' ],
		'semi-spacing': [
			1,
			{
				before: false,
				after: true
			}
		],
		'space-before-blocks': [ 1, 'always' ],
		'space-before-function-paren': [ 1, {
			anonymous: 'never',
			named: 'never',
			asyncArrow: 'always'
		} ],
		'space-in-parens': [ 1, 'always' ],
		'space-infix-ops': 1,
		'space-unary-ops': [
			1,
			{
				words: true,
				nonwords: false
			}
		],
		'spaced-comment': [
			1,
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
		'use-isnan': 1,
		'valid-jsdoc': [ 1, { 'requireReturn': false } ],
		'valid-typeof': 1,
		'wrap-iife': [ 1, 'any' ],
		'yield-star-spacing': [ 1, 'both' ],
		yoda: [ 1, 'never' ],
		'max-statements-per-line': [ 1, { 'max': 2 } ]
	}
};
