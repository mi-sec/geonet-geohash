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

const
	bbox    = '-77.480264,38.848498,-77.453227,38.866812',
	bboxMap = {
		topLeft: {
			lon: -77.480264,
			lat: 38.866812
		},
		topRight: {
			lon: -77.453227,
			lat: 38.866812
		},
		bottomLeft: {
			lon: -77.480264,
			lat: 38.848498
		},
		bottomRight: {
			lon: -77.453227,
			lat: 38.848498
		}
	};


const x = new BBox( bbox );
// const x = Geohash.getFillGeohashes( bbox );

console.log( x );
console.log( x.area() );
