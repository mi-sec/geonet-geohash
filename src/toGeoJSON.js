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
 * @param {object} opts - geojson options
 * @param {boolean} [opts.includeGeohashAsProperty=false]
 * include geohash string as a property in the GeoJSON
 * @param {boolean} [opts.includeFeatureBBox=false]
 * include bbox as a property in the GeoJSON
 * @returns {*} geohash to geojson
 */
function toGeoJSON( hash, opts = {
	includeGeohashAsProperty: false,
	includeFeatureBBox: false
} )
{
	const bbox = geohashToBBox( hash );
	
	const data = {
		type: 'Feature',
		properties: {},
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
	
	if( opts.includeGeohashAsProperty ) {
		data.properties.geohash = hash;
	}
	
	if( opts.includeFeatureBBox ) {
		data.bbox = bbox;
	}
	
	return data;
}

module.exports = toGeoJSON;
