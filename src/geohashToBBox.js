/** ****************************************************************************************************
 * File: geohashToBBox.js
 * Project: geohash
 * @author Nick Soggin <iSkore@users.noreply.github.com> on 19-Feb-2019
 *******************************************************************************************************/
'use strict';

const
	{
		BASE32,
		MIN_LNG,
		MIN_LAT,
		MAX_LNG,
		MAX_LAT
	} = require( './variables' );

/**
 * geohashToBBox
 * @description
 * Returns BBox bounds of specified geohash.
 * @param   {string} hash - geohash to convert to bbox
 * @returns {number[]} bbox array
 * @throws  Invalid geohash.
 */
function geohashToBBox( hash ) {
	if( hash.length === 0 ) {
		throw new Error( 'Invalid geohash' );
	}
	
	let
		evenBit = true,
		lngMin  = MIN_LNG,
		latMin  = MIN_LAT,
		lngMax  = MAX_LNG,
		latMax  = MAX_LAT;
	
	for( let i = 0; i < hash.length; i++ ) {
		const
			chr      = hash.charAt( i ),
			hashChar = BASE32.indexOf( chr );
		
		if( hashChar === -1 ) {
			throw new Error( 'Invalid geohash' );
		}
		
		for( let n = 4; n >= 0; n-- ) {
			const bitN = hashChar >> n & 1;
			
			if( evenBit ) {
				// longitude
				const lngMid = ( lngMin + lngMax ) / 2;
				bitN === 1 ? lngMin = lngMid : lngMax = lngMid;
			} else {
				// latitude
				const latMid = ( latMin + latMax ) / 2;
				bitN === 1 ? latMin = latMid : latMax = latMid;
			}
			
			evenBit = !evenBit;
		}
	}
	
	return [ lngMin, latMin, lngMax, latMax ];
}

module.exports = geohashToBBox;
