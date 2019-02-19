/** ****************************************************************************************************
 * File: decode.js
 * Project: geohash
 * @author Nick Soggin <iSkore@users.noreply.github.com> on 19-Feb-2019
 *******************************************************************************************************/
'use strict';

const
	geohashToBBox = require( './geohashToBBox' );

/**
 * decode
 * Decode geohash to latitude/longitude (location is approximate centre of geohash cell, to reasonable precision).
 * Will round to close to centre without excessive precision: ⌊2-log10(Δ°)⌋ decimal places.
 *
 * @param   {string} geohash - Geohash string to be converted to latitude/longitude.
 * @param   {boolean} calculateErrorOffset - calculate the natural amount of geospatial inaccuracy
 * @returns {{lng,lat}|{lng,lat,error:{lng,lat}}} - Center of geohashed location.
 * @throws  Invalid geohash.
 *
 * @example
 *     const latlng = decode( 'dqbvhgk' ); // latlng: { lng: -77.4804, lat: 38.8662 }
 */
function decode( geohash, calculateErrorOffset = false ) {
	const
		bbox = geohashToBBox( geohash );
	
	let
		lng = ( bbox[ 0 ] + bbox[ 2 ] ) / 2,
		lat = ( bbox[ 1 ] + bbox[ 3 ] ) / 2;
	
	if( calculateErrorOffset ) {
		return {
			lng, lat,
			error: {
				lng: bbox[ 2 ] - lng,
				lat: bbox[ 3 ] - lat
			}
		};
	} else {
		// round to close to centre without excessive precision: ⌊2-log10(Δ°)⌋ decimal places
		lng = +lng.toFixed( ~~( 2 - Math.log( bbox[ 2 ] - bbox[ 0 ] ) / Math.LN10 ) );
		lat = +lat.toFixed( ~~( 2 - Math.log( bbox[ 3 ] - bbox[ 1 ] ) / Math.LN10 ) );
		
		return { lng, lat };
	}
}

module.exports = decode;
