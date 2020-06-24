/** ****************************************************************************************************
 * File: utils.test.js
 * Project: geohash
 * @author Nick Soggin <iSkore@users.noreply.github.com> on 12-Feb-2019
 *******************************************************************************************************/
'use strict';

const
	chai   = require( 'chai' ),
	expect = chai.expect,
	{
		longitudeClamp,
		latitudeClamp,
		longitudeClampRelative,
		latitudeClampRelative,
		determinePrecision,
		determineDirection
	}      = require( '../index' );

describe( 'utils', () => {
	it( '[geohash.longitudeClamp] should clamp longitude to -180-180', () => {
		expect( longitudeClamp( -270 ) ).to.eq( -180 );
		expect( longitudeClamp( -180 ) ).to.eq( -180 );
		expect( longitudeClamp( -90 ) ).to.eq( -90 );
		expect( longitudeClamp( 0 ) ).to.eq( 0 );
		expect( longitudeClamp( 90 ) ).to.eq( 90 );
		expect( longitudeClamp( 180 ) ).to.eq( 180 );
		expect( longitudeClamp( 270 ) ).to.eq( 180 );
		expect( () => longitudeClamp( 'abc' ) )
			.to.throw( 'number required for `lng`' );
	} );

	it( '[geohash.latitudeClamp] should clamp latitude to -90-90', () => {
		expect( latitudeClamp( -270 ) ).to.eq( -90 );
		expect( latitudeClamp( -180 ) ).to.eq( -90 );
		expect( latitudeClamp( -90 ) ).to.eq( -90 );
		expect( latitudeClamp( 0 ) ).to.eq( 0 );
		expect( latitudeClamp( 90 ) ).to.eq( 90 );
		expect( latitudeClamp( 180 ) ).to.eq( 90 );
		expect( latitudeClamp( 270 ) ).to.eq( 90 );
		expect( () => latitudeClamp( 'abc' ) )
			.to.throw( 'number required for `lat`' );
	} );

	it( '[geohash.longitudeClampRelative] should clamp and wrap longitude around min/max -180-180', () => {
		expect( longitudeClampRelative( -270 ) ).to.eq( 90 );
		expect( longitudeClampRelative( -181 ) ).to.eq( 179 );
		expect( longitudeClampRelative( -180 ) ).to.eq( -180 );
		expect( longitudeClampRelative( -91 ) ).to.eq( -91 );
		expect( longitudeClampRelative( -90 ) ).to.eq( -90 );
		expect( longitudeClampRelative( 0 ) ).to.eq( 0 );
		expect( longitudeClampRelative( 90 ) ).to.eq( 90 );
		expect( longitudeClampRelative( 91 ) ).to.eq( 91 );
		expect( longitudeClampRelative( 180 ) ).to.eq( 180 );
		expect( longitudeClampRelative( 181 ) ).to.eq( -179 );
		expect( longitudeClampRelative( 270 ) ).to.eq( -90 );
		expect( () => longitudeClampRelative( 'abc' ) )
			.to.throw( 'number required for `lng`' );
	} );

	it( '[geohash.latitudeClampRelative] should clamp and wrap latitude around min/max -90-90', () => {
		expect( latitudeClampRelative( -270 ) ).to.eq( 90 );
		expect( latitudeClampRelative( -181 ) ).to.eq( 89 );
		expect( latitudeClampRelative( -180 ) ).to.eq( 90 );
		expect( latitudeClampRelative( -91 ) ).to.eq( 89 );
		expect( latitudeClampRelative( -90 ) ).to.eq( -90 );
		expect( latitudeClampRelative( 0 ) ).to.eq( 0 );
		expect( latitudeClampRelative( 90 ) ).to.eq( 90 );
		expect( latitudeClampRelative( 91 ) ).to.eq( -89 );
		expect( latitudeClampRelative( 180 ) ).to.eq( -90 );
		expect( latitudeClampRelative( 181 ) ).to.eq( -89 );
		expect( latitudeClampRelative( 270 ) ).to.eq( -90 );
		expect( () => latitudeClampRelative( 'abc' ) )
			.to.throw( 'number required for `lat`' );
	} );

	it( '[geohash.determinePrecision] should return the passed in value for a latitude value in range', () => {
		expect( determinePrecision( 180, 90 ) ).to.eq( 0 );
		expect( determinePrecision( -77, 38.9 ) ).to.eq( 3 );
		expect( determinePrecision( -77.01, 38.89 ) ).to.eq( 5 );
		expect( determinePrecision( -77.009, 38.89 ) ).to.eq( 6 );
		expect( determinePrecision( -77.009, 38.8899 ) ).to.eq( 7 );
		expect( determinePrecision( -77.00905, 38.88987 ) ).to.eq( 8 );
		expect( determinePrecision( -77.00905, 38.889866 ) ).to.eq( 9 );
		expect( determinePrecision( -77.00904996, 38.88986596 ) ).to.eq( 11 );
		expect( determinePrecision( -77.009049956, 38.889865958 ) ).to.eq( 12 );
		expect( determinePrecision( -77.009049955899, 38.889865958353 ) ).to.eq( 12 );

		expect( determinePrecision( -77.00905, 38.889866, 12 ) ).to.eq( 12 );
		expect( determinePrecision( -77.009049955899, 38.889865958353, 2 ) ).to.eq( 2 );

		expect( () => determinePrecision( 'abc', 0 ) )
			.to.throw( 'number required for `lng`' );
		expect( () => determinePrecision( 0, 'abc' ) )
			.to.throw( 'number required for `lat`' );
		expect( () => determinePrecision( 0, 0, 'abc' ) )
			.to.throw( 'number required for `precision`' );
	} );

	it( '[geohash.determineDirection] should convert vector direction to letter representation', () => {
		expect( determineDirection( [ 0, 0 ] ) ).to.eq( 'c' );
		expect( determineDirection( [ -1, 1 ] ) ).to.eq( 'nw' );
		expect( determineDirection( [ 0, 1 ] ) ).to.eq( 'n' );
		expect( determineDirection( [ 1, 1 ] ) ).to.eq( 'ne' );
		expect( determineDirection( [ 1, 0 ] ) ).to.eq( 'e' );
		expect( determineDirection( [ 1, -1 ] ) ).to.eq( 'se' );
		expect( determineDirection( [ 0, -1 ] ) ).to.eq( 's' );
		expect( determineDirection( [ -1, -1 ] ) ).to.eq( 'sw' );
		expect( determineDirection( [ -1, 0 ] ) ).to.eq( 'w' );

		expect( () => determineDirection( [ 'abc', 0 ] ) )
			.to.throw( 'number required for `x`' );
		expect( () => determineDirection( [ 0, 'abc' ] ) )
			.to.throw( 'number required for `y`' );
	} );
} );
