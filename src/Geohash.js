/** ****************************************************************************************************
 * File: Geohash.js
 * Project: geohash
 * @author Nick Soggin <iSkore@users.noreply.github.com> on 10-Dec-2018
 *******************************************************************************************************/
'use strict';

const
	BBox = require( './BBox' );

/**
 * Geohash
 */
class Geohash
{
	/**
	 * encode
	 * Encodes latitude/longitude to geohash, either to specified precision or to automatically
	 * evaluated precision.
	 *
	 * @param   {number} lat - Latitude in degrees.
	 * @param   {number} lng - Longitude in degrees.
	 * @param   {number} [precision] - Number of characters in resulting geohash.
	 * @returns {string} Geohash of supplied latitude/longitude.
	 * @throws  Invalid geohash.
	 *
	 * @example
	 *     var geohash = Geohash.encode(52.205, 0.119, 7); // geohash: 'u120fxw'
	 */
	static encode( lat, lng, precision )
	{
		// infer precision?
		if( !precision ) {
			if( ~~lat === lat && ~~lng === lng ) {
				precision = 0;
			} else {
				const
					latLen  = +( lat.toString( 10 ).length ),
					lngLen  = +( lng.toString( 10 ).length ),
					average = ( latLen + lngLen ) / 2;
				
				precision = average >= 12 ? 12 : average;
			}
		}
		
		lat       = +lat;
		lng       = +lng;
		precision = +precision;
		
		if( !( lat && lat === lat ) || !( lng && lng === lng ) || !( precision && precision === precision ) ) {
			throw new Error( 'Invalid geohash' );
		}
		
		let
			idx     = 0, // index into BASE32 map
			bit     = 0, // each char holds 5 bits
			evenBit = true,
			geohash = '',
			latMin  = -90,
			latMax  = 90,
			lngMin  = -180,
			lngMax  = 180;
		
		while( geohash.length < precision ) {
			if( evenBit ) {
				// bisect E-W longitude
				let lngMid = ( lngMin + lngMax ) / 2;
				
				if( lng >= lngMid ) {
					idx    = idx * 2 + 1;
					lngMin = lngMid;
				} else {
					idx    = idx * 2;
					lngMax = lngMid;
				}
			} else {
				// bisect N-S latitude
				const latMid = ( latMin + latMax ) / 2;
				
				if( lat >= latMid ) {
					idx    = idx * 2 + 1;
					latMin = latMid;
				} else {
					idx    = idx * 2;
					latMax = latMid;
				}
			}
			
			evenBit = !evenBit;
			
			if( ++bit === 5 ) {
				// 5 bits gives us a character: append it and start over
				geohash += Geohash.BASE32.charAt( idx );
				bit = 0;
				idx = 0;
			}
		}
		
		return geohash;
	}
	
	/**
	 * decode
	 * Decode geohash to latitude/longitude (location is approximate centre of geohash cell,
	 * to reasonable precision).
	 *
	 * @param   {string} geohash - Geohash string to be converted to latitude/longitude.
	 * @returns {{lat:number, lng:number}} (Center of) geohashed location.
	 * @throws  Invalid geohash.
	 *
	 * @example
	 *     var latlng = Geohash.decode('u120fxw'); // latlng: { lat: 52.205, lng: 0.1188 }
	 */
	static decode( geohash )
	{
		const
			bounds = Geohash.bounds( geohash ),
			latMin = bounds.sw.lat,
			lngMin = bounds.sw.lng,
			latMax = bounds.ne.lat,
			lngMax = bounds.ne.lng;
		
		let
			lat = ( latMin + latMax ) / 2,
			lng = ( lngMin + lngMax ) / 2;
		
		// round to close to centre without excessive precision: ⌊2-log10(Δ°)⌋ decimal places
		lat = lat.toFixed( ~~( 2 - Math.log( latMax - latMin ) / Math.LN10 ) );
		lng = lng.toFixed( ~~( 2 - Math.log( lngMax - lngMin ) / Math.LN10 ) );
		
		return { lat: +lat, lng: +lng };
	}
	
