/** ****************************************************************************************************
 * File: geohashesWithinBBox.test.js
 * Project: geohash
 * @author Nick Soggin <iSkore@users.noreply.github.com> on 07-Feb-2019
 *******************************************************************************************************/
'use strict';

const
	chai   = require( 'chai' ),
	expect = chai.expect,
	Hasher = require( '../src/Hasher' );

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

describe( '@parellin/geohash - geohashesWithinBBox', () => {
	it( '[geohashesWithinBBox] should return Geohashes inside a bbox',
		done => {
			const hashes = new Hasher( {
				geojson: input,
				precision: 7,
				hashMode: 'inside',
				threshold: 0.01
			} ).calculate();
			
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
} );

const
	{ featureCollection }    = require( '@turf/helpers' ),
	{ default: bboxPolygon } = require( '@turf/bbox-polygon' ),
	// extent                   = [
	// -158.62060546875,
	// 21.782455839907463,
	// -157.27478027343747,
	// 22.836945920943855 ],
	// extent = geohashToBBox( '87z' ),
	extent                   = [
		-158.53271484375,
		22.169601410638865,
		-157.69500732421875,
		22.740723091194727
	],
	_bbox                    = bboxPolygon( extent );

const x = [];

x.push( _bbox );

geohashesWithinBBox( ...extent, 5 )
	.forEach( hash => x.push( toGeoJSON( hash ) ) );


console.log( JSON.stringify( featureCollection( x ) ) );
