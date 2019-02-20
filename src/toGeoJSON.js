/** ****************************************************************************************************
 * File: toGeoJSON.js
 * Project: geohash
 * @author Nick Soggin <iSkore@users.noreply.github.com> on 19-Feb-2019
 *******************************************************************************************************/
'use strict';

const
	geohashToBBox = require( './geohashToBBox' );

/**
 * toGeoJSON
 * @description
 * convert geohash to GeoJSON
 * @param {string} hash - geohash to convert
 * @returns {*} geohash to geojson
 */
function toGeoJSON( hash ) {
	const bbox = geohashToBBox( hash );
	
	return {
		type: 'Feature',
		bbox,
		properties: {
			geohash: hash
		},
		geometry: {
			type: 'Polygon',
			coordinates: [
				[
					[ bbox[ 0 ], bbox[ 1 ] ],
					[ bbox[ 2 ], bbox[ 1 ] ],
					[ bbox[ 2 ], bbox[ 3 ] ],
					[ bbox[ 0 ], bbox[ 3 ] ],
					[ bbox[ 0 ], bbox[ 1 ] ]
				]
			]
		}
	};
}

module.exports = toGeoJSON;
