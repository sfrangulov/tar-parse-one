import fs from 'fs';
import path from 'path';

import streamBuffers from "stream-buffers";

import pipeline from '../src/pipeline.js'

import { parseOne } from '../src/parseOne.js';

const archive = './__tests__/test_data/file.tar.gz';
const unpackedFile = './__tests__/test_data/unpacked/file.txt';

describe("parseOne function", () => {
    test("pipe first file entry out of a tar.gz archive", () => {
        expect.assertions(1);
        const writableStream = new streamBuffers.WritableStreamBuffer();
        return pipeline(fs.createReadStream(archive), parseOne(), writableStream).then(() => {
            const fileStr = fs.readFileSync(path.join(unpackedFile), 'utf8');
            expect(writableStream.getContentsAsString('utf8')).toEqual(fileStr);
        })
    });

    test("pipe named file entry out of a tar.gz archive", () => {
        expect.assertions(1);
        const writableStream = new streamBuffers.WritableStreamBuffer();
        return pipeline(fs.createReadStream(archive), parseOne('file.txt'), writableStream).then(() => {
            const fileStr = fs.readFileSync(path.join(unpackedFile), 'utf8');
            expect(writableStream.getContentsAsString('utf8')).toEqual(fileStr);
        })
    });

    test("errors if file is not found", () => {
        expect.assertions(1);
        const writableStream = new streamBuffers.WritableStreamBuffer();
        return pipeline(fs.createReadStream(archive), parseOne('not_exists'), writableStream).catch(({ message }) => {
            expect(message).toEqual('PATTERN_NOT_FOUND');
        })
    });

    test("errors if archive not tar.gz", () => {
        expect.assertions(1);
        const writableStream = new streamBuffers.WritableStreamBuffer();
        return pipeline(fs.createReadStream(unpackedFile), parseOne(), writableStream).catch(({ message }) => {
            expect(message).toEqual('Unexpected end of data');
        })
    });
});