	/**
	 * bounds
	 * @description
	 * Returns SW/NE latitude/longitude bounds of specified geohash.
	 * @param   {string} geohash - Cell that bounds are required of.
	 * @returns {{sw: {lat: number, lng: number}, ne: {lat: number, lng: number}}} lat/lng
	 * @throws  Invalid geohash.
	 */
	static bounds( geohash )
	{
		if( geohash.length === 0 ) {
			throw new Error( 'Invalid geohash' );
		}
		
		geohash = geohash.toLowerCase();
		
		let
			evenBit = true,
			latMin  = -90,
			latMax  = 90,
			lngMin  = -180,
			lngMax  = 180;
		
		for( let i = 0; i < geohash.length; i++ ) {
			const
				chr = geohash.charAt( i ),
				idx = Geohash.BASE32.indexOf( chr );
			
			if( idx === -1 ) {
				throw new Error( 'Invalid geohash' );
			}
			
			for( let n = 4; n >= 0; n-- ) {
				const bitN = idx >> n & 1;
				
				if( evenBit ) {
					// longitude
					const lngMid = ( lngMin + lngMax ) / 2;
					bitN === 1 ? lngMin = lngMid : lngMax = lngMid;
				} else {
					// latitude
					const latMid = ( latMin + latMax ) / 2;
					bitN === 1 ? latMin = latMid : latMax = latMid;
				}
				
				evenBit = !evenBit;
			}
		}
		
		return {
			sw: { lat: latMin, lng: lngMin },
			ne: { lat: latMax, lng: lngMax }
		};
	}
	
	/**
	 * Determines adjacent cell in given direction.
	 *
	 * @param {string} geohash - Cell to which adjacent cell is required.
	 * @param {string} direction - Direction from geohash (N/S/E/W).
	 * @returns {string} Geocode of adjacent cell.
	 * @throws  Invalid geohash.
	 */
	static adjacent( geohash, direction )
	{
		geohash   = geohash.toLowerCase();
		direction = direction.toLowerCase();
		
		if( geohash.length === 0 ) {
			throw new Error( 'Invalid geohash' );
		} else if( 'nsew'.indexOf( direction ) === -1 ) {
			throw new Error( 'Invalid direction' );
		}
		
		const
			neighbour = {
				n: [ 'p0r21436x8zb9dcf5h7kjnmqesgutwvy', 'bc01fg45238967deuvhjyznpkmstqrwx' ],
				s: [ '14365h7k9dcfesgujnmqp0r2twvyx8zb', '238967debc01fg45kmstqrwxuvhjyznp' ],
				e: [ 'bc01fg45238967deuvhjyznpkmstqrwx', 'p0r21436x8zb9dcf5h7kjnmqesgutwvy' ],
				w: [ '238967debc01fg45kmstqrwxuvhjyznp', '14365h7k9dcfesgujnmqp0r2twvyx8zb' ]
			},
			border    = {
				n: [ 'prxz', 'bcfguvyz' ],
				s: [ '028b', '0145hjnp' ],
				e: [ 'bcfguvyz', 'prxz' ],
				w: [ '0145hjnp', '028b' ]
			},
			lastCh    = geohash.slice( -1 ),
			type      = geohash.length % 2;
		
		let parent = geohash.slice( 0, -1 );
		
		if( border[ direction ][ type ].indexOf( lastCh ) !== -1 && parent !== '' ) {
			parent = Geohash.adjacent( parent, direction );
		}
		
		// append letter for direction to parent
		return parent + Geohash.BASE32.charAt( neighbour[ direction ][ type ].indexOf( lastCh ) );
	}
	
	/**
	 * neighbors
	 * Returns all 8 adjacent cells to specified geohash.
	 *
	 * @param   {string} geohash - Geohash neighbors are required of.
	 * @returns {{nw,n,ne,w,c,e,sw,s,se: string}} surrounding geohashes
	 * @throws  Invalid geohash.
	 */
	static neighbors( geohash )
	{
		return {
			nw: Geohash.adjacent( Geohash.adjacent( geohash, 'n' ), 'w' ),
			n: Geohash.adjacent( geohash, 'n' ),
			ne: Geohash.adjacent( Geohash.adjacent( geohash, 'n' ), 'e' ),
			w: Geohash.adjacent( geohash, 'w' ),
			c: geohash,
			e: Geohash.adjacent( geohash, 'e' ),
			sw: Geohash.adjacent( Geohash.adjacent( geohash, 's' ), 'w' ),
			s: Geohash.adjacent( geohash, 's' ),
			se: Geohash.adjacent( Geohash.adjacent( geohash, 's' ), 'e' )
		};
	}
	
