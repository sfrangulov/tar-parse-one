import stream from 'stream';

import gunzip from 'gunzip-maybe';
import tar from 'tar-stream';
import duplexer2 from 'duplexer2';

import { bufferStream } from './bufferStream';

const { extract } = tar;

export const parseOne = match => {
    const inStream = stream.PassThrough({ objectMode: true });
    const outStream = stream.PassThrough();
    const re = match instanceof RegExp ? match : match && new RegExp(match);
    let found;

    inStream
        .pipe(gunzip())
        .pipe(extract())
        .on('error', function (err) {
            outStream.emit('error', err);
        })
        .on('entry', function (entry, stream, cb) {
            if (found || (re && !re.exec(entry.name))) {
                stream.resume();
                cb();
            } else {
                found = true;
                out.emit('entry', stream);
                stream.on('error', function (e) {
                    outStream.emit('error', e);
                });
                stream
                    .pipe(outStream)
                    .on('error', function (err) {
                        cb(err);
                    })
                    .on('end', function () {
                        cb();
                    });
            }
        })
        .on('error', Object)
        .on('finish', function () {
            if (!found) {
                outStream.emit('error', new Error('PATTERN_NOT_FOUND'));
            } else {
                outStream.end();
            }
        });

    const out = duplexer2(inStream, outStream);
    out.buffer = function () {
        return bufferStream(outStream);
    };

    return out;
};