# @parellin/geohash

[![NPM](https://nodei.co/npm/@parellin/geohash.png?downloads=true&stars=true&downloadRank=true)](https://www.npmjs.com/package/@parellin/lightmap)

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

`npm i @parellin/geohash`

### Usage

**Basic usage:**
```
const Geohash = require( '@parellin/geohash' );

const geohash = Geohash.encode( 38.866, -77.480, 7 ); // geohash: 'dqbvhgk'
```

### `encode`

Encodes latitude/longitude to geohash, either to specified precision or to automatically evaluated precision.

**params**
- `lat` {number} Latitude in degrees.
- `lng` {number} Longitude in degrees.
- `precision` {number} Number of characters in resulting geohash.

**returns**: Geohash of supplied latitude/longitude.

```javascript
const geohash = Geohash.encode( 38.8665, -77.480, 7 ); // geohash: 'dqbvhgk'
```

### `decode`

Decode geohash to latitude/longitude (location is approximate centre of geohash cell, to reasonable precision).
	 
**params**
- `geohash` {string} Geohash string to be converted to latitude/longitude.

**returns**: (Center of) geohashed location.

```javascript
const latlng = Geohash.decode( 'dqbvhgk' ); // latlng: { lat: 38.8662, lng: -77.4804 }
```

### `neighbors`

Returns all 8 adjacent cells to specified geohash.

**params**
- `geohash` {string} Geohash neighbors are required of.

**returns**: surrounding geohashes

```javascript
const latlng = Geohash.neighbors( 'dqcjpxetzh6q' );
// {
// 		nw: 'dqcjpxetzh6p',
// 		n: 'dqcjpxetzh6r',
// 		ne: 'dqcjpxetzh6x',
// 		w: 'dqcjpxetzh6n',
// 		c: 'dqcjpxetzh6q',
// 		e: 'dqcjpxetzh6w',
// 		sw: 'dqcjpxetzh6j',
// 		s: 'dqcjpxetzh6m',
// 		se: 'dqcjpxetzh6t'
// }
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
