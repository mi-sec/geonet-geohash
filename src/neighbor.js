/** ****************************************************************************************************
 * File: neighbor.js
 * Project: geohash
 * @author Nick Soggin <iSkore@users.noreply.github.com> on 19-Feb-2019
 *******************************************************************************************************/
'use strict';

const
	{
		BASE32,
		NEIGHBOR_CODEX,
		BORDER_CODEX
	} = require( './variables' );

/**
 * Determines neighbor cell in given direction.
 *
 * @param {string} geohash - Cell to which neighbor cell is required.
 * @param {string} direction - Direction from geohash (N/S/E/W).
 * @returns {string} Geocode of neighbor cell.
 * @throws  Invalid geohash.
 */
function neighbor( geohash, direction ) {
	if( geohash.length === 0 ) {
		throw new Error( 'Invalid geohash' );
	} else if( 'nsew'.indexOf( direction ) === -1 ) {
		throw new Error( 'Invalid direction' );
	}

	const
		lastCh = geohash.slice( -1 ),
		type   = geohash.length % 2;

	let parent = geohash.slice( 0, -1 );

	if( BORDER_CODEX[ direction ][ type ].indexOf( lastCh ) !== -1 && parent !== '' ) {
		parent = neighbor( parent, direction );
	}

	// append letter for direction to parent
	return parent + BASE32.charAt( NEIGHBOR_CODEX[ direction ][ type ].indexOf( lastCh ) );
}

module.exports = neighbor;
