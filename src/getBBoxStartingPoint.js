/** ****************************************************************************************************
 * File: getBBoxStartingPoint.js
 * Project: geohash
 * @author Nick Soggin <iSkore@users.noreply.github.com> on 19-Feb-2019
 *******************************************************************************************************/
'use strict';

const
	decode          = require( './decode' ),
	encode          = require( './encode' ),
	geohashToBBox   = require( './geohashToBBox' ),
	{ ENCODE_AUTO } = require( './variables' );

/**
 * getBBoxStartingPoint
 *
 * Beginning operations for generating a geohash bbox.
 * Get the geohash for the southwest corner of a bbox and how many hash steps there are to the northeast corner.
 *
 * @param {number} minLng - minimum longitude
 * @param {number} minLat - minimum latitude
 * @param {number} maxLng - maximum longitude
 * @param {number} maxLat - maximum latitude
 * @param {number} [precision=ENCODE_AUTO] - geohash precision
 * @returns {{hashSouthWest: string, lngStep: number, latStep: number}}
 * southwest hash and how many lng/lat steps to the northeast hash
 */
function getBBoxStartingPoint( minLng, minLat, maxLng, maxLat, precision = ENCODE_AUTO ) {
	const
		hashSouthWest = encode( minLng, minLat, precision ),
		hashNorthEast = encode( maxLng, maxLat, precision ),
		latLng        = decode( hashSouthWest, true ),
		perLng        = latLng.error.lng * 2,
		perLat        = latLng.error.lat * 2,
		boxSouthWest  = geohashToBBox( hashSouthWest ),
		boxNorthEast  = geohashToBBox( hashNorthEast ),
		lngStep       = Math.round( ( boxNorthEast[ 0 ] - boxSouthWest[ 0 ] ) / perLng ),
		latStep       = Math.round( ( boxNorthEast[ 1 ] - boxSouthWest[ 1 ] ) / perLat );

	return {
		latStep,
		lngStep,
		hashSouthWest
	};
}

module.exports = getBBoxStartingPoint;
