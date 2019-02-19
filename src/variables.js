/** ****************************************************************************************************
 * File: variables.js
 * Project: geohash
 * @author Nick Soggin <iSkore@users.noreply.github.com> on 19-Feb-2019
 *******************************************************************************************************/
'use strict';

const
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
	MIN_LNG        = -180,
	MIN_LAT        = -90,
	MAX_LNG        = 180,
	MAX_LAT        = 90;

/**
 * Significant Figure Hash Length
 *
 * This is a quick and dirty lookup to figure out how long our hash should be in order to guarantee a certain amount
 * of trailing significant figures.
 * This was calculated by determining the error: 45/2^(n-1) where n is the number of bits for a latitude or longitude.
 * Key is number of desired sig figs, value is minimum length of the geohash.
 * @type Array
 */
const
	SIGFIG_HASH_LENGTH = [ 0, 5, 7, 8, 11, 12, 13, 15, 16, 17, 18 ];

module.exports = {
	BASE32,
	BASE32_DICT,
	PRECISION_AREA,
	NEIGHBOR_CODEX,
	BORDER_CODEX,
	ENCODE_AUTO,
	MIN_LNG,
	MIN_LAT,
	MAX_LNG,
	MAX_LAT,
	SIGFIG_HASH_LENGTH
};
