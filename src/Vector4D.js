/** ****************************************************************************************************
 * File: Vector4D.js
 * Project: geohash
 * @author Nick Soggin <iSkore@users.noreply.github.com> on 12-Dec-2018
 *******************************************************************************************************/
'use strict';

const
	{
		isString,
		isNumber,
		isArray
	} = require( './utils/utilities' );

class Vector4D
{
	constructor( x, y, z, w )
	{
		if( isString( x ) ) {
			x = Vector4D.matchString( x );
		}

		if( isArray( x ) ) {
			this.x = +x[ 0 ];
			this.y = +x[ 1 ];
			this.z = +x[ 2 ];
			this.w = +x[ 3 ];
		} else {
			this.x = +x;
			this.y = +y;
			this.z = +z;
			this.w = +w;
		}

		if( !isNumber( this.x, this.y, this.z, this.w ) ) {
			throw new Error( 'Argument Error - Invalid Vector4D arguments' );
		}
	}

	static matchString( str )
	{
		const [ x = 0, y = 0, z = 0, w = 0 ] = str.match( /-?\d*\.?\d+/g );
		return [ +x, +y, +z, +w ];
	}

	equals( vec )
	{
		return Vector4D.equals( this, vec );
	}

	static equals( vec1, vec2 )
	{
		return vec1.x === vec2.x && vec1.y === vec2.y && vec1.z === vec2.z && vec1.w === vec2.w;
	}

	area()
	{
		return ( this.x - this.z ) * ( this.y - this.w );
	}

	toArray()
	{
		return [ this.x, this.y, this.z, this.w ];
	}

	toString()
	{
		return `(${ this.x }, ${ this.y }, ${ this.z }, ${ this.w })`;
	}

	toJSON()
	{
		return { x: this.x, y: this.y, z: this.z, w: this.w };
	}

	/**
	 * [ Symbol.toPrimitive ]
	 * @description
	 * symbol that specifies a function valued property that is called to convert an object to a primitive value
	 * @param {*} n - hint
	 * @return {*} - hint handler
	 */
	[ Symbol.toPrimitive ]( n )
	{
		if( n === 'string' ) {
			return this.toString();
		} else if( n === 'number' ) {
			return +( this.x + this.y + this.z + this.w ) / 4;
		} else if( n === 'boolean' ) {
			return !!this;
		} else {
			return this.toString();
		}
	}

	get [ Symbol.toStringTag ]()
	{
		return this.constructor.name;
	}

	static get [ Symbol.species ]()
	{
		return Array;
	}

	static [ Symbol.hasInstance ]( instance )
	{
		return instance.constructor.name === 'Vector4D';
	}
}

module.exports = Vector4D;
