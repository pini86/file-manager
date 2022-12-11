const { Transform, pipeline } = require("stream");
const readable = process.stdin;
const writable = process.stdout;

const transform = new Transform({
  transform(chunk, enc, cb) {
    const chunkString = chunk.toString().trim();
    const revChunk = chunkString.split("").reverse().join("");
    //this.push(revChunk + "\n");
    cb(null, revChunk + "\n");
  },
});

pipeline(readable, transform, writable, (err) => {
  console.log(`Error ${err}`);
});
