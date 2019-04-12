/** ****************************************************************************************************
 * File: latitudeClampRelative.test.js
 * Project: geohash
 * @author Nick Soggin <iSkore@users.noreply.github.com> on 08-Feb-2019
 *******************************************************************************************************/
'use strict';

const
	chai   = require( 'chai' ),
	expect = chai.expect;

const
	{ latitudeClampRelative } = require( '../index' );

describe( '[geohash.latitudeClampRelative]', () => {
	it( 'should return the passed in value for a latitude value in range',
		() => {
			expect( latitudeClampRelative( 0 ) ).to.eq( 0 );
			expect( latitudeClampRelative( 90 ) ).to.eq( 90 );
			expect( latitudeClampRelative( -90 ) ).to.eq( -90 );
		}
	);

	it( 'should return the latitude value offset by the amount over MIN/MAX latitude (-91 -> 89)',
		() => {
			expect( latitudeClampRelative( 91 ) ).to.eq( -89 );
			expect( latitudeClampRelative( -91 ) ).to.eq( 89 );
			expect( latitudeClampRelative( -1500 ) ).to.eq( 30 );
		}
	);
} );
