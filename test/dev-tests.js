/** ****************************************************************************************************
 * File: dev-tests.js
 * Project: geohash
 * @author Nick Soggin <iSkore@users.noreply.github.com> on 12-Dec-2018
 *******************************************************************************************************/
'use strict';

const
	Geohash  = require( '../index' ),
	BBox     = require( '../src/BBox' ),
	Vector4D = require( '../src/Vector4D' );

/**
 * Lng = X
 * Lat = Y
 *
 * X1,Y2       X2,Y2
 *   |-----------|
 *   |           |
 *   |           |
 *   |-----------|
 * X1,Y1       X2,Y1
 *
 * -77.480264,38.848498,-77.453227,38.866812
 *
 * MIN_LNG = -77.480264
 * MIN_LAT = 38.848498
 *
 * MAX_LNG = -77.453227
 * MAX_LAT = 38.866812
 */

const
	bbox    = '-77.480264,38.848498,-77.453227,38.866812',
	bboxMap = {
		topLeft: {
			lng: -77.480264,
			lat: 38.866812
		},
		topRight: {
			lng: -77.453227,
			lat: 38.866812
		},
		bottomLeft: {
			lng: -77.480264,
			lat: 38.848498
		},
		bottomRight: {
			lng: -77.453227,
			lat: 38.848498
		}
	};


const x = new BBox( bbox );

console.log( x.area() );

// console.log( Geohash.sizeOf( 'dqcjpxetzh6q' ) );
console.log( Geohash.geohashWithin( x ) );

