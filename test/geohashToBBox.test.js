/** ****************************************************************************************************
 * File: geohashToBBox.test.js
 * Project: geohash
 * @author Nick Soggin <iSkore@users.noreply.github.com> on 08-Feb-2019
 *******************************************************************************************************/
'use strict';

const
	chai   = require( 'chai' ),
	expect = chai.expect;

const
	{ geohashToBBox } = require( '../index' );

describe( '[geohash.geohashToBBox]', () => {
	it( 'should throw error "Invalid geohash"',
		() => {
			const
				expected = 'Invalid geohash',
				actual   = () => geohashToBBox( '' );

			expect( actual ).to.throw( expected );
		}
	);

	it( 'should throw error "Invalid geohash"',
		() => {
			const
				expected = 'Invalid geohash',
				actual   = () => geohashToBBox( 'az' );

			expect( actual ).to.throw( expected );
		}
	);

	it( 'should convert geohash to bounding box of appropriate hash size and location',
		() => expect( geohashToBBox( 'u120fxw' ) ).to.deep.eq( [
			0.11810302734375,
			52.20428466796875,
			0.119476318359375,
			52.205657958984375
		] )
	);
} );
