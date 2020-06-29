/** ****************************************************************************************************
 * File: GeohashStream.js
 * Project: geohash
 * @author Nick Soggin <iSkore@users.noreply.github.com> on 11-Feb-2019
 *******************************************************************************************************/
'use strict';

const
	{ Readable } = require( 'stream' );

const
	getBBoxStartingPoint = require( './getBBoxStartingPoint' ),
	neighbor             = require( './neighbor' );

class GeohashStream extends Readable
{
	/**
	 * GeohashStream
	 *
	 * extends Readable stream
	 *
	 * @param {object} opts - configuration object
	 * @param {number} opts.minLng - bbox min longitude
	 * @param {number} opts.minLat - bbox min latitude
	 * @param {number} opts.maxLng - bbox max longitude
	 * @param {number} opts.maxLat - bbox max latitude
	 * @param {number} opts.precision - geohash precision
	 */
	constructor( opts )
	{
		super();

		if ( !opts ) {
			throw new Error(
				'[GeohashStream] requires options defining bbox (minLng, minLat, maxLng, maxLat) and precision'
			);
		}
		else if ( opts.minLng !== +opts.minLng && opts.minLat !== +opts.minLat &&
			opts.maxLng !== +opts.maxLng && opts.maxLat !== +opts.maxLat )
		{
			throw new Error( '[GeohashStream] minLng, minLat, maxLng, and maxLat must be numbers' );
		}
		else if ( opts.precision !== +opts.precision ) {
			throw new Error( '[GeohashStream] precision must be a number' );
		}

		this.startingBBox = getBBoxStartingPoint(
			opts.minLng,
			opts.minLat,
			opts.maxLng,
			opts.maxLat,
			opts.precision
		);

		this._x = -1;
		this._y = -1;
		this.x  = this.startingBBox.lngStep;
		this.y  = this.startingBBox.latStep;

		this._nextChunk = null;
	}

	nextChunk()
	{
		if ( this._x === -1 && this._y === -1 ) {
			this._nextChunk = this.startingBBox.hashSouthWest;
			this.lastNorth  = this._nextChunk;
			this.lastEast   = this._nextChunk;

			this._x++;
			this._y++;

			return this._nextChunk;
		}
		else if ( this._x < this.x ) {
			this._nextChunk = neighbor( this.lastEast, 'e' );
			this.lastEast   = this._nextChunk;
			this._x++;

			return this._nextChunk;
		}
		else if ( this._y < this.y ) {
			this._x = 0;

			this._nextChunk = neighbor( this.lastNorth, 'n' );
			this.lastNorth  = this._nextChunk;
			this.lastEast   = this._nextChunk;
			this._y++;

			return this._nextChunk;
		}

		return null;
	}

	_read()
	{
		let chunk;
		while ( ( chunk = this.nextChunk() ) !== null ) {
			this.push( chunk );
		}

		this.push( null );
	}
}

module.exports = GeohashStream;
