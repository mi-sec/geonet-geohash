/** ****************************************************************************************************
 * File: index.test.js
 * Project: geohash
 * @author Nick Soggin <iSkore@users.noreply.github.com> on 10-Dec-2018
 *******************************************************************************************************/
'use strict';

const
	chai    = require( 'chai' ),
	expect  = chai.expect,
	Geohash = require( '../index' );

describe( '@parellin/geohash', () => {
	it( '[Geohash] should return Geohash class',
		() => expect( Geohash.name ).to.eq( 'Geohash' )
	);
} );
