import stream from 'stream';
import buffer from 'buffer';

const { Buffer } = buffer;

export const bufferStream = entry => {
    return new Promise(function (resolve, reject) {
        let entryBuffer = Buffer.from('');
        const bufferStream = stream
            .Transform()
            .on('finish', function () {
                resolve(entryBuffer);
            })
            .on('error', reject);

        bufferStream._transform = function (d, e, cb) {
            entryBuffer = Buffer.concat([entryBuffer, d]);
            cb();
        };
        entry.on('error', reject).pipe(bufferStream);
    });
};