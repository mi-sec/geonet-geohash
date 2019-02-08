/** ****************************************************************************************************
 * File: geohash.decode.js
 * Project: geohash
 * @author Nick Soggin <iSkore@users.noreply.github.com> on 08-Feb-2019
 *******************************************************************************************************/
'use strict';

const
	chai       = require( 'chai' ),
	expect     = chai.expect,
	{ decode } = require( '../index' );

describe( '[geohash.decode]', () => {
	it( 'should decode hash into lng/lat precision 1',
		() => {
			const
				expected = { lng: -68, lat: 23 },
				actual   = decode( 'd' );
			
			expect( actual ).to.deep.eq( expected );
		}
	);
	
	it( 'should decode hash into lng/lat precision 2',
		() => {
			const
				expected = { lng: -73, lat: 36.6 },
				actual   = decode( 'dq' );
			
			expect( actual ).to.deep.eq( expected );
		}
	);
	
	it( 'should decode hash into lng/lat precision 3',
		() => {
			const
				expected = { lng: -76.6, lat: 38.7 },
				actual   = decode( 'dqc' );
			
			expect( actual ).to.deep.eq( expected );
		}
	);
	
	it( 'should decode hash into lng/lat precision 4',
		() => {
			const
				expected = { lng: -77.17, lat: 38.94 },
				actual   = decode( 'dqcj' );
			
			expect( actual ).to.deep.eq( expected );
		}
	);
	
	it( 'should decode hash into lng/lat precision 5',
		() => {
			const
				expected = { lng: -77.014, lat: 38.87 },
				actual   = decode( 'dqcjp' );
			
			expect( actual ).to.deep.eq( expected );
		}
	);
	
	it( 'should decode hash into lng/lat precision 6',
		() => {
			const
				expected = { lng: -77.009, lat: 38.8889 },
				actual   = decode( 'dqcjpx' );
			
			expect( actual ).to.deep.eq( expected );
		}
	);
	
	it( 'should decode hash into lng/lat precision 7',
		() => {
			const
				expected = { lng: -77.0094, lat: 38.8895 },
				actual   = decode( 'dqcjpxe' );
			
			expect( actual ).to.deep.eq( expected );
		}
	);
	
	it( 'should decode hash into lng/lat precision 8',
		() => {
			const
				expected = { lng: -77.00918, lat: 38.8898 },
				actual   = decode( 'dqcjpxet' );
			
			expect( actual ).to.deep.eq( expected );
		}
	);
	
	it( 'should decode hash into lng/lat precision 9',
		() => {
			const
				expected = { lng: -77.009032, lat: 38.889863 },
				actual   = decode( 'dqcjpxetz' );
			
			expect( actual ).to.deep.eq( expected );
		}
	);
	
	it( 'should decode hash into lng/lat precision 10',
		() => {
			const
				expected = { lng: -77.009048, lat: 38.8898662 },
				actual   = decode( 'dqcjpxetzh' );
			
			expect( actual ).to.deep.eq( expected );
		}
	);
	
	it( 'should decode hash into lng/lat precision 11',
		() => {
			const
				expected = { lng: -77.0090499, lat: 38.8898655 },
				actual   = decode( 'dqcjpxetzh6' );
			
			expect( actual ).to.deep.eq( expected );
		}
	);
	
	it( 'should decode hash into lng/lat precision 12',
		() => {
			const
				expected = { lng: -77.00905005, lat: 38.88986592 },
				actual   = decode( 'dqcjpxetzh6q' );
			
			expect( actual ).to.deep.eq( expected );
		}
	);
} );
