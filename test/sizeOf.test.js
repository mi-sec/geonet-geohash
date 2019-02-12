/** ****************************************************************************************************
 * File: sizeOf.test.js
 * Project: geohash
 * @author Nick Soggin <iSkore@users.noreply.github.com> on 12-Feb-2019
 *******************************************************************************************************/
'use strict';

const
	chai       = require( 'chai' ),
	expect     = chai.expect,
	{ sizeOf } = require( '../index' );

describe( '[geohash.sizeOf]', () => {
	it( 'should get the width, height, area, and precision of a geohash',
		() => {
			const
				expected = {
					geohash: 'dqcjpxet',
					precision: 8,
					width: 38.2,
					height: 19.1,
					area: 729.6200000000001
				},
				actual   = sizeOf( 'dqcjpxet' );
			
			expect( actual ).to.deep.eq( expected );
		}
	);
} );
