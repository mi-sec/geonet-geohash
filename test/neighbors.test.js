/** ****************************************************************************************************
 * File: neighbors.test.js
 * Project: geohash
 * @author Nick Soggin <iSkore@users.noreply.github.com> on 08-Feb-2019
 *******************************************************************************************************/
'use strict';


const
	chai          = require( 'chai' ),
	expect        = chai.expect,
	{ neighbors } = require( '../index' );

describe( '[geohash.neighbors]', () => {
	it( 'should get hash neighbors as array [N, NE, E, SE, S, SW, W, NW]',
		() => {
			const
				expected = [
					'dqcjpxetzh6r',
					'dqcjpxetzh6x',
					'dqcjpxetzh6w',
					'dqcjpxetzh6t',
					'dqcjpxetzh6m',
					'dqcjpxetzh6j',
					'dqcjpxetzh6n',
					'dqcjpxetzh6p'
				],
				actual   = neighbors( 'dqcjpxetzh6q' );
			
			expect( actual ).to.deep.eq( expected );
		}
	);
	
	it( 'should get hash neighbors as object',
		() => {
			const
				expected = {
					c: 'dqcjpxetzh6q',
					n: 'dqcjpxetzh6r',
					ne: 'dqcjpxetzh6x',
					e: 'dqcjpxetzh6w',
					se: 'dqcjpxetzh6t',
					s: 'dqcjpxetzh6m',
					sw: 'dqcjpxetzh6j',
					w: 'dqcjpxetzh6n',
					nw: 'dqcjpxetzh6p'
				},
				actual   = neighbors( 'dqcjpxetzh6q', true );
			
			expect( actual ).to.deep.eq( expected );
		}
	);
} );
