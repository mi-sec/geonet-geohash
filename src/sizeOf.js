/** ****************************************************************************************************
 * File: sizeOf.js
 * Project: geohash
 * @author Nick Soggin <iSkore@users.noreply.github.com> on 19-Feb-2019
 *******************************************************************************************************/
'use strict';

const
	{ PRECISION_AREA } = require( './variables' );

/**
 * sizeOf
 * Calculate the size of a given geohash
 * | Precision | Width       | Height      |
 * |:---------:|:-----------:|:-----------:|
 * | 1         | `≤ 5,000km` | `× 5,000km` |
 * | 2         | `≤ 1,250km` | `× 625km`   |
 * | 3         | `≤ 156km`   | `× 156km`   |
 * | 4         | `≤ 39.1km`  | `× 19.5km`  |
 * | 5         | `≤ 4.89km`  | `× 4.89km`  |
 * | 6         | `≤ 1.22km`  | `× 0.61km`  |
 * | 7         | `≤ 153m`    | `× 153m`    |
 * | 8         | `≤ 38.2m`   | `× 19.1m`   |
 * | 9         | `≤ 4.77m`   | `× 4.77m`   |
 * | 10        | `≤ 1.19m`   | `× 0.596m`  |
 * | 11        | `≤ 149mm`   | `× 149mm`   |
 * | 12        | `≤ 37.2mm`  | `× 18.6mm`  |
 *
 * @param {string} geohash - Geohash to determine precision size
 * @return {{geohash: string, area: number, precision, width, height}} - area, width, and high in meters
 * @example
 *
 * sizeOf( 'dqcjpxetz' );
 * // { geohash: 'dqcjpxetz', precision: 9, width: 4.77, height: 4.77, area: 22.7527 }
 */
function sizeOf( geohash ) {
	if( geohash.length === 0 ) {
		throw new Error( 'Invalid geohash' );
	}

	const
		precision         = geohash.length,
		{ width, height } = PRECISION_AREA[ precision ],
		area              = width * height;

	return { geohash, precision, width, height, area };
}

module.exports = sizeOf;
