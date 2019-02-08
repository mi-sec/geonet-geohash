/** ****************************************************************************************************
 * File: Geohash.js
 * Project: geohash
 * @author Nick Soggin <iSkore@users.noreply.github.com> on 10-Dec-2018
 *******************************************************************************************************/
'use strict';

const
	Vector2D       = require( './Vector2D' ),
	Hasher         = require( './Hasher' ),
	BASE32         = '0123456789bcdefghjkmnpqrstuvwxyz',
	BASE32_DICT    = {
		0: 0x0, 1: 0x1, 2: 0x2, 3: 0x3, 4: 0x4, 5: 0x5, 6: 0x6, 7: 0x7,
		8: 0x8, 9: 0x9, b: 0xA, c: 0xB, d: 0xC, e: 0xD, f: 0xE, g: 0xF,
		h: 0x10, j: 0x11, k: 0x12, m: 0x13, n: 0x14, p: 0x15, q: 0x16, r: 0x17,
		s: 0x18, t: 0x19, u: 0x1A, v: 0x1B, w: 0x1C, x: 0x1D, y: 0x1E, z: 0x1F
	},
	PRECISION_AREA = {
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
	},
	NEIGHBOR_CODEX = {
		n: [ 'p0r21436x8zb9dcf5h7kjnmqesgutwvy', 'bc01fg45238967deuvhjyznpkmstqrwx' ],
		s: [ '14365h7k9dcfesgujnmqp0r2twvyx8zb', '238967debc01fg45kmstqrwxuvhjyznp' ],
		e: [ 'bc01fg45238967deuvhjyznpkmstqrwx', 'p0r21436x8zb9dcf5h7kjnmqesgutwvy' ],
		w: [ '238967debc01fg45kmstqrwxuvhjyznp', '14365h7k9dcfesgujnmqp0r2twvyx8zb' ]
	},
	BORDER_CODEX   = {
		n: [ 'prxz', 'bcfguvyz' ],
		s: [ '028b', '0145hjnp' ],
		e: [ 'bcfguvyz', 'prxz' ],
		w: [ '0145hjnp', '028b' ]
	},
	ENCODE_AUTO    = -1,
	MIN_LAT        = -90,
	MAX_LAT        = 90,
	MIN_LNG        = -180,
	MAX_LNG        = 180;

/**
 * Significant Figure Hash Length
 *
 * This is a quick and dirty lookup to figure out how long our hash
 * should be in order to guarantee a certain amount of trailing
 * significant figures. This was calculated by determining the error:
 * 45/2^(n-1) where n is the number of bits for a latitude or
 * longitude. Key is # of desired sig figs, value is minimum length of
 * the geohash.
 * @type Array
 */
const
	SIGFIG_HASH_LENGTH = [ 0, 5, 7, 8, 11, 12, 13, 15, 16, 17, 18 ];

/**
 * isValidLongitude
 * Determines if longitude is in the realm of possibility
 * If it's not, return the MIN_LNG or MAX_LNG accordingly
 * @param {number} lng - longitude
 * @returns {number} - longitude
 */
function isValidLongitude( lng ) {
	return lng > MAX_LNG ?
		MIN_LNG + lng % MAX_LNG :
		lng < MIN_LNG ?
			MAX_LNG + lng % MAX_LNG :
			lng;
}

/**
 * isValidLatitude
 * Determines if latitude is in the realm of possibility
 * If it's not, return the MIN_LAT or MAX_LAT accordingly
 * @param {number} lat - latitude
 * @returns {number} - latitude
 */
function isValidLatitude( lat ) {
	return lat > MAX_LAT ?
		MAX_LAT :
		lat < MIN_LAT ?
			MIN_LAT :
			lat;
}

/**
 * determinePrecision
 *
 * Estimate what precision to use based on the input longitude/latitude
 *
 * @param {number} lng - longitude
 * @param {number} lat - latitude
 * @param {number?} precision - precision override
 * @returns {number} - precision estimate
 */
function determinePrecision( lng, lat, precision = -1 ) {
	if( precision === ENCODE_AUTO ) {
		if( lng !== +lng || lat !== +lat ) {
			throw new Error( 'string notation required for auto precision.' );
		}
		
		if( ~~lat === lat && ~~lng === lng ) {
			precision = 0;
		} else {
			const
				sigFigs = Math.max(
					( '' + ( lat % 1 ) ).length,
					( '' + ( lng % 1 ) ).length
				);
			
			precision = SIGFIG_HASH_LENGTH[ sigFigs ];
		}
	}
	
	return precision;
}

