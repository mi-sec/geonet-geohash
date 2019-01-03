/** ****************************************************************************************************
 * File: geoUtils.js
 * Project: geohash
 * @author Nick Soggin <iSkore@users.noreply.github.com> on 03-Jan-2019
 *******************************************************************************************************/
'use strict';

function pointInside( [ x, y ], poly ) {
	let inside = false;
	for( let i = 0, j = poly.length - 1; i < poly.length; j = i++ ) {
		const
			xi = poly[ i ][ 0 ],
			yi = poly[ i ][ 1 ],
			xj = poly[ j ][ 0 ],
			yj = poly[ j ][ 1 ];
		
		if(
			( ( yi > y ) !== ( yj > y ) ) &&
			( x < ( xj - xi ) * ( y - yi ) / ( yj - yi ) + xi )
		) {
			inside = !inside;
		}
	}
	
	return inside;
}

module.exports = {
	pointInside
};
