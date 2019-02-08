/** ****************************************************************************************************
 * File: geohashToBBox.test.js
 * Project: geohash
 * @author Nick Soggin <iSkore@users.noreply.github.com> on 08-Feb-2019
 *******************************************************************************************************/
'use strict';

const { point, featureCollection } = require( '@turf/helpers' );
const { default: midpoint }        = require( '@turf/midpoint' );
const { default: bbox }            = require( '@turf/bbox' );
const { default: bboxPolygon }     = require( '@turf/bbox-polygon' );

// u120fxw
// { lng: 0.1188, lat: 52.205 }

var point1 = point( [ 0.11810302734375, 52.20428466796875 ] );
var point2 = point( [ 0.119476318359375, 52.205657958984375 ] );


const x = [];
x.push( midpoint( point1, point2 ) );
x.push( bboxPolygon( [ 0.11810302734375, 52.20428466796875, 0.119476318359375, 52.205657958984375 ] ) );

console.log( featureCollection( x ) );
