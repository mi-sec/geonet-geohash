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
// console.log( Geohash.decodeBBox( 'dqcjpxetzh6q' ) );
console.log( Geohash.decodeBBox( 'dqbvj3' ) );
console.log( Geohash.decodeBBox( 'dqbvj3' ) );
// console.log( Geohash.geohashWithin( x ) );

const
	chai           = require( 'chai' ),
	expect         = chai.expect,
	geohashPolygon = require( '../src/_Hasher' );
// geohashPolygon = require( '../../geohash-poly/index' );

const
	input = [ [
		[ -122.350051, 47.702893 ],
		[ -122.344774, 47.702877 ],
		[ -122.344777, 47.70324 ],
		[ -122.341982, 47.703234 ],
		[ -122.341959, 47.701421 ],
		[ -122.339749, 47.701416 ],
		[ -122.339704, 47.69776 ],
		[ -122.341913, 47.697797 ],
		[ -122.341905, 47.697071 ],
		[ -122.344576, 47.697084 ],
		[ -122.344609, 47.697807 ],
		[ -122.349999, 47.697822 ],
		[ -122.350051, 47.702893 ]
	] ];

describe( '@parellin/geohash', () => {
	it( '[Geohash] should return Geohash inside a polygon',
		done => {
			const hashes = geohashPolygon( {
				coords: input,
				precision: 7,
				hashMode: 'inside'
			} );
			
			expect( hashes ).to.deep.eq( [
				'c22zrgg', 'c22zrgu', 'c22zrgv', 'c22zrgy', 'c22zrgz',
				'c23p25b', 'c22zrge', 'c22zrgs', 'c22zrgt', 'c22zrgw',
				'c22zrgx', 'c23p258', 'c23p259', 'c23p25d', 'c22zrg7',
				'c22zrgk', 'c22zrgm', 'c22zrgq', 'c22zrgr', 'c23p252',
				'c23p253', 'c23p256', 'c22zrg5', 'c22zrgh', 'c22zrgj',
				'c22zrgn', 'c22zrgp', 'c23p250', 'c23p251', 'c23p254'
			] );
			
			done();
		}
	);
	
	it( '[Geohash] should return Geohash intersecting a polygon',
		done => {
			// return done();
			const hashes = geohashPolygon( {
				coords: input,
				precision: 7,
				hashMode: 'intersect',
				threshold: 0.0
			} );
			
			expect( hashes ).to.deep.eq( [
				'c22zru5', 'c22zruh', 'c22zruj', 'c22zrun', 'c22zrup',
				'c23p2h0', 'c23p2h1', 'c23p2h4', 'c22zrgg', 'c22zrgu',
				'c22zrgv', 'c22zrgy', 'c22zrgz', 'c23p25b', 'c23p25c',
				'c23p25f', 'c22zrge', 'c22zrgs', 'c22zrgt', 'c22zrgw',
				'c22zrgx', 'c23p258', 'c23p259', 'c23p25d', 'c22zrg7',
				'c22zrgk', 'c22zrgm', 'c22zrgq', 'c22zrgr', 'c23p252',
				'c23p253', 'c23p256', 'c22zrg5', 'c22zrgh', 'c22zrgj',
				'c22zrgn', 'c22zrgp', 'c23p250', 'c23p251', 'c23p254',
				'c22zrfg', 'c22zrfu', 'c22zrfv', 'c22zrfy', 'c22zrfz',
				'c23p24b', 'c23p24c', 'c23p24f'
			] );
			
			done();
		}
	);
} );
