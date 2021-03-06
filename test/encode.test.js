/** ****************************************************************************************************
 * File: geohash.encode.js
 * Project: geohash
 * @author Nick Soggin <iSkore@users.noreply.github.com> on 08-Feb-2019
 *******************************************************************************************************/
'use strict';


const
	chai       = require( 'chai' ),
	expect     = chai.expect,
	{ encode } = require( '../index' );

describe( '[geohash.encode]', () => {
	const
		lng  = -77.009049955899,
		lat  = 38.889865958353,
		hash = 'dqcjpxetzh6q';

	it( 'should throw error "Invalid value for `lng`"',
		() => {
			const
				expected = 'Invalid value for `lng`',
				actual   = () => encode( 'abc', 'abc', 'abc' );

			expect( actual ).to.throw( expected );
		}
	);

	it( 'should throw error "Invalid value for `lat`"',
		() => {
			const
				expected = 'Invalid value for `lat`',
				actual   = () => encode( lng, 'abc', 'abc' );

			expect( actual ).to.throw( expected );
		}
	);

	it( 'should throw error "Invalid value for `precision`"',
		() => {
			const
				expected = 'Invalid value for `precision`',
				actual   = () => encode( lng, lat, 'abc' );

			expect( actual ).to.throw( expected );
		}
	);

	it( 'should encode lng/lat precision 1 (should select ENCODE_AUTO as default precision; precision expected to assume 3)',
		() => {
			const
				expected  = hash.substr( 0, hash.length - 9 ),
				actual    = encode( +lng.toFixed( 1 ), +lat.toFixed( 1 ) );

			expect( actual ).to.eq( expected );
		}
	);

	it( 'should encode lng/lat precision 1',
		() => {
			const
				precision = 1,
				expected  = hash.substr( 0, hash.length - ( 12 - precision ) ),
				actual    = encode( +lng.toFixed( precision ), +lat.toFixed( precision ), precision );

			expect( actual ).to.eq( expected );
		}
	);

	it( 'should encode lng/lat precision 2',
		() => {
			const
				precision = 2,
				expected  = hash.substr( 0, hash.length - ( 12 - precision ) ),
				actual    = encode( +lng.toFixed( precision ), +lat.toFixed( precision ), precision );

			expect( actual ).to.eq( expected );
		}
	);

	it( 'should encode lng/lat precision 3',
		() => {
			const
				precision = 3,
				expected  = hash.substr( 0, hash.length - ( 12 - precision ) ),
				actual    = encode( +lng.toFixed( precision ), +lat.toFixed( precision ), precision );

			expect( actual ).to.eq( expected );
		}
	);

	it( 'should encode lng/lat precision 4',
		() => {
			const
				precision = 4,
				expected  = hash.substr( 0, hash.length - ( 12 - precision ) ),
				actual    = encode( +lng.toFixed( precision ), +lat.toFixed( precision ), precision );

			expect( actual ).to.eq( expected );
		}
	);

	it( 'should encode lng/lat precision 5',
		() => {
			const
				precision = 5,
				expected  = hash.substr( 0, hash.length - ( 12 - precision ) ),
				actual    = encode( +lng.toFixed( precision ), +lat.toFixed( precision ), precision );

			expect( actual ).to.eq( expected );
		}
	);

	it( 'should encode lng/lat precision 6',
		() => {
			const
				precision = 6,
				expected  = hash.substr( 0, hash.length - ( 12 - precision ) ),
				actual    = encode( +lng.toFixed( precision ), +lat.toFixed( precision ), precision );

			expect( actual ).to.eq( expected );
		}
	);

	it( 'should encode lng/lat precision 7',
		() => {
			const
				precision = 7,
				expected  = hash.substr( 0, hash.length - ( 12 - precision ) ),
				actual    = encode( +lng.toFixed( precision ), +lat.toFixed( precision ), precision );

			expect( actual ).to.eq( expected );
		}
	);

	it( 'should encode lng/lat precision 8',
		() => {
			const
				precision = 8,
				expected  = hash.substr( 0, hash.length - ( 12 - precision ) ),
				actual    = encode( +lng.toFixed( precision ), +lat.toFixed( precision ), precision );

			expect( actual ).to.eq( expected );
		}
	);

	it( 'should encode lng/lat precision 9',
		() => {
			const
				precision = 9,
				expected  = hash.substr( 0, hash.length - ( 12 - precision ) ),
				actual    = encode( +lng.toFixed( precision ), +lat.toFixed( precision ), precision );

			expect( actual ).to.eq( expected );
		}
	);

	it( 'should encode lng/lat precision 10',
		() => {
			const
				precision = 10,
				expected  = hash.substr( 0, hash.length - ( 12 - precision ) ),
				actual    = encode( +lng.toFixed( precision ), +lat.toFixed( precision ), precision );

			expect( actual ).to.eq( expected );
		}
	);

	it( 'should encode lng/lat precision 11',
		() => {
			const
				precision = 11,
				expected  = hash.substr( 0, hash.length - ( 12 - precision ) ),
				actual    = encode( +lng.toFixed( precision ), +lat.toFixed( precision ), precision );

			expect( actual ).to.eq( expected );
		}
	);

	it( 'should encode lng/lat precision 12',
		() => {
			const
				precision = 12,
				expected  = hash.substr( 0, hash.length - ( 12 - precision ) ),
				actual    = encode( +lng.toFixed( precision ), +lat.toFixed( precision ), precision );

			expect( actual ).to.eq( expected );
		}
	);
} );