function _experimentalPrecisionEstimate( lng, lat, precision ) {
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
	
	return precision;
}

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
function encode( lng, lat, precision = ENCODE_AUTO ) {
	precision = determinePrecision( lng, lat, precision );
	
	lat       = +lat;
	lng       = +lng;
	precision = +precision;
	
	if( !( lat && lat === lat ) ||
		!( lng && lng === lng ) ||
		!( precision && precision === precision ) ) {
		throw new Error( 'Invalid geohash' );
	}
	
	let
		geohash = '',
		hash    = 0, // index into BASE32 map
		bit     = 0, // each char holds 5 bits
		evenBit = true,
		latMin  = MIN_LAT,
		lngMin  = MIN_LNG,
		latMax  = MAX_LAT,
		lngMax  = MAX_LNG,
		mid     = 0;
	
	while( geohash.length < precision ) {
		if( evenBit ) {
			// bisect E-W longitude
			mid = ( lngMin + lngMax ) / 2;
			if( lng >= mid ) {
				hash   = ( hash << 1 ) + 1;
				lngMin = mid;
			} else {
				hash   = hash << 1;
				lngMax = mid;
			}
		} else {
			// bisect N-S latitude
			mid = ( latMin + latMax ) / 2;
			if( lat >= mid ) {
				hash   = ( hash << 1 ) + 1;
				latMin = mid;
			} else {
				hash   = hash << 1;
				latMax = mid;
			}
		}
		
		evenBit = !evenBit;
		
		if( ++bit === 5 ) {
			// 5 bits gives us a character: append it and start over
			geohash += BASE32[ hash ];
			bit  = 0;
			hash = 0;
		}
	}
	
	return geohash;
}

/**
 * decode
 * Decode geohash to latitude/longitude (location is approximate centre of geohash cell, to reasonable precision).
 *
 * @param   {string} geohash - Geohash string to be converted to latitude/longitude.
 * @param   {boolean} calculateErrorOffset - calculate the natural amount of geospatial inaccuracy
 * @returns {{lng,lat}|{lng,lat,error:{lng,lat}}} - Center of geohashed location.
 * @throws  Invalid geohash.
 *
 * @example
 *     var latlng = decode('u120fxw'); // latlng: { lat: 52.205, lng: 0.1188 }
 */
function decode( geohash, calculateErrorOffset = false ) {
	const
		bbox = geohashToBBox( geohash );
	
	let
		lng = ( bbox[ 0 ] + bbox[ 2 ] ) / 2,
		lat = ( bbox[ 1 ] + bbox[ 3 ] ) / 2;
	
	if( calculateErrorOffset ) {
		return {
			lng, lat,
			error: {
				lng: bbox[ 2 ] - lng,
				lat: bbox[ 3 ] - lat
			}
		};
	} else {
		// round to close to centre without excessive precision: ⌊2-log10(Δ°)⌋ decimal places
		lng = +lng.toFixed( ~~( 2 - Math.log( bbox[ 2 ] - bbox[ 0 ] ) / Math.LN10 ) );
		lat = +lat.toFixed( ~~( 2 - Math.log( bbox[ 3 ] - bbox[ 1 ] ) / Math.LN10 ) );
		
		return { lng, lat };
	}
}

// TODO::: ensure the accuracy of decode - should be midpoint of decodeBBox
// console.log( decode( 'u120fxw' ) );
// console.log( decodeBBox( 'u120fxw' ) );

/**
 * geohashToBBox
 * @description
 * Returns BBox bounds of specified geohash.
 * @param   {string} hash - geohash to convert to bbox
 * @returns {number[]} bbox array
 * @throws  Invalid geohash.
 */
