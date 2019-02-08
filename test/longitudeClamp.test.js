/** ****************************************************************************************************
 * File: longitudeClamp.test.js
 * Project: geohash
 * @author Nick Soggin <iSkore@users.noreply.github.com> on 08-Feb-2019
 *******************************************************************************************************/
'use strict';

const
	chai   = require( 'chai' ),
	expect = chai.expect;

const
	{ longitudeClamp } = require( '../index' );

describe( '[geohash.longitudeClamp]', () => {
	it( 'should return the passed in value for a longitude value in range',
		() => {
			expect( longitudeClamp( 0 ) ).to.eq( 0 );
			expect( longitudeClamp( 180 ) ).to.eq( 180 );
			expect( longitudeClamp( -180 ) ).to.eq( -180 );
		}
	);
	
	it( 'should return the longitude value offset by the amount over MIN/MAX longitude (-181 -> -180)',
		() => {
			expect( longitudeClamp( 181 ) ).to.eq( 180 );
			expect( longitudeClamp( -181 ) ).to.eq( -180 );
			expect( longitudeClamp( -1500 ) ).to.eq( -180 );
		}
	);
} );
