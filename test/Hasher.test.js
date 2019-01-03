/** ****************************************************************************************************
 * File: dev-tests.js
 * Project: geohash
 * @author Nick Soggin <iSkore@users.noreply.github.com> on 12-Dec-2018
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

describe( '@parellin/geohash', () => {
	it( '[Hasher] should return Geohash inside a polygon',
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
	
	it( '[Hasher] should return Geohash intersecting a polygon',
		done => {
			const hashes = new Hasher( {
				geojson: input,
				precision: 7,
				hashMode: 'intersect',
				threshold: 0.01
			} ).calculate();
			
			expect( hashes ).to.deep.eq( [
				'c22zru5', 'c22zruh', 'c22zruj', 'c22zrun', 'c22zrup',
				'c23p2h0', 'c23p2h1', 'c22zrgg', 'c22zrgu', 'c22zrgv',
				'c22zrgy', 'c22zrgz', 'c23p25b', 'c23p25c', 'c23p25f',
				'c22zrge', 'c22zrgs', 'c22zrgt', 'c22zrgw', 'c22zrgx',
				'c23p258', 'c23p259', 'c23p25d', 'c22zrg7', 'c22zrgk',
				'c22zrgm', 'c22zrgq', 'c22zrgr', 'c23p252', 'c23p253',
				'c23p256', 'c22zrg5', 'c22zrgh', 'c22zrgj', 'c22zrgn',
				'c22zrgp', 'c23p250', 'c23p251', 'c23p254', 'c22zrfz',
				'c23p24b', 'c23p24c'
			] );
			
			done();
		}
	);
	
	it( '[Hasher] should return Geohash extent of a polygon',
		done => {
			const hashes = new Hasher( {
				geojson: input,
				precision: 7,
				hashMode: 'extent',
				threshold: 0.01
			} ).calculate();
			
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
