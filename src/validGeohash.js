/** ****************************************************************************************************
 * File: validGeohash.js
 * Project: geonet-geohash
 * @author Nick Soggin <iSkore@users.noreply.github.com> on 12-Apr-2019
 *******************************************************************************************************/
'use strict';

/**
 * validGeohash
 * Determine if string is a valid geohash
 * @param {string} geohash - geohash to test
 * @returns {boolean} - true/false if the geohash is valid
 */
function validGeohash( geohash ) {
	return /^[0-9b-hj-km-np-z]{1,12}$/.test( geohash );
}

module.exports = validGeohash;