	static decodeBBox( hash )
	{
		let
			minLat = -90,
			maxLat = 90,
			minLng = -180,
			maxLng = 180,
			isLng  = true,
			mid;
		
		let hashValue = 0;
		for( let i = 0, l = hash.length; i < l; i++ ) {
			const code = hash[ i ].toLowerCase();
			hashValue  = Geohash.BASE32_DICT[ code ];
			
			for( let bits = 4; bits >= 0; bits-- ) {
				const bit = ( hashValue >> bits ) & 1;
				
				if( isLng ) {
					mid = ( maxLng + minLng ) / 2;
					bit === 1 ? minLng = mid : maxLng = mid;
				} else {
					mid = ( maxLat + minLat ) / 2;
					bit === 1 ? minLat = mid : maxLat = mid;
				}
				
				isLng = !isLng;
			}
		}
		
		return [ minLng, minLat, maxLng, maxLat ];
	}
	
	/**
	 * sizeOf
	 * Calculate the size of a given geohash
	 * | Precision | Width       | Height      |
	 * |:---------:|:-----------:|:-----------:|
	 * | 1         | `≤ 5,000km` | `× 5,000km` |
	 * | 2         | `≤ 1,250km` | `× 625km`   |
	 * | 3         | `≤ 156km`   | `× 156km`   |
	 * | 4         | `≤ 39.1km`  | `× 19.5km`  |
	 * | 5         | `≤ 4.89km`  | `× 4.89km`  |
	 * | 6         | `≤ 1.22km`  | `× 0.61km`  |
	 * | 7         | `≤ 153m`    | `× 153m`    |
	 * | 8         | `≤ 38.2m`   | `× 19.1m`   |
	 * | 9         | `≤ 4.77m`   | `× 4.77m`   |
	 * | 10        | `≤ 1.19m`   | `× 0.596m`  |
	 * | 11        | `≤ 149mm`   | `× 149mm`   |
	 * | 12        | `≤ 37.2mm`  | `× 18.6mm`  |
	 *
	 * @param {string} geohash - Geohash to determine precision size
	 * @return {{geohash: string, area: number, precision, width, height}} - area, width, and high in meters
	 * @example
	 *
	 * Geohash.sizeOf( 'dqcjpxetz' );
	 * // { geohash: 'dqcjpxetz', precision: 9, width: 4.77, height: 4.77, area: 22.7527 }
	 */
	static sizeOf( geohash )
	{
		if( geohash.length === 0 ) {
			throw new Error( 'Invalid geohash' );
		}
		
		geohash = geohash.toLowerCase();
		
		const
			precision         = geohash.length,
			{ width, height } = Geohash.PRECISION[ precision ],
			area              = width * height;
		
		return { geohash, precision, width, height, area };
	}
	
	static geohashWithin( bbox, precision )
	{
		if( bbox.constructor.name !== 'BBox' ) {
			bbox = new BBox( bbox );
		}
		
		const
			x1y1 = Geohash.encode( bbox.y1, bbox.x1 ),
			x1y2 = Geohash.encode( bbox.y2, bbox.x1 );
		
		console.log( x1y1 );
		console.log( x1y2 );
		
		return '';
	}
}

Geohash.BASE32      = '0123456789bcdefghjkmnpqrstuvwxyz';
Geohash.BASE32_DICT = {
	0: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7,
	8: 8, 9: 9, b: 10, c: 11, d: 12, e: 13, f: 14, g: 15,
	h: 16, j: 17, k: 18, m: 19, n: 20, p: 21, q: 22, r: 23,
	s: 24, t: 25, u: 26, v: 27, w: 28, x: 29, y: 30, z: 31
};

Geohash.PRECISION = {
	1: { width: 5000000, height: 5000000 },
	2: { width: 1250000, height: 625000 },
	3: { width: 156000, height: 156000 },
	4: { width: 39100, height: 19500 },
	5: { width: 4890, height: 4890 },
	6: { width: 1220, height: 610 },
	7: { width: 153, height: 153 },
	8: { width: 38.2, height: 19.1 },
	9: { width: 4.77, height: 4.77 },
	10: { width: 1.19, height: 0.596 },
	11: { width: 0.149, height: 0.149 },
	12: { width: 0.0372, height: 0.0186 }
};

module.exports = Geohash;
