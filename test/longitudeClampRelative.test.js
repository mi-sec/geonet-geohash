/** ****************************************************************************************************
 * File: longitudeClampRelative.test.js
 * Project: geohash
 * @author Nick Soggin <iSkore@users.noreply.github.com> on 08-Feb-2019
 *******************************************************************************************************/
'use strict';

const
	chai   = require( 'chai' ),
	expect = chai.expect;

const
	{ longitudeClampRelative } = require( '../index' );

describe( '[geohash.longitudeClampRelative]', () => {
	it( 'should return the passed in value for a longitude value in range',
		() => {
			expect( longitudeClampRelative( 0 ) ).to.eq( 0 );
			expect( longitudeClampRelative( 180 ) ).to.eq( 180 );
			expect( longitudeClampRelative( -180 ) ).to.eq( -180 );
		}
	);
	
	it( 'should return the longitude value offset by the amount over MIN/MAX longitude (-181 -> 179)',
		() => {
			expect( longitudeClampRelative( 181 ) ).to.eq( -179 );
			expect( longitudeClampRelative( -181 ) ).to.eq( 179 );
			expect( longitudeClampRelative( -1500 ) ).to.eq( 120 );
		}
	);
} );
