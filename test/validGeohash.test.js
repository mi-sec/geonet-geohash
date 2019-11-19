/** ****************************************************************************************************
 * File: validGeohash.test.js
 * Project: geonet-geohash
 * @author Nick Soggin <iSkore@users.noreply.github.com> on 12-Apr-2019
 *******************************************************************************************************/
'use strict';

const
	chai             = require( 'chai' ),
	expect           = chai.expect,
	{ validGeohash } = require( '../index' );

describe( '[geohash.validGeohash]', () => {
	it( 'should check if a geohash passes the regex as an acceptable format',
		() => {
			expect( validGeohash( 'd' ) ).to.eq( true );
			expect( validGeohash( 'dq' ) ).to.eq( true );
			expect( validGeohash( 'dqc' ) ).to.eq( true );
			expect( validGeohash( 'dqcj' ) ).to.eq( true );
			expect( validGeohash( 'dqcjp' ) ).to.eq( true );
			expect( validGeohash( 'dqcjpx' ) ).to.eq( true );
			expect( validGeohash( 'dqcjpxe' ) ).to.eq( true );
			expect( validGeohash( 'dqcjpxet' ) ).to.eq( true );
			expect( validGeohash( 'dqcjpxetz' ) ).to.eq( true );
			expect( validGeohash( 'dqcjpxetzh' ) ).to.eq( true );
			expect( validGeohash( 'dqcjpxetzh6' ) ).to.eq( true );
			expect( validGeohash( 'dqcjpxetzh6q' ) ).to.eq( true );
		}
	);

	it( 'should check if a geohash fails the regex check',
		() => {
			// uppercase characters are not allowed
			expect( validGeohash( 'dqaZcjpxet' ) ).to.eq( false );

			// special characters are not allowed
			expect( validGeohash( 'dqa@jpxet' ) ).to.eq( false );

			// `a` is not a valid character
			expect( validGeohash( 'ps1a0b2u1sdd' ) ).to.eq( false );

			// `i` is not a valid character
			expect( validGeohash( 'ps1i0b2u1sdd' ) ).to.eq( false );

			// `l` is not a valid character
			expect( validGeohash( 'ps1l0b2u1sdd' ) ).to.eq( false );

			// `o` is not a valid character
			expect( validGeohash( 'ps1o0b2u1sdd' ) ).to.eq( false );

			// to many characters
			expect( validGeohash( 'dqcjpxetzh6qq' ) ).to.eq( false );
		}
	);
} );
