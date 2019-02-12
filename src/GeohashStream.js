/** ****************************************************************************************************
 * File: GeohashStream.js
 * Project: geohash
 * @author Nick Soggin <iSkore@users.noreply.github.com> on 11-Feb-2019
 *******************************************************************************************************/
'use strict';

const
	{ Readable } = require( 'stream' );

const
	{
		getBBoxStartingPoint,
		neighbor
	} = require( './Geohash' );


class GeohashStream extends Readable
{
	constructor( minLng, minLat, maxLng, maxLat, precision = 7 )
	{
		super();
		this.startingBBox = getBBoxStartingPoint( minLng, minLat, maxLng, maxLat, precision );
		
		this.lastNorth = this.startingBBox.hashSouthWest;
		this.lastEast  = this.startingBBox.hashSouthWest;
		
		// this.push( `'${ this.startingBBox.hashSouthWest }',\n` );
		this.push( this.startingBBox.hashSouthWest );
		
		this._x = 0;
		this._y = 0;
		this.x  = this.startingBBox.lngStep;
		this.y  = this.startingBBox.latStep;
		
		this._nextChunk = null;
	}
	
	nextChunk()
	{
		if( this._x < this.x ) {
			this._nextChunk = neighbor( this.lastEast, 'e' );
			this.lastEast   = this._nextChunk;
			this._x++;
			
			return this._nextChunk;
		} else if( this._y < this.y ) {
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
		while( ( chunk = this.nextChunk() ) !== null ) {
			// this.push( `'${ chunk }',\n` );
			this.push( chunk );
		}
		
		this.push( null );
	}
}

module.exports = GeohashStream;
