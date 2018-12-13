/** ****************************************************************************************************
 * File: BBox.js
 * Project: geohash
 * @author Nick Soggin <iSkore@users.noreply.github.com> on 12-Dec-2018
 *******************************************************************************************************/
'use strict';

const Vector4D = require( './Vector4D' );

class BBox extends Vector4D
{
	constructor( ...props )
	{
		super( ...props );
	}
}

module.exports = BBox;
