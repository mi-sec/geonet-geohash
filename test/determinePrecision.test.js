/** ****************************************************************************************************
 * File: determinePrecision.test.js
 * Project: geohash
 * @author Nick Soggin <iSkore@users.noreply.github.com> on 08-Feb-2019
 *******************************************************************************************************/
'use strict';

const
	chai   = require( 'chai' ),
	expect = chai.expect;

const
	{ determinePrecision } = require( '../index' );

describe( '[geohash.determinePrecision]', () => {
	it( 'should return the passed in value for a latitude value in range',
		() => {
			expect( determinePrecision( 180, 90 ) ).to.eq( 0 );
			expect( determinePrecision( -77, 38.9 ) ).to.eq( 3 );
			expect( determinePrecision( -77.01, 38.89 ) ).to.eq( 5 );
			expect( determinePrecision( -77.009, 38.89 ) ).to.eq( 6 );
			expect( determinePrecision( -77.009, 38.8899 ) ).to.eq( 7 );
			expect( determinePrecision( -77.00905, 38.88987 ) ).to.eq( 8 );
			expect( determinePrecision( -77.00905, 38.889866 ) ).to.eq( 9 );
			expect( determinePrecision( -77.00904996, 38.88986596 ) ).to.eq( 11 );
			expect( determinePrecision( -77.009049956, 38.889865958 ) ).to.eq( 12 );
			expect( determinePrecision( -77.009049955899, 38.889865958353 ) ).to.eq( 12 );
		}
	);
} );
