/** ****************************************************************************************************
 * File: BBox.js
 * Project: geohash
 * @author Nick Soggin <iSkore@users.noreply.github.com> on 12-Dec-2018
 *******************************************************************************************************/
'use strict';

const
	Vector4D = require( './Vector4D' );

class BBox extends Vector4D
{
	constructor( ...props )
	{
		super( ...props );
		
		this.x1 = this.x;
		this.y1 = this.y;
		this.x2 = this.z;
		this.y2 = this.w;
	}
	
	area()
	{
		const
			R    = 6378137,
			dLat = ( this.y2 - this.y1 ) * Math.PI / 180,
			dLon = ( this.x2 - this.x1 ) * Math.PI / 180,
			a    = Math.sin( dLat / 2 ) ** 2 +
				Math.cos( this.y1 * Math.PI / 180 ) *
				Math.cos( this.y2 * Math.PI / 180 ) *
				Math.sin( dLon / 2 ) ** 2,
			c    = 2 * Math.atan2( Math.sqrt( a ), Math.sqrt( 1 - a ) ),
			d    = R * c;
		
		return d;
	}
	
	toJSON()
	{
		return { x1: this.x1, y1: this.y1, x2: this.x2, y2: this.y2 };
	}
	
	static [ Symbol.hasInstance ]( instance )
	{
		return instance.constructor.name === 'BBox';
	}
}

module.exports = BBox;
