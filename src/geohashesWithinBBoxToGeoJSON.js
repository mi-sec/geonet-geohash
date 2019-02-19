/** ****************************************************************************************************
 * File: geohashesWithinBBoxToGeoJSON.js
 * Project: geohash
 * @author Nick Soggin <iSkore@users.noreply.github.com> on 19-Feb-2019
 *******************************************************************************************************/
'use strict';

const
	geohashesWithinBBox = require( './geohashesWithinBBox' ),
	toGeoJSON           = require( './toGeoJSON' );

/**
 * geohashesWithinBBoxToGeoJSON
 *
 * Return GeoJSON FeatureCollection of all geohashes between minLng, minLat, maxLng, maxLat at the specified precision
 *
 * @param {number} minLng - bbox min longitude
 * @param {number} minLat - bbox min latitude
 * @param {number} maxLng - bbox max longitude
 * @param {number} maxLat - bbox max latitude
 * @param {number} precision - geohash precision
 * @returns {{type: string,features: {object[]}}}
 * GeoJSON of geohashes within a bbox
 */
function geohashesWithinBBoxToGeoJSON( minLng, minLat, maxLng, maxLat, precision = 7 ) {
	return {
		type: 'FeatureCollection',
		features: geohashesWithinBBox( minLng, minLat, maxLng, maxLat, precision ).map( toGeoJSON )
	};
}

module.exports = geohashesWithinBBoxToGeoJSON;
