import { createServer } from "node:http";

const server = createServer((request, response) => {
  if (request.method !== "POST" || request.url !== "/emails/batch") {
    response.writeHead(404).end();
    return;
  }
  let size = 0;
  let body = "";
  request.setEncoding("utf8");
  request.on("data", (chunk) => {
    size += Buffer.byteLength(chunk);
    if (size <= 40_000) body += chunk;
  });
  request.on("end", () => {
    try {
      const messages = JSON.parse(body);
      const valid =
        Array.isArray(messages) &&
        messages.length === 2 &&
        Boolean(request.headers["idempotency-key"]);
      if (!valid) {
        response.writeHead(422, { "Content-Type": "application/json" });
        response.end(JSON.stringify({ name: "validation_error", message: "Invalid batch." }));
        return;
      }
      response.writeHead(200, { "Content-Type": "application/json" });
      response.end(JSON.stringify({ data: [{ id: "mock-student" }, { id: "mock-branch" }] }));
    } catch {
      response.writeHead(400, { "Content-Type": "application/json" });
      response.end(JSON.stringify({ name: "validation_error", message: "Invalid JSON." }));
    }
  });
});

server.listen(4199, "127.0.0.1", () => process.stdout.write("Resend-compatible mock ready.\n"));
