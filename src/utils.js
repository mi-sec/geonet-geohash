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
 * isNumber
 * @description
 * determine if value is a valid number
 * @param {number} n - value
 * @return {boolean} - true if value is a number
 */
function isNumber( n ) {
	return n === n && n === +n;
}

/**
 * clamp
 * @description
 * basic number clamp
 * @param {number} n - number to clamp
 * @param {number} min - minimum value
 * @param {number} max - maximum value
 * @return {number|*} - clamped value
 */
function clamp( n, min, max ) {
	return Math.min( Math.max( min, n ), max );
}

/**
 * longitudeClamp
 * @description
 * Determines if longitude is in the realm of possibility
 * If it's not, clamp the longitude value to the MIN/MAX
 * @param {number} lng - longitude
 * @returns {number} - longitude
 */
function longitudeClamp( lng ) {
	if ( !isNumber( lng ) ) {
		throw new Error( 'number required for `lng`' );
	}

	return clamp( lng, MIN_LNG, MAX_LNG );
}

/**
 * latitudeClamp
 * @description
 * Determines if latitude is in the realm of possibility
 * If it's not, clamp the latitude value to the MIN/MAX
 * @param {number} lat - latitude
 * @returns {number} - latitude
 */
function latitudeClamp( lat ) {
	if ( !isNumber( lat ) ) {
		throw new Error( 'number required for `lat`' );
	}

	return clamp( lat, MIN_LAT, MAX_LAT );
}

/**
 * clampRelative
 * @description
 * basic relative value clamp
 * @param {number} n - number to clamp
 * @param {number} min - minimum value
 * @param {number} max - maximum value
 * @return {number|*} - clamped value or offset
 */
function clampRelative( n, min, max ) {
	return isNumber( n ) ?
		n > max ? min + n % max :
			n < min ? max + n % max :
				n : n;
}

/**
 * longitudeClampRelative
 * @description
 * Determines if longitude is in the realm of possibility
 * If it's not, return the longitude position relative to the amount offset
 * @param {number} lng - longitude
 * @returns {number} - longitude
 */
function longitudeClampRelative( lng ) {
	if ( !isNumber( lng ) ) {
		throw new Error( 'number required for `lng`' );
	}

	return clampRelative( lng, MIN_LNG, MAX_LNG );
}

/**
 * latitudeClampRelative
 * @description
 * Determines if latitude is in the realm of possibility
 * If it's not, return the latitude position relative to the amount offset
 * @param {number} lat - latitude
 * @returns {number} - latitude
 */
function latitudeClampRelative( lat ) {
	if ( !isNumber( lat ) ) {
		throw new Error( 'number required for `lat`' );
	}

	return clampRelative( lat, MIN_LAT, MAX_LAT );
}

/**
 * determinePrecision
 * @description
 * Estimate what precision to use based on the input longitude/latitude
 *
 * @param {number} lng - longitude
 * @param {number} lat - latitude
 * @param {number?} [precision=ENCODE_AUTO] - precision override
 * @returns {number} - precision estimate
 */
function determinePrecision( lng, lat, precision = ENCODE_AUTO ) {
	if ( !isNumber( precision ) ) {
		throw new Error( 'number required for `precision`' );
	}

	if ( precision === ENCODE_AUTO ) {
		if ( !isNumber( lng ) ) {
			throw new Error( 'number required for `lng`' );
		}
		else if ( !isNumber( lat ) ) {
			throw new Error( 'number required for `lat`' );
		}

		lng = longitudeClampRelative( lng );
		lat = latitudeClampRelative( lat );

		if ( ~~lat === lat && ~~lng === lng ) {
			precision = 0;
		}
		else {
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
	if ( !isNumber( x ) ) {
		throw new Error( 'number required for `x`' );
	}
	else if ( !isNumber( y ) ) {
		throw new Error( 'number required for `y`' );
	}
	else if ( x === 0 && y === 0 ) {
		return 'c';
	}
	else if ( !( x ^ y ) ) {
		return ( x & y ) === 1 ? 'ne' : 'sw';
	}
	else if ( !!( x & y ) ) {
		return x === 1 ? 'se' : 'nw';
	}
	else if ( ( x | y ) > 0 ) {
		return !!x ? 'e' : 'n';
	}
	else {
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
