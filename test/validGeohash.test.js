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
	it( 'should get the width, height, area, and precision of a geohash',
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
			expect( validGeohash( 'dqZcjpxet' ) ).to.eq( false );
			expect( validGeohash( 'dqaZcjpxet' ) ).to.eq( false );
			expect( validGeohash( 'dqacjpxet' ) ).to.eq( false );
			expect( validGeohash( 'dqa@jpxet' ) ).to.eq( false );
		}
	);
} );
