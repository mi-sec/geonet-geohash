/** ****************************************************************************************************
 * File: utils.js
 * Project: geohash
 * @author Nick Soggin <iSkore@users.noreply.github.com> on 19-Feb-2019
 *******************************************************************************************************/
'use strict';

const
	{
		ENCODE_AUTO,
		MIN_LNG,
		MIN_LAT,
		MAX_LNG,
		MAX_LAT
	} = require( './variables' );

/**
 * longitudeClamp
 *
 * Determines if longitude is in the realm of possibility
 * If it's not, clamp the longitude value to the MIN/MAX
 * @param {number} lng - longitude
 * @returns {number} - longitude
 */
function longitudeClamp( lng ) {
	return Math.min( Math.max( MIN_LNG, lng ), MAX_LNG );
}

/**
 * latitudeClamp
 *
 * Determines if latitude is in the realm of possibility
 * If it's not, clamp the latitude value to the MIN/MAX
 * @param {number} lng - longitude
 * @returns {number} - longitude
 */
function latitudeClamp( lng ) {
	return Math.min( Math.max( MIN_LAT, lng ), MAX_LAT );
}

/**
 * longitudeClampRelative
 *
 * Determines if longitude is in the realm of possibility
 * If it's not, return the longitude position relative to the amount offset
 * @param {number} lng - longitude
 * @returns {number} - longitude
 */
function longitudeClampRelative( lng ) {
	return lng > MAX_LNG ?
		MIN_LNG + lng % MAX_LNG :
		lng < MIN_LNG ?
			MAX_LNG + lng % MAX_LNG :
			lng;
}

/**
 * latitudeClampRelative
 *
 * Determines if latitude is in the realm of possibility
 * If it's not, return the latitude position relative to the amount offset
 * @param {number} lat - latitude
 * @returns {number} - latitude
 */
function latitudeClampRelative( lat ) {
	return lat > MAX_LAT ?
		MIN_LAT + lat % MAX_LAT :
		lat < MIN_LAT ?
			MAX_LAT + lat % MAX_LAT :
			lat;
}

/**
 * determinePrecision
 *
 * Estimate what precision to use based on the input longitude/latitude
 *
 * @param {number} lng - longitude
 * @param {number} lat - latitude
 * @param {number?} [precision=-1] - precision override
 * @returns {number} - precision estimate
 */
function determinePrecision( lng, lat, precision = -1 ) {
	if( precision === ENCODE_AUTO ) {
		if( lng !== +lng || lat !== +lat ) {
			throw new Error( 'number notation required for auto precision.' );
		}

		lng = longitudeClampRelative( lng );
		lat = latitudeClampRelative( lat );

		if( ~~lat === lat && ~~lng === lng ) {
			precision = 0;
		} else {
			const
				latLen  = +( lat.toString( 10 ).length ),
				lngLen  = +( lng.toString( 10 ).length ),
				average = ( latLen + lngLen ) / 2;

			precision = average >= 12 ? 12 : average;
		}
	}

	return ~~precision;
}

function determineDirection( [ x, y ] ) {
	if( x === 0 && y === 0 ) {
		return 'c';
	} else if( !( x ^ y ) ) {
		return x & y === 1 ? 'ne' : 'sw';
	} else if( !!( x & y ) ) {
		return x === 1 ? 'se' : 'nw';
	} else if( ( x | y ) > 0 ) {
		return !!x ? 'e' : 'n';
	} else {
		return !!x ? 'w' : 's';
	}
}

module.exports = {
	longitudeClamp,
	latitudeClamp,
	longitudeClampRelative,
	latitudeClampRelative,
	determinePrecision,
	determineDirection
};
