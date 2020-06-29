# @geonet/geohash

[![NPM](https://nodei.co/npm/@geonet/geohash.png?downloads=true&stars=true&downloadRank=true)](https://www.npmjs.com/package/@geonet/geohash)

Geohash decode/encoder

| Precision | Width       | Height      |
|:---------:|:-----------:|:-----------:|
| 1         | `≤ 5,000km` | `× 5,000km` |
| 2         | `≤ 1,250km` | `× 625km`   |
| 3         | `≤ 156km`   | `× 156km`   |
| 4         | `≤ 39.1km`  | `× 19.5km`  |
| 5         | `≤ 4.89km`  | `× 4.89km`  |
| 6         | `≤ 1.22km`  | `× 0.61km`  |
| 7         | `≤ 153m`    | `× 153m`    |
| 8         | `≤ 38.2m`   | `× 19.1m`   |
| 9         | `≤ 4.77m`   | `× 4.77m`   |
| 10        | `≤ 1.19m`   | `× 0.596m`  |
| 11        | `≤ 149mm`   | `× 149mm`   |
| 12        | `≤ 37.2mm`  | `× 18.6mm`  |

### Installation

`npm i @geonet/geohash`

##### Deployment

```
npm run lint
npm run test
rm -rf docs/ && npm run docs
npm run build
np
```

### Usage

**Basic usage:**
```
const Geohash = require( '@geonet/geohash' );
const hash = Geohash.encode( -77.480, 38.866, 7 ); // hash: 'dqbvhgk'
```

### `encode`

Encodes longitude/latitude to geohash, either to specified precision or to automatically evaluated precision.

**params**
- `lng` {number} Longitude in degrees.
- `lat` {number} Latitude in degrees.
- `precision` {number} Number of characters in resulting geohash.

**returns**: Geohash of supplied longitude/latitude.

```javascript
const hash = Geohash.encode( -77.480, 38.866, 7 ); // hash: 'dqbvhgk'
```

### `decode`

Decode geohash to longitude/latitude (location is approximate center of geohash cell, to reasonable precision).
	 
**params**
- `geohash` {string} Geohash string to be converted to longitude/latitude.

**returns**: (Center of) geohashed location.

```javascript
const latlng = Geohash.decode( 'dqbvhgk' ); // latlng: { lng: -77.4804, lat: 38.8662 }
```

### `neighbors`

Returns 8 adjacent cells to specified geohash.

**params**
- `geohash` {string} Geohash to find neighbors of.
- `asObject` {boolean} return geohashes in an object (`{c,n,ne,e,se,s,sw,w,nw}`)

**returns**: surrounding geohashes

```javascript
const latlng = Geohash.neighbors( 'dqcjpxetzh6q' );
[
	'dqcjpxetzh6r', 'dqcjpxetzh6x', 'dqcjpxetzh6w', 'dqcjpxetzh6t',
	'dqcjpxetzh6m', 'dqcjpxetzh6j', 'dqcjpxetzh6n', 'dqcjpxetzh6p'
]
```

Example:

`Geohash.neighbors( 'dqcjpxetzh6q' );`

```
           ┬────────────────────────────────────────────────────┐
           │      'west'          'center'         'east'       │
┼──────────┼────────────────────────────────────────────────────┤
│ 'north'  │   'dqcjpxetzh6p'  'dqcjpxetzh6r'  'dqcjpxetzh6x'   │
│ 'center' │   'dqcjpxetzh6n'  'dqcjpxetzh6q'  'dqcjpxetzh6w'   │
│ 'south'  │   'dqcjpxetzh6j'  'dqcjpxetzh6m'  'dqcjpxetzh6t'   │
┴──────────┴────────────────────────────────────────────────────┘
```

### GeohashStream

`GeohashStream` takes in a BBox and streams geohashes within that bbox.

**params**
- `minLng` {number} bbox min longitude
- `minLat` {number} bbox min latitude
- `maxLng` {number} bbox max longitude
- `maxLat` {number} bbox max latitude
- `precision` {number=7} geohash precision (defaults to 7)

```javascript
new Geohash.GeohashStream( 0.1, 52.2, 0.2, 52.3, 3 )
	.on( 'data', d => console.log( d.toString() ) )
	.on( 'end', () => console.log( 'done' ) );

// u12
```

### GeohashStreamGeoJSON

`GeohashStreamGeoJSON` is the same as `GeohashStream` but streams back GeoJSON

**params**
- `minLng` {number} bbox min longitude
- `minLat` {number} bbox min latitude
- `maxLng` {number} bbox max longitude
- `maxLat` {number} bbox max latitude
- `precision` {number=7} geohash precision (defaults to 7)

```javascript
new Geohash.GeohashStreamGeoJSON( 0.1, 52.2, 0.2, 52.3, 3 )
	.on( 'data', d => console.log( d.toString() ) )
	.on( 'end', () => console.log( 'done' ) );

// {
// 	"type": "Feature",
// 	"bbox": [ 0, 52.03125, 1.40625, 53.4375 ],
// 	"properties": {},
// 	"geometry": {
// 		"type": "Polygon",
// 		"coordinates": [ [
// 			[ 0, 52.03125 ],
// 			[ 1.40625, 52.03125 ],
// 			[ 1.40625, 53.4375 ],
// 			[ 0, 53.4375 ],
// 			[ 0, 52.03125 ]
// 		] ]
// 	}
// }
```










