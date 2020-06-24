/** ****************************************************************************************************
 * File: neighbors.js
 * Project: geohash
 * @author Nick Soggin <iSkore@users.noreply.github.com> on 19-Feb-2019
 *******************************************************************************************************/
'use strict';

const neighbor = require( './neighbor' );

/**
 * neighbors
 * Returns all 8 neighbor cells to specified geohash.
 * This algorithm is approximately two times faster than ngeohash.
 * Times for 1,000,000 iterations
 * | ngeohash | Geohash  |
 * | 0m3.108s | 0m1.675s |
 *
 * @param   {string} geohash - Geohash neighbors are required of.
 * @param   {boolean} asObject - to return as an object or array
 * @returns {{c,n,ne,e,se,s,sw,w,nw}|array} - surrounding geohashes
 * @throws  Invalid geohash.
 */
function neighbors( geohash, asObject = false ) {
	const [ n, ne, e, se, s, sw, w, nw ] = [
		neighbor( geohash, 'n' ),
		neighbor( neighbor( geohash, 'n' ), 'e' ),
		neighbor( geohash, 'e' ),
		neighbor( neighbor( geohash, 's' ), 'e' ),
		neighbor( geohash, 's' ),
		neighbor( neighbor( geohash, 's' ), 'w' ),
		neighbor( geohash, 'w' ),
		neighbor( neighbor( geohash, 'n' ), 'w' )
	];

	if ( asObject ) {
		return { c: geohash, n, ne, e, se, s, sw, w, nw };
	}
	else {
		return [ n, ne, e, se, s, sw, w, nw ];
	}
}

module.exports = neighbors;
