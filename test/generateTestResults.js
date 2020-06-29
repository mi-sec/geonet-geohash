/** ****************************************************************************************************
 * File: generateTestResults.js
 * Project: geohash
 * @author Nick Soggin <iSkore@users.noreply.github.com> on 20-Feb-2019
 *******************************************************************************************************/
'use strict';

const
	{ writeFileSync } = require( 'fs' ),
	{ join }          = require( 'path' );

const
	{
		geohashesWithinBBox,
		geohashesWithinBBoxToGeoJSON,
		GeohashStreamGeoJSON
	} = require( '../index' );

console.log( 'Writing results for geohashesWithinBBox' );

const extent = [ -158.53271484375, 22.169601410638865, -157.69500732421875, 22.740723091194727 ];

const
	_geohashesWithinBBox = geohashesWithinBBox( ...extent, 5 );

writeFileSync(
	join( __dirname, './geohashesWithinBBox.test.results.json' ),
	JSON.stringify( _geohashesWithinBBox, null, 4 )
);

console.log( 'Writing results for geohashesWithinBBoxToGeoJSON' );

const
	_geohashesWithinBBoxToGeoJSON = geohashesWithinBBoxToGeoJSON( ...extent, 5 );

writeFileSync(
	join( __dirname, './geohashesWithinBBoxToGeoJSON.test.results.json' ),
	JSON.stringify( _geohashesWithinBBoxToGeoJSON, null, 4 )
);

console.log( 'Writing results for GeohashStreamGeoJSON' );

const
	geoStream = new GeohashStreamGeoJSON( {
		minLng: extent[ 0 ],
		minLat: extent[ 1 ],
		maxLng: extent[ 2 ],
		maxLat: extent[ 3 ],
		precision: 5,
		includeGeohashAsProperty: true,
		includeFeatureBBox: true
	} ),
	tested    = [];

geoStream
	.on( 'data', d => tested.push( JSON.parse( d ) ) )
	.on( 'end', () => {
		writeFileSync(
			join( __dirname, './geohashStreamGeoJSON.test.results.json' ),
			JSON.stringify( tested, null, 4 )
		);
	} );
