/** ****************************************************************************************************
 * File: geohashesWithinBBox.js
 * Project: geohash
 * @author Nick Soggin <iSkore@users.noreply.github.com> on 19-Feb-2019
 *******************************************************************************************************/
'use strict';

const
	getBBoxStartingPoint = require( './getBBoxStartingPoint' ),
	neighbor             = require( './neighbor' );

/**
 * geohashesWithinBBox
 *
 * Return all the geohashes between minLng, minLat, maxLng, maxLat at the specified precision
 *
 * @param {number} minLng - bbox min longitude
 * @param {number} minLat - bbox min latitude
 * @param {number} maxLng - bbox max longitude
 * @param {number} maxLat - bbox max latitude
 * @param {number} precision - geohash precision
 * @returns {Array} - geohash array
 */
function geohashesWithinBBox( minLng, minLat, maxLng, maxLat, precision = 7 ) {
	const
		hashBBox = getBBoxStartingPoint( minLng, minLat, maxLng, maxLat, precision ),
		hashList = [];
	
	const originalHash = hashBBox.hashSouthWest;
	hashList.push( originalHash );
	
	for( let lng = 0, lat = 0; lng <= hashBBox.lngStep; lng++ ) {
		for( ; lat < hashBBox.latStep; lat++ ) {
			const northHash = neighbor( hashList[ hashList.length - 1 ], 'n' );
			hashList.push( northHash );
		}
		
		if( lng + lat !== hashBBox.lngStep + hashBBox.latStep ) {
			const eastHash = neighbor( hashList[ hashList.length - 1 - lat ], 'e' );
			lat            = 0;
			hashList.push( eastHash );
		}
	}
	
	return hashList;
}

module.exports = geohashesWithinBBox;
