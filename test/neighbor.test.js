/** ****************************************************************************************************
 * File: neighbor.test.js
 * Project: geohash
 * @author Nick Soggin <iSkore@users.noreply.github.com> on 28-Oct-2020
 *******************************************************************************************************/
'use strict';

const
	chai         = require( 'chai' ),
	expect       = chai.expect,
	{ neighbor } = require( '../index' );

describe( '[geohash.neighbor]', () => {
	it( 'should throw error "Invalid geohash"',
		() => {
			const
				expected = 'Invalid geohash',
				actual   = () => neighbor( '' );

			expect( actual ).to.throw( expected );
		}
	);

	it( 'should throw error "Invalid direction"',
		() => {
			const
				expected = 'Invalid direction',
				actual   = () => neighbor( 'b', 'a' );

			expect( actual ).to.throw( expected );
		}
	);

	it( 'should get geohash neighbor to n/s/e/w',
		() => {
			const
				expected = {
					c: 'dqcjpxetzh6q',
					n: 'dqcjpxetzh6r',
					s: 'dqcjpxetzh6m',
					e: 'dqcjpxetzh6w',
					w: 'dqcjpxetzh6n'
				};

			expect( neighbor( expected.c, 'n' ) ).to.eq( expected.n );
			expect( neighbor( expected.c, 's' ) ).to.eq( expected.s );
			expect( neighbor( expected.c, 'e' ) ).to.eq( expected.e );
			expect( neighbor( expected.c, 'w' ) ).to.eq( expected.w );
		}
	);
} );
