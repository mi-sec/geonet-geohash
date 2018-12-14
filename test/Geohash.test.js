/** ****************************************************************************************************
 * File: Geohash.test.js
 * Project: geohash
 * @author Nick Soggin <iSkore@users.noreply.github.com> on 12-Dec-2018
 *******************************************************************************************************/
'use strict';

const
	chai    = require( 'chai' ),
	expect  = chai.expect,
	Geohash = require( '../index' );

describe( 'Geohash', () => {
	const
		lat  = 38.889865958353,
		lng  = -77.009049955899,
		hash = 'dqcjpxetzh6q';
	
	it( '[Geohash.base32] should return Geohash-specific Base32 map',
		() => expect( Geohash.BASE32 ).to.eq( '0123456789bcdefghjkmnpqrstuvwxyz' )
	);
	
	it( '[Geohash.encode] should encode lat/lng precision 1',
		() => {
			const
				precision = 1,
				expected  = hash.substr( 0, hash.length - ( 12 - precision ) ),
				actual    = Geohash.encode( lat.toFixed( precision ), lng.toFixed( precision ), precision );
			
			expect( actual ).to.eq( expected );
		}
	);
	
	it( '[Geohash.encode] should encode lat/lng precision 2',
		() => {
			const
				precision = 2,
				expected  = hash.substr( 0, hash.length - ( 12 - precision ) ),
				actual    = Geohash.encode( lat.toFixed( precision ), lng.toFixed( precision ), precision );
			
			expect( actual ).to.eq( expected );
		}
	);
	
	it( '[Geohash.encode] should encode lat/lng precision 3',
		() => {
			const
				precision = 3,
				expected  = hash.substr( 0, hash.length - ( 12 - precision ) ),
				actual    = Geohash.encode( lat.toFixed( precision ), lng.toFixed( precision ), precision );
			
			expect( actual ).to.eq( expected );
		}
	);
	
	it( '[Geohash.encode] should encode lat/lng precision 4',
		() => {
			const
				precision = 4,
				expected  = hash.substr( 0, hash.length - ( 12 - precision ) ),
				actual    = Geohash.encode( lat.toFixed( precision ), lng.toFixed( precision ), precision );
			
			expect( actual ).to.eq( expected );
		}
	);
	
	it( '[Geohash.encode] should encode lat/lng precision 5',
		() => {
			const
				precision = 5,
				expected  = hash.substr( 0, hash.length - ( 12 - precision ) ),
				actual    = Geohash.encode( lat.toFixed( precision ), lng.toFixed( precision ), precision );
			
			expect( actual ).to.eq( expected );
		}
	);
	
	it( '[Geohash.encode] should encode lat/lng precision 6',
		() => {
			const
				precision = 6,
				expected  = hash.substr( 0, hash.length - ( 12 - precision ) ),
				actual    = Geohash.encode( lat.toFixed( precision ), lng.toFixed( precision ), precision );
			
			expect( actual ).to.eq( expected );
		}
	);
	
	it( '[Geohash.encode] should encode lat/lng precision 7',
		() => {
			const
				precision = 7,
				expected  = hash.substr( 0, hash.length - ( 12 - precision ) ),
				actual    = Geohash.encode( lat.toFixed( precision ), lng.toFixed( precision ), precision );
			
			expect( actual ).to.eq( expected );
		}
	);
	
	it( '[Geohash.encode] should encode lat/lng precision 8',
		() => {
			const
				precision = 8,
				expected  = hash.substr( 0, hash.length - ( 12 - precision ) ),
				actual    = Geohash.encode( lat.toFixed( precision ), lng.toFixed( precision ), precision );
			
			expect( actual ).to.eq( expected );
		}
	);
	
	it( '[Geohash.encode] should encode lat/lng precision 9',
		() => {
			const
				precision = 9,
				expected  = hash.substr( 0, hash.length - ( 12 - precision ) ),
				actual    = Geohash.encode( lat.toFixed( precision ), lng.toFixed( precision ), precision );
			
			expect( actual ).to.eq( expected );
		}
	);
	
	it( '[Geohash.encode] should encode lat/lng precision 10',
		() => {
			const
				precision = 10,
				expected  = hash.substr( 0, hash.length - ( 12 - precision ) ),
				actual    = Geohash.encode( lat.toFixed( precision ), lng.toFixed( precision ), precision );
			
			expect( actual ).to.eq( expected );
		}
	);
	
	it( '[Geohash.encode] should encode lat/lng precision 11',
		() => {
			const
				precision = 11,
				expected  = hash.substr( 0, hash.length - ( 12 - precision ) ),
				actual    = Geohash.encode( lat.toFixed( precision ), lng.toFixed( precision ), precision );
			
			expect( actual ).to.eq( expected );
		}
	);
	
	it( '[Geohash.encode] should encode lat/lng precision 12',
		() => {
			const
				precision = 12,
				expected  = hash.substr( 0, hash.length - ( 12 - precision ) ),
				actual    = Geohash.encode( lat.toFixed( precision ), lng.toFixed( precision ), precision );
			
			expect( actual ).to.eq( expected );
		}
	);
	
	it( '[Geohash.decode] should decode hash into lat/lng precision 1',
		() => {
			const
				expected = { lat: 23, lng: -68 },
				actual   = Geohash.decode( 'd' );
			
			expect( actual ).to.deep.eq( expected );
		}
	);
	
	it( '[Geohash.decode] should decode hash into lat/lng precision 2',
		() => {
			const
				expected = { lat: 36.6, lng: -73 },
				actual   = Geohash.decode( 'dq' );
			
			expect( actual ).to.deep.eq( expected );
		}
	);
	
	it( '[Geohash.decode] should decode hash into lat/lng precision 3',
		() => {
			const
				expected = { lat: 38.7, lng: -76.6 },
				actual   = Geohash.decode( 'dqc' );
			
			expect( actual ).to.deep.eq( expected );
		}
	);
	
	it( '[Geohash.decode] should decode hash into lat/lng precision 4',
		() => {
			const
				expected = { lat: 38.94, lng: -77.17 },
				actual   = Geohash.decode( 'dqcj' );
			
			expect( actual ).to.deep.eq( expected );
		}
	);
	
	it( '[Geohash.decode] should decode hash into lat/lng precision 5',
		() => {
			const
				expected = { lat: 38.87, lng: -77.014 },
				actual   = Geohash.decode( 'dqcjp' );
			
			expect( actual ).to.deep.eq( expected );
		}
	);
	
	it( '[Geohash.decode] should decode hash into lat/lng precision 6',
		() => {
			const
				expected = { lat: 38.8889, lng: -77.009 },
				actual   = Geohash.decode( 'dqcjpx' );
			
			expect( actual ).to.deep.eq( expected );
		}
	);
	
	it( '[Geohash.decode] should decode hash into lat/lng precision 7',
		() => {
			const
				expected = { lat: 38.8895, lng: -77.0094 },
				actual   = Geohash.decode( 'dqcjpxe' );
			
			expect( actual ).to.deep.eq( expected );
		}
	);
	
	it( '[Geohash.decode] should decode hash into lat/lng precision 8',
		() => {
			const
				expected = { lat: 38.8898, lng: -77.00918 },
				actual   = Geohash.decode( 'dqcjpxet' );
			
			expect( actual ).to.deep.eq( expected );
		}
	);
	
	it( '[Geohash.decode] should decode hash into lat/lng precision 9',
		() => {
			const
				expected = { lat: 38.889863, lng: -77.009032 },
				actual   = Geohash.decode( 'dqcjpxetz' );
			
			expect( actual ).to.deep.eq( expected );
		}
	);
	
	it( '[Geohash.decode] should decode hash into lat/lng precision 10',
		() => {
			const
				expected = { lat: 38.8898662, lng: -77.009048 },
				actual   = Geohash.decode( 'dqcjpxetzh' );
			
			expect( actual ).to.deep.eq( expected );
		}
	);
	
	it( '[Geohash.decode] should decode hash into lat/lng precision 11',
		() => {
			const
				expected = { lat: 38.8898655, lng: -77.0090499 },
				actual   = Geohash.decode( 'dqcjpxetzh6' );
			
			expect( actual ).to.deep.eq( expected );
		}
	);
	
	it( '[Geohash.decode] should decode hash into lat/lng precision 12',
		() => {
			const
				expected = { lat: 38.88986592, lng: -77.00905005 },
				actual   = Geohash.decode( 'dqcjpxetzh6q' );
			
			expect( actual ).to.deep.eq( expected );
		}
	);
	
	it( '[Geohash.neighbors] should get hash neighbors',
		() => {
			const
				expected = {
					nw: 'dqcjpxetzh6p',
					n: 'dqcjpxetzh6r',
					ne: 'dqcjpxetzh6x',
					w: 'dqcjpxetzh6n',
					c: 'dqcjpxetzh6q',
					e: 'dqcjpxetzh6w',
					sw: 'dqcjpxetzh6j',
					s: 'dqcjpxetzh6m',
					se: 'dqcjpxetzh6t'
				},
				actual   = Geohash.neighbors( 'dqcjpxetzh6q' );
			
			expect( actual ).to.deep.eq( expected );
		}
	);
} );
