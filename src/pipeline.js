import util from 'util';
import stream from 'stream';

export default util.promisify(stream.pipeline);