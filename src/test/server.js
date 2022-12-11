import { createServer } from "http";
import { finished } from "stream";

const PORT = 3000;
const ser = createServer((req, res) => {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });
  req.on("end", () => {
    const parsBody = JSON.parse(body);
    console.log("Parsed body :", parsBody);
    const propsCount = Object.keys(parsBody).length;
    console.log("Props count :", propsCount);

    res
      .writeHead(200, { "Content-Type": "text/plain" })
      .end(
        `Body from request has been accepted and parsed. It has${propsCount} props`
      );
  });
  finished(res, (err) => {
    if (err) {
      process.stderr.write("FAIL");
    } else {
      process.stdout.write("SUCCES");
    }
  });
});

ser.on("connection", (stream) => {
  console.log("someone connected!");
});
ser.listen(PORT, () => {
  console.log(`Server runnig on port ${PORT}`);
});
