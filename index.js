/** ****************************************************************************************************
 * File: index.js
 * Project: geohash
 * @author Nick Soggin <iSkore@users.noreply.github.com> on 10-Dec-2018
 *******************************************************************************************************/
'use strict';

const
	{
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
	} = require( './src/variables' );

const
	{
		longitudeClamp,
		latitudeClamp,
		longitudeClampRelative,
		latitudeClampRelative,
		determinePrecision,
		determineDirection
	} = require( './src/utils' );

module.exports = {
	BASE32,
	BASE32_DICT,
	PRECISION_AREA,
	NEIGHBOR_CODEX,
	BORDER_CODEX,
	SIGFIG_HASH_LENGTH,
	ENCODE_AUTO,
	MIN_LNG,
	MIN_LAT,
	MAX_LNG,
	MAX_LAT,
	longitudeClamp,
	latitudeClamp,
	longitudeClampRelative,
	latitudeClampRelative,
	determinePrecision,
	determineDirection,
	decode: require( './src/decode' ),
	encode: require( './src/encode' ),
	geohashesWithinBBox: require( './src/geohashesWithinBBox' ),
	geohashesWithinBBoxToGeoJSON: require( './src/geohashesWithinBBoxToGeoJSON' ),
	geohashToBBox: require( './src/geohashToBBox' ),
	getBBoxStartingPoint: require( './src/getBBoxStartingPoint' ),
	neighbor: require( './src/neighbor' ),
	neighbors: require( './src/neighbors' ),
	sizeOf: require( './src/sizeOf' ),
	toGeoJSON: require( './src/toGeoJSON' ),
	GeohashStream: require( './src/GeohashStream' ),
	GeohashStreamGeoJSON: require( './src/GeohashStreamGeoJSON' ),
	validGeohash: require( './src/validGeohash' )
};
