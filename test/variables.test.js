/** ****************************************************************************************************
 * File: geohash.variables.js
 * Project: geohash
 * @author Nick Soggin <iSkore@users.noreply.github.com> on 08-Feb-2019
 *******************************************************************************************************/
'use strict';

const
	chai   = require( 'chai' ),
	expect = chai.expect;

const
	{
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
		MAX_LNG
	} = require( '../index' );

describe( 'geohash variables', () => {
	it( '[geohash.BASE32] should return Geohash-specific Base32 map',
		() => expect( BASE32 ).to.eq( '0123456789bcdefghjkmnpqrstuvwxyz' )
	);

	it( '[geohash.BASE32_DICT] should return Geohash-specific Base32 map in a hex object',
		() => expect( BASE32_DICT ).to.deep.eq( {
			0: 0x0, 1: 0x1, 2: 0x2, 3: 0x3, 4: 0x4, 5: 0x5, 6: 0x6, 7: 0x7,
			8: 0x8, 9: 0x9, b: 0xA, c: 0xB, d: 0xC, e: 0xD, f: 0xE, g: 0xF,
			h: 0x10, j: 0x11, k: 0x12, m: 0x13, n: 0x14, p: 0x15, q: 0x16, r: 0x17,
			s: 0x18, t: 0x19, u: 0x1A, v: 0x1B, w: 0x1C, x: 0x1D, y: 0x1E, z: 0x1F
		} )
	);

	it( '[geohash.PRECISION_AREA] should return Geohash-specific precision mapping to meters',
		() => expect( PRECISION_AREA ).to.deep.eq( {
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
		} )
	);

	it( '[geohash.NEIGHBOR_CODEX] should return neighbor codex of regional lng/lat neighbor navigation',
		() => expect( NEIGHBOR_CODEX ).to.deep.eq( {
			n: [ 'p0r21436x8zb9dcf5h7kjnmqesgutwvy', 'bc01fg45238967deuvhjyznpkmstqrwx' ],
			s: [ '14365h7k9dcfesgujnmqp0r2twvyx8zb', '238967debc01fg45kmstqrwxuvhjyznp' ],
			e: [ 'bc01fg45238967deuvhjyznpkmstqrwx', 'p0r21436x8zb9dcf5h7kjnmqesgutwvy' ],
			w: [ '238967debc01fg45kmstqrwxuvhjyznp', '14365h7k9dcfesgujnmqp0r2twvyx8zb' ]
		} )
	);

	it( '[geohash.BORDER_CODEX] should return border codex of the neighbor codex borders',
		() => expect( BORDER_CODEX ).to.deep.eq( {
			n: [ 'prxz', 'bcfguvyz' ],
			s: [ '028b', '0145hjnp' ],
			e: [ 'bcfguvyz', 'prxz' ],
			w: [ '0145hjnp', '028b' ]
		} )
	);

	it( '[geohash.SIGFIG_HASH_LENGTH] should return a Significant Figure Hash Length',
		() => expect( SIGFIG_HASH_LENGTH ).to.deep.eq( [ 0, 5, 7, 8, 11, 12, 13, 15, 16, 17, 18 ] )
	);

	it( '[geohash.ENCODE_AUTO] should return a flag that allows "precision estimation"',
		() => expect( ENCODE_AUTO ).to.eq( -1 )
	);

	it( '[geohash.MIN_LNG] should return minimum allowed longitude',
		() => expect( MIN_LNG ).to.eq( -180 )
	);

	it( '[geohash.MIN_LAT] should return minimum allowed latitude',
		() => expect( MIN_LAT ).to.eq( -90 )
	);

	it( '[geohash.MAX_LNG] should return maximum allowed longitude',
		() => expect( MAX_LNG ).to.eq( 180 )
	);

	it( '[geohash.MAX_LAT] should return maximum allowed latitude',
		() => expect( MAX_LAT ).to.eq( 90 )
	);
} );
