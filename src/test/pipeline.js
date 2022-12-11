import { pipeline } from "stream";
import { createReadStream, createWriteStream } from "fs";

pipeline(
  createReadStream("./operatingSystem.js"),
  createWriteStream("./copyOS.js"),
  (err) => {
    throw new Error(err);
  }
);
