/** ****************************************************************************************************
 * File: GeohashStreamGeoJSON.js
 * Project: geohash
 * @author Nick Soggin <iSkore@users.noreply.github.com> on 12-Feb-2019
 *******************************************************************************************************/
'use strict';

const
	GeohashStream = require( './GeohashStream' ),
	toGeoJSON     = require( './toGeoJSON' );

class GeohashStreamGeoJSON extends GeohashStream
{
	/**
	 * GeohashStreamGeoJSON
	 *
	 * extends GeohashStream
	 *
	 * @param {object} opts - configuration object
	 * @param {number} opts.minLng - bbox min longitude
	 * @param {number} opts.minLat - bbox min latitude
	 * @param {number} opts.maxLng - bbox max longitude
	 * @param {number} opts.maxLat - bbox max latitude
	 * @param {number} opts.precision - geohash precision
	 * @param {boolean} [opts.includeGeohashAsProperty=false]
	 * include geohash string as a property in the GeoJSON
	 * @param {boolean} [opts.includeFeatureBBox=false]
	 * include bbox as a property in the GeoJSON
	 */
	constructor( opts )
	{
		super( opts );

		this.opts = opts;

		this.opts.includeGeohashAsProperty = this.opts.includeGeohashAsProperty || false;
		this.opts.includeFeatureBBox       = this.opts.includeFeatureBBox || false;
	}

	_read()
	{
		let chunk;
		while( ( chunk = super.nextChunk() ) !== null ) {
			this.push( JSON.stringify( toGeoJSON( chunk, this.opts ) ) );
		}

		this.push( null );
	}
}

module.exports = GeohashStreamGeoJSON;
