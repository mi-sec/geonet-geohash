/** ****************************************************************************************************
 * File: GeohashStreamGeoJSON.js
 * Project: geohash
 * @author Nick Soggin <iSkore@users.noreply.github.com> on 12-Feb-2019
 *******************************************************************************************************/
'use strict';

const
	GeohashStream = require( './GeohashStream' );

const
	{
		toGeoJSON
	} = require( './Geohash' );

class GeohashStreamGeoJSON extends GeohashStream
{
	/**
	 * GeohashStreamGeoJSON
	 *
	 * extends GeohashStream
	 *
	 * @param {number} minLng - bbox min longitude
	 * @param {number} minLat - bbox min latitude
	 * @param {number} maxLng - bbox max longitude
	 * @param {number} maxLat - bbox max latitude
	 * @param {number} [precision=7] - geohash precision
	 */
	constructor( minLng, minLat, maxLng, maxLat, precision = 7 )
	{
		super( minLng, minLat, maxLng, maxLat, precision );
	}
	
	_read()
	{
		let chunk;
		while( ( chunk = super.nextChunk() ) !== null ) {
			this.push( JSON.stringify( toGeoJSON( chunk ) ) );
		}
		
		this.push( null );
	}
}

module.exports = GeohashStreamGeoJSON;
