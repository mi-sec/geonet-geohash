/** ****************************************************************************************************
 * File: geoUtils.js
 * Project: geohash
 * @author Nick Soggin <iSkore@users.noreply.github.com> on 03-Jan-2019
 *******************************************************************************************************/
'use strict';

/**
 * inside
 * @description
 * utilizing point-in-poly but providing support for geojson polys and holes.
 * @param {Array} [ x, y ] - lng, lat point
 * @param {geojson} geometry - polygon to check against
 * @returns {*} - if the point resides within the polygon
 */
function pointInside( [ x, y ], geometry ) {
	if( geometry.type !== 'Polygon' && geometry.type !== 'MultiPolygon' ) {
		return false;
	}
	
	const shape = geometry.type === 'Polygon' ? [ geometry.coordinates ] : geometry.coordinates;
	let inside  = 0;
	
	for( let i = 0; i < shape.length; i++ ) {
		for( let j = 0; j < shape[ i ].length; j++ ) {
			if( pointWithinPolyCoords( [ x, y ], shape[ i ][ j ] ) ) {
				inside++;
			}
		}
	}
	
	return inside % 2;
}


function pointWithinPolyCoords( [ x, y ], coords ) {
	let inside = false;
	for( let i = 0, j = coords.length - 1; i < coords.length; j = i++ ) {
		const
			xi = coords[ i ][ 0 ],
			yi = coords[ i ][ 1 ],
			xj = coords[ j ][ 0 ],
			yj = coords[ j ][ 1 ];
		
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
	pointInside,
	pointWithinPolyCoords
};
