/** ****************************************************************************************************
 * File: latitudeClamp.test.js
 * Project: geohash
 * @author Nick Soggin <iSkore@users.noreply.github.com> on 08-Feb-2019
 *******************************************************************************************************/
'use strict';

const
	chai   = require( 'chai' ),
	expect = chai.expect;

const
	{ latitudeClamp } = require( '../index' );

describe( '[geohash.latitudeClamp]', () => {
	it( 'should return the passed in value for a latitude value in range',
		() => {
			expect( latitudeClamp( 0 ) ).to.eq( 0 );
			expect( latitudeClamp( 90 ) ).to.eq( 90 );
			expect( latitudeClamp( -90 ) ).to.eq( -90 );
		}
	);

	it( 'should return the latitude clamped to MIN/MAX latitude (-91 -> 90)',
		() => {
			expect( latitudeClamp( 91 ) ).to.eq( 90 );
			expect( latitudeClamp( -91 ) ).to.eq( -90 );
			expect( latitudeClamp( -1500 ) ).to.eq( -90 );
		}
	);
} );
