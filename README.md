<h1 align="center" style="border-bottom: none;">⚒️ tar-parse-one</h1>

<h3 align="center">Parse a single file from tar.gz archive and pipe contents</h3>

<p align="center">
        <a href="./LICENSE">
    <img alt="license" src="https://img.shields.io/badge/license-ISC-blue.svg" />
  </a> <a href="https://requirejs.org/docs/commonjs.html">
      <img alt="commonjs module" src="https://img.shields.io/badge/module-CommonJS-blue" />
    </a> <a href="https://www.npmjs.com/package/tar-parse-one">
    <img alt="npm version" src="https://img.shields.io/npm/v/tar-parse-one.svg?style=flat" />
  </a> <a href="https://www.npmjs.com/package/tar-parse-one">
    <img alt="npm downloads" src="https://img.shields.io/npm/dt/tar-parse-one.svg?style=flat" />
  </a>
    </p>

## Install
```
npm install --save tar-parse-one
```

or

```
yarn install tar-parse-one
```
  

## Import module
```js
const parseOne = require('tar-parse-one');
```

or

```js
import parseOne from 'tar-parse-one';
```
  

## Usage
`parseOne([regex])` is a convenience method that unpacks only one file from the archive and pipes the contents down (not the entry itself).  If no search criteria is specified, the first file in the archive will be unpacked.  Otherwise, each filename will be compared to the criteria and the first one to match will be unpacked and piped down.  If no file matches then the the stream will end without any content.

Example:

```js
fs.createReadStream('path/to/archive.tar.gz')
  .pipe(parseOne())
  .pipe(fs.createWriteStream('firstFile.txt'));
```
  

## Build
```
npm run build // for single build

npm run watch // to watch changes
```

or

```
yarn build // for single build

yarn watch // to watch changes
```
  

## Author

[Sergey Frangulov](mailto:sergey.frangulov@gmail.com)

## License
ISC License

Copyright (c) 2020 Sergey Frangulov

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
  