function geohashToBBox( hash ) {
	if( hash.length === 0 ) {
		throw new Error( 'Invalid geohash' );
	}
	
	let
		evenBit = true,
		latMin  = MIN_LAT,
		lngMin  = MIN_LNG,
		latMax  = MAX_LAT,
		lngMax  = MAX_LNG;
	
	for( let i = 0; i < hash.length; i++ ) {
		const
			chr      = hash.charAt( i ),
			hashChar = BASE32.indexOf( chr );
		
		if( hashChar === -1 ) {
			throw new Error( 'Invalid geohash' );
		}
		
		for( let n = 4; n >= 0; n-- ) {
			const bitN = hashChar >> n & 1;
			
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
	
	return [ lngMin, latMin, lngMax, latMax ];
}

function determineDirection( [ x, y ] ) {
	console.log( x, y );
	
	if( x === 0 && y === 0 ) {
		return 'c';
	} else if( !( x ^ y ) ) {
		return x & y === 1 ? 'ne' : 'sw';
	} else if( !!( x & y ) ) {
		return x === 1 ? 'se' : 'nw';
	} else if( ( x | y ) > 0 ) {
		return !!x ? 'e' : 'n';
	} else {
		return !!x ? 'w' : 's';
	}
}

/**
 * Determines neighbor cell in given direction.
 *
 * @param {string} geohash - Cell to which neighbor cell is required.
 * @param {string} direction - Direction from geohash (N/S/E/W).
 * @returns {string} Geocode of neighbor cell.
 * @throws  Invalid geohash.
 */
function neighbor( geohash, direction ) {
	if( geohash.length === 0 ) {
		throw new Error( 'Invalid geohash' );
	} else if( 'nsew'.indexOf( direction ) === -1 ) {
		throw new Error( 'Invalid direction' );
	}
	
	const
		lastCh = geohash.slice( -1 ),
		type   = geohash.length % 2;
	
	let parent = geohash.slice( 0, -1 );
	
	if( BORDER_CODEX[ direction ][ type ].indexOf( lastCh ) !== -1 && parent !== '' ) {
		parent = neighbor( parent, direction );
	}
	
	// append letter for direction to parent
	return parent + BASE32.charAt( NEIGHBOR_CODEX[ direction ][ type ].indexOf( lastCh ) );
}

/**
 * neighbors
 * Returns all 8 neighbor cells to specified geohash.
 * This algorithm is approximately two times faster than ngeohash.
 * Times for 1,000,000 iterations
 * | ngeohash | Geohash  |
 * | 0m3.108s | 0m1.675s |
 *
 * @param   {string} geohash - Geohash neighbors are required of.
 * @param   {boolean} asObject - to return as an object or array
 * @returns {{c,n,ne,e,se,s,sw,w,nw: string}|array} - surrounding geohashes
 * @throws  Invalid geohash.
 */
function neighbors( geohash, asObject = false ) {
	const [ n, ne, e, se, s, sw, w, nw ] = [
		neighbor( geohash, 'n' ),
		neighbor( neighbor( geohash, 'n' ), 'e' ),
		neighbor( geohash, 'e' ),
		neighbor( neighbor( geohash, 's' ), 'e' ),
		neighbor( geohash, 's' ),
		neighbor( neighbor( geohash, 's' ), 'w' ),
		neighbor( geohash, 'w' ),
		neighbor( neighbor( geohash, 'n' ), 'w' )
	];
	
	if( asObject ) {
		return { c: geohash, n, ne, e, se, s, sw, w, nw };
	} else {
		return [ n, ne, e, se, s, sw, w, nw ];
	}
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
 * sizeOf( 'dqcjpxetz' );
 * // { geohash: 'dqcjpxetz', precision: 9, width: 4.77, height: 4.77, area: 22.7527 }
 */
function sizeOf( geohash ) {
	if( geohash.length === 0 ) {
		throw new Error( 'Invalid geohash' );
	}
	
	const
		precision         = geohash.length,
		{ width, height } = PRECISION_AREA[ precision ],
		area              = width * height;
	
	return { geohash, precision, width, height, area };
}

/**
 * segmentPolygonToGeohash
 * @description
 * slice a polygon into geohash blocks of specified precision
 * @param {Object} opts - options for Geohash segmentation
 * @param {Array[]} opts.geojson - geojson input ([ [ [ lng, lat ], [ lng, lat ] ] ])
 * @param {number} opts.precision - precision input (1-12)
 * @param {('inside'|'intersect'|'extent')} [opts.hashMode=inside] - geohashes completely within a polygon,
 * midpoints within a polygon, or covering the extent of that polygon
 * @returns {Array} - resulting geohashes covering a polygon
 * @example
 * segmentPolygonToGeohash( {
 * 		geojson: [ [
 * 			[ -122.344774, 47.702877 ],
 *	 		[ -122.344609, 47.697807 ],
 * 			[ -122.349999, 47.697822 ],
 * 			[ -122.350051, 47.702893 ],
 * 			[ -122.344774, 47.702877 ]
 * 		] ],
 *		precision: 6,
 *		hashMode: 'intersect',
 *		threshold: 0.01
 * } );
 * // [ 'c22zru', 'c22zrg' ]
 */
function segmentPolygonToGeohash( opts ) {
	opts.rowMode = true;
	
	const hasher = new Hasher( {
		geojson: opts.geojson,
		precision: opts.precision,
		rowMode: !!opts.rowMode,
		integerMode: !!opts.integerMode,
		hashMode: opts.hashMode,
		threshold: opts.threshold || 0.01
	} );
	
	return hasher.calculate();
}

/**
 * getBBoxStartingPoint
 *
 * Beginning operations for generating a geohash bbox
 *
 * @param {number} minLng
 * @param {number} minLat
 * @param {number} maxLng
 * @param {number} maxLat
 * @param {number} precision
 * @returns {{hashSouthWest: string, lngStep: number, latStep: number}}
 */
function getBBoxStartingPoint( minLng, minLat, maxLng, maxLat, precision = 7 ) {
	const
		hashSouthWest = encode( minLng, minLat, precision ),
		hashNorthEast = encode( maxLng, maxLat, precision ),
		latLng        = decode( hashSouthWest, true ),
		perLng        = latLng.error.lng * 2,
		perLat        = latLng.error.lat * 2,
		boxSouthWest  = geohashToBBox( hashSouthWest ),
		boxNorthEast  = geohashToBBox( hashNorthEast ),
		lngStep       = Math.round( ( boxNorthEast[ 0 ] - boxSouthWest[ 0 ] ) / perLng ),
		latStep       = Math.round( ( boxNorthEast[ 1 ] - boxSouthWest[ 1 ] ) / perLat );
	
	return {
		latStep,
		lngStep,
		hashSouthWest
	};
}

/**
 * Bounding Boxes
 *
 * Return all the geohashs between minLat, minLng, maxLat, maxLng in precision
 *
 * @param {number} minLng - bbox min longitude
 * @param {number} minLat - bbox min latitude
 * @param {number} maxLng - bbox max longitude
 * @param {number} maxLat - bbox max latitude
 * @param {number} precision - geohash precision
 * @returns {Array} - geohash array
 */
function geohashesWithinBBox( minLng, minLat, maxLng, maxLat, precision = 7 ) {
	const
		hashBBox = getBBoxStartingPoint( minLng, minLat, maxLng, maxLat, precision ),
		hashList = [];
	
	const originalHash = hashBBox.hashSouthWest;
	hashList.push( originalHash );
	
	for( let lng = 0, lat = 0; lng <= hashBBox.lngStep; lng++ ) {
		for( ; lat < hashBBox.latStep; lat++ ) {
			const northHash = neighbor( hashList[ hashList.length - 1 ], 'n' );
			hashList.push( northHash );
		}
		
		if( lng + lat !== hashBBox.lngStep + hashBBox.latStep ) {
			const eastHash = neighbor( hashList[ hashList.length - 1 - lat ], 'e' );
			lat            = 0;
			hashList.push( eastHash );
		}
	}
	
	return hashList;
}

/**
 * toGeoJSON
 * @description
 * convert geohash to GeoJSON
 * @param {string} hash - geohash to convert
 * @returns {*} geohash to geojson
 */
function toGeoJSON( hash ) {
	const bbox = geohashToBBox( hash );
	
	return {
		type: 'Feature',
		bbox,
		properties: {},
		geometry: {
			type: 'Polygon',
			coordinates: [
				[
					[ bbox[ 0 ], bbox[ 1 ] ],
					[ bbox[ 2 ], bbox[ 1 ] ],
					[ bbox[ 2 ], bbox[ 3 ] ],
					[ bbox[ 0 ], bbox[ 3 ] ],
					[ bbox[ 0 ], bbox[ 1 ] ]
				]
			]
		}
	};
}

module.exports = {
	BASE32,
	BASE32_DICT,
	PRECISION_AREA,
	NEIGHBOR_CODEX,
	BORDER_CODEX,
	SIGFIG_HASH_LENGTH,
	ENCODE_AUTO,
	MIN_LAT,
	MAX_LAT,
	MIN_LNG,
	MAX_LNG,
	isValidLongitude,
	isValidLatitude,
	encode,
	decode,
	neighbor,
	neighbors,
	geohashToBBox,
	sizeOf,
	segmentPolygonToGeohash,
	getBBoxStartingPoint,
	geohashesWithinBBox,
	toGeoJSON
};
