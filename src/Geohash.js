/** ****************************************************************************************************
 * File: Geohash.js
 * Project: geohash
 * @author Nick Soggin <iSkore@users.noreply.github.com> on 10-Dec-2018
 *******************************************************************************************************/
'use strict';

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
	 * @param   {number} lon - Longitude in degrees.
	 * @param   {number} [precision] - Number of characters in resulting geohash.
	 * @returns {string} Geohash of supplied latitude/longitude.
	 * @throws  Invalid geohash.
	 *
	 * @example
	 *     var geohash = Geohash.encode(52.205, 0.119, 7); // geohash: 'u120fxw'
	 */
	static encode( lat, lon, precision )
	{
		// infer precision?
		if( !precision ) {
			if( ~~lat === lat && ~~lon === lon ) {
				precision = 0;
			} else {
				const
					latLen  = +( lat.toString( 10 ).length ),
					lonLen  = +( lon.toString( 10 ).length ),
					average = ( latLen + lonLen ) / 2;
				
				precision = average >= 12 ? 12 : average;
			}
		}
		
		lat       = +lat;
		lon       = +lon;
		precision = +precision;
		
		if( !( lat && lat === lat ) || !( lon && lon === lon ) || !( precision && precision === precision ) ) {
			throw new Error( 'Invalid geohash' );
		}
		
		let
			idx     = 0, // index into base32 map
			bit     = 0, // each char holds 5 bits
			evenBit = true,
			geohash = '',
			latMin  = -90,
			latMax  = 90,
			lonMin  = -180,
			lonMax  = 180;
		
		while( geohash.length < precision ) {
			if( evenBit ) {
				// bisect E-W longitude
				let lonMid = ( lonMin + lonMax ) / 2;
				
				if( lon >= lonMid ) {
					idx    = idx * 2 + 1;
					lonMin = lonMid;
				} else {
					idx    = idx * 2;
					lonMax = lonMid;
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
				geohash += Geohash.base32.charAt( idx );
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
	 * @returns {{lat:number, lon:number}} (Center of) geohashed location.
	 * @throws  Invalid geohash.
	 *
	 * @example
	 *     var latlon = Geohash.decode('u120fxw'); // latlon: { lat: 52.205, lon: 0.1188 }
	 */
	static decode( geohash )
	{
		const
			bounds = Geohash.bounds( geohash ),
			latMin = bounds.sw.lat,
			lonMin = bounds.sw.lon,
			latMax = bounds.ne.lat,
			lonMax = bounds.ne.lon;
		
		let
			lat = ( latMin + latMax ) / 2,
			lon = ( lonMin + lonMax ) / 2;
		
		// round to close to centre without excessive precision: ⌊2-log10(Δ°)⌋ decimal places
		lat = lat.toFixed( ~~( 2 - Math.log( latMax - latMin ) / Math.LN10 ) );
		lon = lon.toFixed( ~~( 2 - Math.log( lonMax - lonMin ) / Math.LN10 ) );
		
		return { lat: +lat, lon: +lon };
	}
	
	/**
	 * bounds
	 * @description
	 * Returns SW/NE latitude/longitude bounds of specified geohash.
	 * @param   {string} geohash - Cell that bounds are required of.
	 * @returns {{sw: {lat: number, lon: number}, ne: {lat: number, lon: number}}} lat/lon
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
			lonMin  = -180,
			lonMax  = 180;
		
		for( let i = 0; i < geohash.length; i++ ) {
			const
				chr = geohash.charAt( i ),
				idx = Geohash.base32.indexOf( chr );
			
			if( idx === -1 ) {
				throw new Error( 'Invalid geohash' );
			}
			
			for( let n = 4; n >= 0; n-- ) {
				const bitN = idx >> n & 1;
				
				if( evenBit ) {
					// longitude
					const lonMid = ( lonMin + lonMax ) / 2;
					bitN === 1 ? lonMin = lonMid : lonMax = lonMid;
				} else {
					// latitude
					const latMid = ( latMin + latMax ) / 2;
					bitN === 1 ? latMin = latMid : latMax = latMid;
				}
				
				evenBit = !evenBit;
			}
		}
		
		return {
			sw: { lat: latMin, lon: lonMin },
			ne: { lat: latMax, lon: lonMax }
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
		return parent + Geohash.base32.charAt( neighbour[ direction ][ type ].indexOf( lastCh ) );
	}
	
	/**
	 * neighbors
	 * Returns all 8 adjacent cells to specified geohash.
	 *
	 * @param   {string} geohash - Geohash neighbors are required of.
	 * @returns {{n,ne,e,se,s,sw,w,nw: string}} surrounding geohashes
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
	};
	
	static getFillGeohashes( bbox, precision )
	{
		// dqbcj3vy
		
	}
}

Geohash.base32 = '0123456789bcdefghjkmnpqrstuvwxyz';

module.exports = Geohash;
